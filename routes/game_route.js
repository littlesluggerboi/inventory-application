import { Router } from "express";
import prisma from "../prisma/prismaClient.js";
import gameValidator from "../validators/game_validator.js";
import validator from "../validators/validator.js";
import utils from "../utils/util.js";
import { Prisma } from "@prisma/client";
import validIdValidator from "../validators/valid_id_validator.js";
import paramsValidator from "../validators/params_validator.js";

const gameRouter = Router();

gameRouter.get("/", async (req, res, next) => {
  try {
    const games = await prisma.game.findMany({
      include: {
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
        genres: {
          include: {
            genre: true,
          },
        },
      },
    });
    res.render("games.ejs", {
      title: "Inventory Application | Games",
      banner: {
        title: "Games",
        actions: [{ label: "new game", url: "/games/new" }],
        backgroundImg:
          "https://img.freepik.com/free-vector/hand-drawn-neon-gaming-photocall_23-2149860761.jpg?t=st=1743905824~exp=1743909424~hmac=d1a3a5ae57a622eeb77e5df67175aaf45fa633a6bfe313772e55b8f517fac0eb&w=900",
      },
      games: games.map((val) => utils.dbGameDataToViewGameData(val)),
    });
  } catch (error) {
    next(error);
  }
});

gameRouter.get("/new", async (req, res, next) => {
  try {
    const genres = await prisma.genre.findMany();
    const developers = await prisma.developer.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    res.render("games_new.ejs", {
      title: "Games | New",
      actions: [
        { label: "New Developer", url: "/developers/new" },
        { label: "New Genre", url: "/genres/new" },
      ],
      form: {
        url: "/games/new",
        method: "POST",
        submit_label: "submit",
        legend: "New Game",
      },
      game: {},
      genres,
      developers,
    });
  } catch (error) {
    next(error);
  }
});

gameRouter.post("/new", gameValidator, validator, async (req, res, next) => {
  const { developers, genres, ...game } = req.body;
  try {
    await prisma.game.create({
      data: {
        ...game,
        genres: {
          createMany: {
            data: genres.map((gen) => {
              return { genre_id: gen };
            }),
          },
        },
        developers: {
          createMany: {
            data: developers.map((dev) => {
              return { developer_id: dev };
            }),
          },
        },
      },
    });
    res.redirect("/games");
  } catch (error) {
    next(error);
  }
});

gameRouter.get(
  "/:id/delete",
  validIdValidator,
  paramsValidator,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const game = await prisma.game.findUnique({
        where: { id: parseInt(id) },
        select: { id: true },
      });
      if (game) {
        await prisma.game.delete({ where: { id: game.id } });
        return res.redirect("/games");
      }
      next();
    } catch (error) {
      next(error);
    }
  }
);

gameRouter.get(
  "/:id/edit",
  validIdValidator,
  paramsValidator,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const game = await prisma.game.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
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
          genres: {
            include: {
              genre: true,
            },
          },
        },
      });
      const genres = await prisma.genre.findMany();
      const developers = await prisma.developer.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      if (game) {
        return res.render("games_new.ejs", {
          title: "Games | Edit",
          actions: [
            { label: "New Developer", url: "/developers/new" },
            { label: "New Genre", url: "/genres/new" },
          ],
          form: {
            url: `/games/${id}/edit`,
            method: "POST",
            submit_label: "Save",
            legend: "Edit Game",
          },
          game: utils.dbGameDataToViewGameData(game),
          genres: genres,
          developers: developers,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  }
);

gameRouter.post(
  "/:id/edit",
  validIdValidator,
  paramsValidator,
  gameValidator,
  validator,
  async (req, res, next) => {
    const { id } = req.params;
    const { developers, genres, ...game } = req.body;
    try {
      const oldData = await prisma.game.findUnique({
        where: { id: parseInt(id) },
      });
      if (oldData) {
        const updatedDevs = developers.map((dev) => {
          return {
            game_id: oldData.id,
            developer_id: dev,
          };
        });
        const updatedGenres = genres.map((gen) => {
          return {
            game_id: oldData.id,
            genre_id: gen,
          };
        });
        const data = utils.difference(oldData, game);
        await prisma.$transaction(
          [
            prisma.gameGenre.deleteMany({ where: { game_id: oldData.id } }),
            prisma.developerGame.deleteMany({ where: { game_id: oldData.id } }),
            prisma.game.update({
              where: { id: oldData.id },
              data,
            }),
            prisma.gameGenre.createMany({
              data: updatedGenres,
            }),
            prisma.developerGame.createMany({
              data: updatedDevs,
            }),
          ],
          Prisma.TransactionIsolationLevel.Serializable
        );
        return res.redirect(`/games/${oldData.id}`);
      }
      next();
    } catch (error) {
      next(error);
    }
  }
);

gameRouter.get(
  "/:id",
  validIdValidator,
  paramsValidator,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const game = await prisma.game.findUnique({
        where: {
          id: parseInt(id),
        },
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
      });
      if (game) {
        return res.render("game_specific.ejs", {
          title: `Games Inventory | ${game.name}`,
          banner: {
            title: game.name,
            actions: [
              { label: "edit", url: `/games/${id}/edit` },
              { label: "delete", url: `/games/${id}/delete` },
            ],
            game: utils.dbGameDataToViewGameData(game),
          },
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  }
);

export default gameRouter;
