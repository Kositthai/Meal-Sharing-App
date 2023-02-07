const express = require("express");
const router = express.Router();
const knex = require("../database");

router.use(express.json());

// Returns all meals
router.get("/", async (req, res) => {
  try {
    const getMeals = await knex("meal").select("*");
    getMeals.length != 0
      ? res.json(getReservationList)
      : res.status(404).send("No meals list");
  } catch (error) {
    res.status(500).send({ error: error });
    throw error;
  }
});

// Adds a new meal to the database
router.post("/", async (req, res) => {
  const mealInfo = req.body;
  try {
    const insertMeal = await knex("meal").insert(mealInfo);
    insertMeal
      ? res.status(201).send("Successfully inserted meal")
      : res.status(400).send("Failed to create");
  } catch (error) {
    res.status(500).send({ error: error });
    throw error;
  }
});

// Returns the meal by id
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const getMealById = await knex("meal").select("*").where({ id });
    getMealById.length != 0
      ? res.json(getMealById)
      : res.status(404).send(`No meals available with this ${id}`);
  } catch (error) {
    res.status(500).send({ error: error });
    throw error;
  }
});

// Updates the meal by id
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const changeInfo = req.body; //access body in postman body
  try {
    const updateMealById = await knex("meal")
      .where("id", id)
      .update(changeInfo);
    updateMealById
      ? res.status(200).send({ message: "Successfully updated meal" })
      : res.status(400).send("Failed to update");
  } catch (error) {
    res.status(500).send({ error: error });
    throw error;
  }
});

// Deletes the meal by id
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deleteMealById = await knex("meal").where("id", id).del();
    deleteMealById
      ? res.status(200).send({ message: "Successfully delated meal" })
      : res.status(400).send("Failed to delete");
  } catch (error) {
    res.status(500).send({ error: error });
    throw error;
  }
});

module.exports = router;
