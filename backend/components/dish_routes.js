const express = require("express");
const router = express.Router();
const Dish = require("../data/models/dishModel");

router.get("/get-dishes", async (req, res) => {
  try {
    const dishes = await Dish.find({});
    res.json(dishes);
  } catch (error) {
    res.status(500).send(error.message); // Send a proper error message
  }
});

router.post("/create-dish", async (req, res) => {
  try {
    const { dishName, imageUrl, isPublished } = req.body;

    if (!dishName || !imageUrl || typeof isPublished === "undefined") {
      return res.status(400).send("All fields are required");
    }

    const dish = new Dish(req.body);
    const savedDish = await dish.save();
    res.json(savedDish);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/toggle-dish-status", async (req, res) => {
    try {
      const dishId = req.body.dishId;
      const isPublished = req.body.isPublished;
  
      const dish = await Dish.findOne({ dishId });
      if (!dish) {
        return res.status(404).send("Dish not found");
      }
  
      dish.isPublished = isPublished;
      await dish.save();
  
      res.json(dish);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  

module.exports = router;
