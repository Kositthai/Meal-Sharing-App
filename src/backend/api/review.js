const express = require("express");
const router = express.Router();
const db = require("../database");

router.use(express.json());

// Returns all reviews
router.get("/", async (req, res) => {
  try {
    const getAllReviews = await db("review").select("*");
    res.status(200).json(getAllReviews);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

// Adds a new review to the database.
router.post("/", async (req, res) => {
  const reviewInfo = req.body;
  try {
    const updateInfo = await db("review").insert(reviewInfo);
    res.status(201).json("Added review successfully.");
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

// Returns a review by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getReviewById = await db("review")
      .select("review.id", "review.title", "review.description", "review.stars")
      .where({ id });
    res.status(200).json(getReviewById);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

// Updates the review by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const reviewInfo = req.body;
  try {
    const updateInfo = await db("review").where({ id }).update(reviewInfo);
    res.status(200).json("Updated review successfully.");
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

// Deletes the review by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteReview = await db("review").where({ id }).delete();
    res.status(200).json("Deleted review successfully.");
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

module.exports = router;

