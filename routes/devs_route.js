import { Router } from "express";
import utils from "../utils/util.js";
import prisma from "../prisma/prismaClient.js";
import devValidator from "../validators/dev_validator.js";
import validator from "../validators/validator.js";
import { Prisma } from "@prisma/client";
import validIdValidator from "../validators/valid_id_validator.js";
import paramsValidator from "../validators/params_validator.js";

const devsRouter = Router();

devsRouter.get("/", async (req, res, next) => {
  try {
    const developers = await prisma.developer.findMany();
    res.render("devs.ejs", {
      title: "Games Inventory | Developers",
      banner: {
        title: "Developers",
        actions: [{ label: "New Developer", url: "/developers/new" }],
        backgroundImg:
          "https://img.freepik.com/free-photo/laptop-with-glowing-screen-table-dark-top-view-copy-space_169016-51607.jpg?t=st=1743859229~exp=1743862829~hmac=450435ac7e8084498c3b6d84555c11a49be74a4e85b9d57bf5fde868fa4f1387&w=1380",
      },
      developers,
    });
  } catch (error) {
    next(error);
  }
});

devsRouter.get("/new", async (req, res, next) => {
  try {
    const games = await prisma.game.findMany();
    res.render("devs_new.ejs", {
      title: "Developers | New",
      actions: [
        { label: "New Genre", url: "/genres/new" },
        { label: "New Game", url: "/games/new" },
      ],
      dev: {},
      form: {
        url: "/developers/new",
        method: "POST",
        submit_label: "submit",
        legend: "New Developer",
      },
      games,
    });
  } catch (error) {
    next(error);
  }
});

devsRouter.post("/new", devValidator, validator, async (req, res, next) => {
  const { games, ...dev } = req.body;
  try {
    await prisma.developer.create({
      data: {
        ...dev,
        games: {
          create: games.map((game) => {
            return {
              game: {
                connect: {
                  id: game,
                },
              },
            };
          }),
        },
      },
    });
    res.redirect("/developers");
  } catch (error) {
    next(error);
  }
});

devsRouter.get(
  "/:id/edit",
  validIdValidator,
  paramsValidator,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const dev = await prisma.developer.findUnique({
        where: { id: parseInt(id) },
        include: {
          games: {
            include: { game: { select: { id: true, name: true } } },
          },
        },
      });
      if (dev) {
        const games = await prisma.game.findMany();
        return res.render("devs_new.ejs", {
          title: "Developers | Edit",
          actions: [
            { label: "New Genre", url: "/genres/new" },
            { label: "New Game", url: "/games/new" },
          ],
          dev: {
            ...dev,
            games: dev.games.map((val) => val.game),
          },
          form: {
            url: `/developers/${id}/edit`,
            method: "POST",
            submit_label: "Save",
            legend: "Edit Developer",
          },
          games,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  }
);

devsRouter.post(
  "/:id/edit",
  validIdValidator,
  paramsValidator,
  devValidator,
  validator,
  async (req, res, next) => {
    const { id } = req.params;
    const { games, ...dev } = req.body;
    try {
      const oldData = await prisma.developer.findUnique({
        where: { id: parseInt(id) },
      });
      if (oldData) {
        const data = utils.difference(oldData, dev);
        const updateGames = games.map((val) => {
          return {
            developer_id: oldData.id,
            game_id: val,
          };
        });
        await prisma.$transaction(
          [
            prisma.developerGame.deleteMany({
              where: { developer_id: oldData.id },
            }),
            prisma.developer.update({
              where: { id: parseInt(id) },
              data,
            }),
            prisma.developerGame.createMany({
              data: updateGames,
            }),
          ],
          Prisma.TransactionIsolationLevel.Serializable
        );
        return res.redirect(`/developers/${id}`);
      }
      next();
    } catch (error) {
      next(error);
    }
  }
);

devsRouter.get(
  "/:id",
  validIdValidator,
  paramsValidator,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const dev = await prisma.developer.findUnique({
        where: { id: parseInt(id) },
        include: {
          games: {
            include: {
              game: {
                include: {
                  genres: {
                    include: {
                      genre: true,
                    },
                  },
                  developers: {
                    include: {
                      developer: {
                        select: {
                          id: true,
                          name: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (dev) {
        return res.render("developer_specific.ejs", {
          title: `Developers | ${dev.name}`,
          banner: {
            title: `${dev.name}`,
            actions: [
              { label: "edit", url: `/developers/${id}/edit` },
              { label: "delete", url: `/developers/${id}/delete` },
            ],
            dev: dev,
          },
          games: dev.games.map((val) =>
            utils.dbGameDataToViewGameData(val.game)
          ),
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  }
);

devsRouter.get(
  "/:id/delete",
  validIdValidator,
  paramsValidator,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const dev = await prisma.developer.findUnique({
        where: { id: parseInt(id) },
        select: { id: true },
      });
      if (dev) {
        await prisma.developer.delete({
          where: { id: dev.id },
        });
        return res.redirect("/developers");
      }
      next();
    } catch (error) {
      next(error);
    }
  }
);

export default devsRouter;
