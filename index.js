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

///database connect
const uri= `mongodb+srv://ruchiralap:BOoWCIF67GRG4yuX@cluster0.wf9hzrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const dbConnect = async () => {
  try {
    await client.connect();
    console.log("Database Connected!");
  } catch (error) {
    console.log(error.name, error.message);
  }
};
dbConnect();
/// ruchiralap
///BOoWCIF67GRG4yuX

app.get("/", (req, res) => {
  res.send("ruchir alap is running");
});

app.listen(port, () => {
  console.log(
    `ruchir alap Server is running on port: ${port}, ${process.env.DB_USER},${process.env.DB_PASS} `
  );
});
