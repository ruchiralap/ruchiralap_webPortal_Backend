const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();

const port = process.env.PORT || 5000;


// middleware
// middleware
app.use(cors());

app.use(express.json());

app.use(cookieParser());



app.get("/", (req, res) => {
  res.send("ruchir alap is running");
});

app.listen(port, () => {
  console.log(
    `ruchir alap Server is running on port: ${port}, ${process.env.DB_USER},${process.env.DB_PASS} `
  );
});
