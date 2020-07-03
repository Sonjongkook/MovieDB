import express from "express";
import {
  home,
  create,
  filterMovie,
  movieDetail,
  edit,
  delete_movie
} from "./movieController";

const movieRouter = express.Router();

movieRouter.get("/", home);

movieRouter.get("/create", create);
movieRouter.post("/create", create);

movieRouter.get("/search", filterMovie);

movieRouter.get("/:id", movieDetail);

movieRouter.get("/:id/edit", edit);
movieRouter.post("/:id/edit", edit);

movieRouter.get("/:id/delete", delete_movie);

// Add your magic here!

export default movieRouter;
