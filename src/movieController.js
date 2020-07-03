/*
You DONT have to import the Movie with your username.
Because it's a default export we can nickname it whatever we want.
So import Movie from "./models"; will work!
You can do Movie.find() or whatever you need like normal!
*/
import Movie from "./models/Movie";

// Add your magic here!
export const home = async (req, res) => {
  const movies = await Movie.find({}).sort({ title: 1 });
  res.render("home", { movies, pageTitle: "Movies!" });
};

export const movieDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const movie = await Movie.findById(id);
    res.render("detail", { movie, pageTitle: movie.title });
  } catch (error) {
    res.render("404", { pagetitle: "No movie is found" });
  }
};

export const create = async (req, res) => {
  if (req.method === "GET") {
    res.render("create", { pageTitle: "Create Movie" });
  } else if (req.method === "POST") {
    const {
      body: { title, year, rating, genre, synopsis }
    } = req;
    const new_Movie = await Movie.create({
      title,
      synopsis,
      year,
      rating,
      genres: genre.split(",")
    });
    res.redirect(`/${new_Movie.id}`);
  }
};

export const filterMovie = async (req, res) => {
  const {
    query: { rating: searchingByRate, year: searchingByYear }
  } = req;

  if (searchingByRate) {
    let movie_list = [];
    movie_list = await Movie.find({ rating: { $gte: searchingByRate } });
    if (movie_list.length > 0) {
      res.render("home", {
        pageTitle: `Filtering by rating: ${searchingByRate}`,
        movies: movie_list
      });
    } else {
      res.render("404", {
        pagetitle: `Filtering by rating: ${searchingByRate}`
      });
    }
  }

  if (searchingByYear) {
    let movie_list = [];
    movie_list = await Movie.find({ year: { $gte: searchingByYear } });
    if (movie_list.length > 0) {
      res.render("home", {
        pageTitle: `Filtering by year: ${searchingByYear}`,
        movies: movie_list
      });
    } else {
      res.render("404", { pagetitle: `Filtering by year: ${searchingByYear}` });
    }
  }
};

export const edit = async (req, res) => {
  if (req.method === "GET") {
    const {
      params: { id }
    } = req;
    try {
      const edit_Movie = await Movie.findById(id);

      res.render("edit", {
        pageTitle: `Edit ${edit_Movie.title}`,
        edit_Movie
      });
    } catch (error) {
      res.render("404", { pagetitle: "No movie Found" });
    }
  } else if (req.method === "POST") {
    const {
      params: { id },
      body: { title, year, rating, genre, synopsis }
    } = req;
    try {
      await Movie.findByIdAndUpdate(
        { _id: id },
        { title, year, rating, genres: genre.split(","), synopsis }
      );
      res.redirect(`/${id}`);
    } catch (error) {
      res.render("404", { pagetitle: "No movie Found" });
    }
  }
};

export const delete_movie = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    await Movie.findOneAndRemove({ _id: id });
    res.redirect("/");
  } catch (error) {
    res.render("404", { pagetitle: "No movie Found" });
  }
};
