import express from "express";
import connectDB from "./db/connectDb.js";

import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fs from 'fs';
import axios from "axios";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || "8000";
console.log(port);
const DATABASE_URL = process.env.DATABASE_URL;
console.log(DATABASE_URL);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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

let apiData;
// import complain from "./router/complains.js";
// app.use("/api", complain);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// *******************************************************
// Serve the HTML page with the API data
app.get('/display', (req, res) => {
  const { name, contact } = req.query;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://san-sclo.onrender.com/api/product/get', // Replace with your actual API endpoint
    headers: {}
  };

  axios
    .request(config)
    .then((response) => {
      // Get the API data from the response
      const apiData = response.data.productlist;

      // Construct the HTML content with the API data
      const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Sanchi Rate List</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 20px;
          }
      
          h1 {
            text-align: center;
            margin-bottom: 20px;
          }
      
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
          }
      
          th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
      
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
      
          tr:hover {
            background-color: #f9f9f9;
          }
      
          /* Responsive CSS using media queries */
          @media (max-width: 768px) {
            table {
              font-size: 14px;
            }
          }
      
          @media (max-width: 576px) {
            table {
              font-size: 12px;
            }
            th, td {
              padding: 8px 10px;
            }
          }
        </style>
      </head>
      <body>
        <h1>Rate List</h1>
        <p>Vendor Details:</p>
        <p>Name: ${name}</p>
        <p>Contact: ${contact}</p>
        <table>
          <tr>
            <th>Product Name</th>
            <th>MRP</th>
            <th>Price</th>
          </tr>
          ${apiData.map((product) => `
            <tr>
              <td>${product.productname}</td>
              <td>${product.MRP}</td>
              <td>${product.price}</td>
            </tr>
          `).join('')}
        </table>
      </body>
      </html>
      

      `;

      // Set the Content-Type header to 'text/html' and send the HTML content as the response
      res.setHeader('Content-Type', 'text/html');
      res.send(htmlContent);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error fetching API data');
    });
});

// *******************************************************

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
