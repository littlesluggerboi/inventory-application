import express from "express";
import path from "node:path";
import gameRouter from "./routes/game_route.js";
import genreRouter from "./routes/genre_route.js";
import indexRouter from "./routes/index_route.js";
import devsRouter from "./routes/devs_route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(express.urlencoded({ extended: true }));


app.use("/", indexRouter);
app.use("/games", gameRouter);
app.use("/genres", genreRouter);
app.use("/developers", devsRouter);
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).render("error_pages/500.ejs");
});

app.use((req, res) => {
  res.status(404).render("error_pages/404.ejs");
});

app.listen(8080, () => {
  console.log(`listening at port: 8080`);
});
