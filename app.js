import express from "express";
import connectDB from "./db/connectDb.js";

import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || "8000";
console.log(port);
const DATABASE_URL = process.env.DATABASE_URL;
console.log(DATABASE_URL);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

// Database Connection
connectDB(DATABASE_URL);

// JSON
app.use(express.json());

// Load Routes
import user from "./router/user.js";
app.use("/api", user);

// Product routes
import product from "./router/product.js";
app.use("/api/product", product);

// import complain from "./router/complains.js";
// app.use("/api", complain);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
