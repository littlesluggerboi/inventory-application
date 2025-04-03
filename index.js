import express from "express";
import path from "node:path";

const app = express();
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next)=>{
    console.log(err.message);
    res.status(500).send("Error 500 | Internal Error");
  })
  
  app.use((req, res)=>{
      res.status(404).send("Error 404 | Not Found")
  })
  
  
  app.listen(8080, () => {
    console.log(`listening at port: 8080`);
  });