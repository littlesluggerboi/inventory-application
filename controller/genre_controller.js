import utils from "../utils/util.js";
import prisma from "../prisma/prismaClient.js";
import { Prisma } from "@prisma/client";

const getRoot = async (req, res, next) => {
  try {
    const genres = await prisma.genre.findMany();
    res.render("genres.ejs", {
      title: "Games Inventory | Genres",
      banner: {
        title: "Genres",
        actions: [{ label: "New Genre", url: "/genres/new" }],
        backgroundImg:
          "https://img.freepik.com/free-vector/decorative-glowing-neon-frame_23-2149086117.jpg?t=st=1743859062~exp=1743862662~hmac=99149e837eeea1adf35b45b61d98323da67cc9703c87618ee12d7ad6f6aceb98&w=900",
      },
      genres: genres,
    });
  } catch (error) {
    next(error);
  }
};

const getNew = async (req, res, next) => {
  res.render("genres_new.ejs", {
    title: "Genres | New",
    actions: [
      { url: "/games/new", label: "new game" },
      { url: "/developers/new", label: "new developer" },
    ],
    genre: {},
    form: {
      url: "/genres/new",
      method: "POST",
      submit_label: "add",
      legend: "New Genre",
    },
  });
};

const postNew = async (req, res, next) => {
  const payload = req.body;
  try {
    const result = await prisma.genre.create({
      data: payload,
    });
    res.redirect("/genres");
  } catch (error) {
    next(error);
  }
};

const getEdit = async (req, res, next) => {
  const { id } = req.params;
  try {
    const genre = await prisma.genre.findUnique({ where: { name: id } });
    if (genre) {
      return res.render("genres_new.ejs", {
        title: `Genres | Edit`,
        actions: [
          { url: "/games/new", label: "new game" },
          { url: "/developers/new", label: "new developer" },
        ],
        genre,
        form: {
          url: `/genres/${id}/edit`,
          method: "POST",
          submit_label: "Save",
          legend: "Edit Genre",
        },
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const postEdit = async (req, res, next) => {
  const payload = req.body;
  const { id } = req.params;
  try {
    const oldData = await prisma.genre.findUnique({ where: { name: id } });
    if (oldData == null) {
      next();
    }
    const data = utils.difference(oldData, payload);
    const result = await prisma.genre.update({
      where: { name: oldData.name },
      data,
    });
    res.redirect(`/genres/${result.name}`);
  } catch (error) {
    next(error);
  }
};

const getWithId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const genre = await prisma.genre.findUnique({
      where: {
        name: id,
      },
      include: {
        games: {
          include: {
            game: {
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
            },
          },
        },
      },
    });
    if (genre) {
      res.render("genre_specific.ejs", {
        title: `Games Inventory | ${genre.name}`,
        banner: {
          title: `${genre.name} Games`,
          actions: [
            { label: "edit", url: `/genres/${id}/edit` },
            { label: "delete", url: `/genres/${id}/delete` },
          ],
        },
        games: genre.games.map((val) =>
          utils.dbGameDataToViewGameData(val.game)
        ),
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const getDeleteWithId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const genre = await prisma.genre.findUnique({ where: { name: id } });
    if (genre) {
      await prisma.genre.delete({ where: { name: id } });
      return res.redirect("/genres");
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default {
  getRoot,
  getDeleteWithId,
  getEdit,
  getNew,
  getWithId,
  postEdit,
  postNew,
};
