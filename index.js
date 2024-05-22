const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

///database connect
const uri = `mongodb+srv://ruchiralap:BOoWCIF67GRG4yuX@cluster0.wf9hzrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

const Products = client.db("ruchir_alap").collection("products");
const Categories = client.db("ruchir_alap").collection("categories");

///getting all the products api
app.get("/products", async (req, res) => {
  const cursor = Products.find();
  const result = await cursor.toArray();
  res.send(result);
});

///getting all the categories api
app.get("/categories", async (req, res) => {
  const cursor = Categories.find();
  const result = await cursor.toArray();
  res.send(result);
});

app.get("/", (req, res) => {
  res.send("ruchir alap is running");
});

app.listen(port, () => {
  console.log(
    `ruchir alap Server is running on port: ${port}, ${process.env.DB_USER},${process.env.DB_PASS} `
  );
});
