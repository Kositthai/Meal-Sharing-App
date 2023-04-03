const express = require("express");
const router = express.Router();
const knex = require("../database");

router.use(express.json());

// Returns all reservations
router.get("/", async (req, res) => {
  try {
    const getReservationList = await knex("reservation").select(
      "reservation.*",
      knex.raw(
        "CONVERT_TZ(created_date, '+00:00', '+02:00') AS local_created_date"
      )
    );
    getReservationList.length != 0
      ? res.json(getReservationList)
      : res.status(404).send("No reservations list");
  } catch (error) {
    res.status(500).send({ error: error });
    throw error;
  }
});

// Adds a new reservation to the database
router.post("/", async (req, res) => {
  const reservationInfo = req.body;
  try {
    const insertReservation = await knex("reservation").insert(reservationInfo);
    insertReservation
      ? res.status(201).send("Successfully inserted reservation")
      : res.status(400).send("Failed to create");
  } catch (error) {
    res.status(500).send({ error: error });
    throw error;
  }
});

// Returns the reservation by id
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const getReservationById = await knex("reservation")
      .select(
        "reservation.id",
        "reservation.created_date",
        "reservation.meal_id",
        knex.raw(
          "CONVERT_TZ(created_date, '+00:00', '+02:00') AS local_created_date"
        )
      )
      .where({ id });
    getReservationById.length != 0
      ? res.json(getReservationById)
      : res.status(404).send(`No reservations with id ${id}`);
  } catch (error) {
    res.status(500).send({ error: error });
    throw error;
  }
});

// Updates the reservation by id
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updateInfo = req.body; //access body in postman body
  try {
    const updateReservationById = await knex("reservation")
      .where("id", id)
      .update(updateInfo);
    updateReservationById
      ? res.status(200).send({ message: "Successfully updated reservation" })
      : res.status(400).send("Failed to update");
  } catch (error) {
    res.status(500).send({ error: error });
    throw error;
  }
});

// Deletes the reservation by id
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deleteReservationById = await knex("reservation")
      .where("id", id)
      .del();
    console.log(deleteReservationById);
    deleteReservationById
      ? res.status(200).send({ message: "Successfully deleted reservation" })
      : res.status(400).send("Failed to delete");
  } catch (error) {
    res.status(500).send({ error: error });
    throw error;
  }
});

module.exports = router;
