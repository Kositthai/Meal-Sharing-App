const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const mealsRouter = require("./api/meals");
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");
const Knex = require("knex");
const { first } = require("./database");
const knex = require("./database");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);

// ------- Routes --------- //

app.get("/my-route", (req, res) => {
  res.send("Hi friend");
});

app.get("/future-meals", async (req, res) => {
  try {
    const [futureMeals] = await knex.raw(
      "SELECT meal.title, meal.when FROM meal WHERE meal.when >= DATE(NOW());"
    );
    futureMeals.length != 0 ? res.json({ futureMeals }) : res.json([]);
  } catch (e) {
    res.send("Something went wrong, try again later");
  }
});

app.get("/past-meals", async (req, res) => {
  try {
    const [pastMeals] = await knex.raw(
      "SELECT meal.title, meal.when FROM meal WHERE meal.when < DATE(NOW());"
    );
    pastMeals.length != 0 ? res.json({ pastMeals }) : res.json([]);
  } catch (e) {
    res.send("Something went wrong, try again later");
  }
});

app.get("/all-meals", async (req, res) => {
  try {
    const [allMeals] = await knex.raw(
      "SELECT * FROM meal ORDER BY meal.id ASC;"
    );
    allMeals.length != 0 ? res.json({ allMeals }) : res.json([]);
  } catch (e) {
    res.send("Something went wrong, try again later");
  }
});

app.get("/first-meal", async (req, res) => {
  try {
    const [firstMeal] = await knex.raw(
      "SELECT * FROM meal ORDER BY meal.id ASC LIMIT 1;"
    );
    lll;
    firstMeal.length != 0
      ? res.json(firstMeal[0])
      : res.status(200).send("There are no meals");
  } catch (e) {
    res.send("Something went wrong, try again later");
  }
});

app.get("/last-meal", async (req, res) => {
  try {
    const [lastMeal] = await knex.raw(
      "SELECT * FROM meal ORDER BY meal.id DESC LIMIT 1; "
    );
    lastMeal.length != 0
      ? res.json(lastMeal[0])
      : res.status(200).send("There are no meals");
  } catch (e) {
    res.send("Something went wrong, try again later");
  }
});

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file";
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
