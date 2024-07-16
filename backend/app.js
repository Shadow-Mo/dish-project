const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();
const DishRoutes = require("./components/dish_routes");

main().catch((err) => console.log(err));

async function main() {
  const connectionInstance = await mongoose.connect(`mongodb://localhost:27017/dishes`);
  console.log(
    `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
  );
}

const app = express();

const corsOptions = {
  origin: [process.env.CLIENT_URL || "http://localhost:3000", "http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));

// Use express built-in middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Place your routes after the middleware
app.use(DishRoutes);

// Headers are added to allow CORS, consider removing if CORS middleware is sufficient
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const server = app.listen(8080,()=>{
    console.log(
        `Server running on port no : ${process.env.PORT}`
      );
})