import prisma from "../prisma/prismaClient.js";

const getRoot = async (req, res, next) => {
  const games = await prisma.game.findMany({
    take: 20,
  });
  const genres = await prisma.genre.findMany({
    take: 20,
  });
  const developers = await prisma.developer.findMany({
    take: 5,
  });
  res.render("home.ejs", {
    title: "Inventory Application | Home",
    games,
    developers,
    genres,
    banner: {
      title: "Games Inventory Management",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pretium ipsum et libero sodales
                      bibendum.uris elementum eu metus ut consequat. Mauris maximus ultrices enim in consequat. Etiam
                      convallis magna velit. Fusce id leo et sem blandit pharetra. Nulla urna lacus, elementum nec
                      tristique mollis, posuere id mi. Praesent porta, eros id tincidunt venenatis, nisi orci tempus nunc,
                      ut dignissim ligula leo sit amet nunc.`,
      actions: [
        { label: "Genres", url: "/genres" },
        { label: "Games", url: "/games" },
      ],
      backgroundImg:
        "https://img.freepik.com/free-photo/export-supervisor-drafting-billing-product-logistics_482257-88029.jpg?t=st=1743852119~exp=1743855719~hmac=7d43cdc2002416f5b3a07fc7f4b7018c0ee2e51bbd0f91d303066b72de3f5256&w=1380",
    },
  });
};

const getHome = async (req, res, next) => {
  res.redirect("/");
};

export default {
  getHome,
  getRoot,
};
