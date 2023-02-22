const express = require("express");
const router = express.Router();
const db = require("../database");

router.use(express.json());

// Adds a new meal to the database
router.post("/", async (req, res) => {
  const mealInfo = req.body;
  try {
    const insertMeal = await db("meal").insert(mealInfo);
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
    const getMealById = await db("meal").select("*").where({ id });
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
    const updateMealById = await db("meal").where("id", id).update(changeInfo);
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
    const deleteMealById = await db("meal").where("id", id).del();
    deleteMealById
      ? res.status(200).send({ message: "Successfully delated meal" })
      : res.status(400).send("Failed to delete");
  } catch (error) {
    res.status(500).send({ error: error });
    throw error;
  }
});

// toLowercaseMiddleware is used to parse reqest query to lowercase before passing them to the route handler function
// after that function will called next method to pass control to the next middleware or route handler.
// make sure that you add middleware function before route handler to ensure that all query parameters are converted to
// lowercase before being used in any conditions.
function toLowerCaseMiddleware(req, res, next) {
  for (const key in req.query) {
    if (typeof req.query[key] === "string") {
      req.query[key] = req.query[key].toLowerCase();
    }
  }
  next();
}

// Get request query
router.get("/", toLowerCaseMiddleware, async (req, res) => {
  const query = req.query;
  let mealQuery = db("meal");
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  let {
    maxPrice,
    availableReservations,
    title,
    dateAfter,
    dateBefore,
    limit,
    sortKey,
    sortDir,
  } = req.query;

  // MaxPrice
  if ("maxPrice" in query) {
    maxPrice = parseInt(maxPrice); // convert string number to number
    if (!isNaN(maxPrice)) {
      mealQuery = mealQuery.where("price", "<=", maxPrice);
    } else {
      return res.status(400).json({ Error: "Please fill in a valid number" });
    }
  }

  // AvailableReservations
  if ("availableReservations" in query) {
    mealQuery = mealQuery
    .select("meal.title", 
    db.raw("(meal.max_reservation -  sum(reservation.number_of_guests)) as available_slot"))
    .join("reservation", "meal.id", "=", "reservation.meal_id")
    .groupBy("reservation.meal_id")

    if (availableReservations === "true") {
      mealQuery = mealQuery.having("available_slot", "!=", "0")
        
    } else if (availableReservations === "false") {
      mealQuery = mealQuery.having("available_slot", "=", "0")
      console.log(mealQuery.toSQL())

    } else {
      return res.status(400).json({
        Error:
          "Available and Unavailable reservations can only be checked only with true and false value",
      });
    }
  }

  // Search by title
  if ("title" in query) {
    if (title) {
      mealQuery = mealQuery.where("meal.title", "like", `%${title}%`);
    }
  }

  // Sort by dateAfter
  if ("dateAfter" in query) {
    if (datePattern.test(dateAfter)) {
      mealQuery = mealQuery.where("meal.when", ">", dateAfter);
    } else {
      return res.status(400).json({
        Error: "Invalid dateAfter value",
        Valid_date_format: "YYYY-MM-DD",
      });
    }
  }

  // Sort by dateBefore
  if ("dateBefore" in query) {
    if (datePattern.test(dateBefore)) {
      mealQuery = mealQuery.where("meal.when", "<=", dateBefore);
    } else {
      return res.status(400).json({
        Error: "Invalid dateBefore value",
        Valid_date_format: "YYYY-MM-DD",
      });
    }
  }

  // Limit
  if ("limit" in query) {
    if (!isNaN(limit)) {
      mealQuery = mealQuery.limit(limit);
    } else {
      return res.status(400).json({ Error: "Limit value can only be number" });
    }
  }

  // Sort by key and dir
  if ("sortDir" in query && (sortDir === "asc" || sortDir === "desc")) {
    if ("sortKey" in query) {
      mealQuery = mealQuery.orderBy(sortKey, sortDir);
    } else {
      return res
        .status(400)
        .json({ Error: "sortDir have to combine with sortKey" });
    }
  } else if (
    "sortKey" in query &&
    (sortKey === "price" ||
      query.sortKey === "when" ||
      sortKey === "max_reservation")
  ) {
    mealQuery = mealQuery.orderBy(sortKey);
  }

  try {
    const meals = await mealQuery;
    meals.length > 0 ? res.status(200).json(meals) : res.json("No data exist");
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

router.get("/:meal_id/reviews", async (req, res) => {
  const meal_id = parseInt(req.params.meal_id);
  try {
    const reviewById = await db("meal")
      .join("review", "review.meal_id", "=", "meal.id")
      .where({ meal_id });
    res.json(reviewById);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;

