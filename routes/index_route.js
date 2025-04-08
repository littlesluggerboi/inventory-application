import { Router } from "express";

const sample_developers = [
  {
    id: 1,
    name: "Sheena Solis",
    address: "5008 Eldon Spring, North Garlandtown, New York - 38636, Gambia",
    email: "baceda6460@inveitro.com",
    phone: "800.757.8515 x9134",
  },
  {
    id: 2,
    name: "Courtney Lam",
    address: "882 Marcelino Curve, Claudieville, Iowa - 54323, Maldives",
    email: "Kristofer.Marquardt61@gmail.com",
    phone: "(309) 638-1025",
  },
  {
    id: 3,
    name: "Reggie Pierce",
    address: "21725 Ethyl Mount, Feilfield, Minnesota - 32740, Uruguay",
    email: "Eulah11@gmail.com",
    phone: "(551) 870-9759 x237",
  },
  {
    id: 4,
    name: "Emil Jennings",
    address: "48552 Cummings Point, Lake Sarai, Nebraska - 17602, Qatar",
    email: "Isabell.Ortiz53@gmail.com",
    phone: "1-414-201-1301 x274",
  },
  {
    id: 5,
    name: "Deann Khan",
    address: "48552 Cummings Point, Lake Sarai, Nebraska - 17602, Qatar",
    email: "Selina11@gmail.com",
    phone: "558-845-9759 x693",
  },
];
const sample_games = [
  {
    id: 1,
    name: "Tabitha Huber",
    release_date: "2009-12-20",
    price: 12.0,
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    id: 2,
    name: "Henry Frazier",
    release_date: "2009-12-20",
    price: 234.0,
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    id: 3,
    name: "Darcy Love",
    release_date: "2009-12-20",
    price: 321.0,
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    id: 4,
    name: "Moses Ballard",
    release_date: "2009-12-20",
    price: 6324.0,
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    id: 5,
    name: "Hans Gray",
    release_date: "2009-12-20",
    price: 9.99,
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    id: 6,
    name: "Edna David",
    release_date: "2009-12-20",
    price: 211.0,
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    id: 7,
    name: "Angelina Fuller",
    release_date: "2009-12-20",
    price: 1.99,
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    id: 8,
    name: "Tia Martin",
    release_date: "2009-12-20",
    price: 12.33,
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    id: 9,
    name: "Alphonse Douglas",
    release_date: "2009-12-20",
    price: 41.0,
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    id: 10,
    name: "Sanford Stephens",
    release_date: "2009-12-20",
    price: 312.0,
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
];
const sample_genres = [
  { id: 1, name: "Fighting" },
  { id: 2, name: "Platformer" },
  { id: 3, name: "Adventure Game" },
  { id: 4, name: "Sandbox" },
  { id: 5, name: "Puzzle" },
  { id: 6, name: "Strategry" },
  { id: 7, name: "Arcade" },
  { id: 8, name: "Racing" },
  { id: 9, name: "Party" },
  { id: 10, name: "Sports Game" },
  { id: 11, name: "First-Person Shooter" },
];

const indexRouter = Router();

indexRouter.get("/", async (req, res, next) => {
  res.render("home.ejs", {
    title: "Inventory Application | Home",
    developers: sample_developers,
    games: sample_games,
    genres: sample_genres,
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
});

indexRouter.get("/home", async (req, res, next) => {
  res.redirect("/");
});

export default indexRouter;

export { sample_developers, sample_games, sample_genres };
