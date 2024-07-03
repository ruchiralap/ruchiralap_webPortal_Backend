const express = require("express");
require("dotenv").config();
const { ObjectId } = require("mongodb");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://ruchiralap-dashboard.vercel.app",
    "https://api.imgbb.com/1/upload?key=7b7cc2939f38dd7f29e0801393262933",
    "https://ruchiralap-web-portal.vercel.app",
  ],
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
const Orders = client.db("ruchir_alap").collection("orders");
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

/// adding a new category

app.post("/addCategory", async (req, res) => {
  const categoryinfo = req.body;
  console.log(categoryinfo);
  const result = await Categories.insertOne(categoryinfo);
  res.send(result);
});

/// adding a new product
app.post("/addProduct", async (req, res) => {
  const productInfo = req.body;
  // console.log(categoryinfo);
  const result = await Products.insertOne(productInfo);
  res.send(result);
});

///deleting a product
///deleting a category api

app.delete("/deleteProduct/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await Products.deleteOne(query);
  console.log(result);
  res.send(result);
});

///deleting a category api

app.delete("/deleteCategory/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await Categories.deleteOne(query);
  console.log(result);
  res.send(result);
});

///updating a category api
app.put("/updateCategory/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const categoryInfoToUpdate = req.body;
  console.log("from body update", categoryInfoToUpdate);

  const categoryinfo = {
    $set: categoryInfoToUpdate,
  };

  const result = await Categories.updateOne(filter, categoryinfo, options);
  console.log("updated obj", result);
  res.send(result);
});

/// adding a new order
app.post("/addOrder", async (req, res) => {
  const orderDetails = req.body;
  // console.log(categoryinfo);
  const result = await Orders.insertOne(orderDetails);
  res.send(result);
});

///getting all the orders api
app.get("/orders", async (req, res) => {
  const cursor = Orders.find();
  const result = await cursor.toArray();
  res.send(result);
});

/// updating a product api
app.put("/updateProduct/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const ProductInfoToUpdate = req.body;
  console.log("from body update", ProductInfoToUpdate);

  const productinfo = {
    $set: ProductInfoToUpdate,
  };

  const result = await Products.updateOne(filter, productinfo, options);
  console.log("updated obj", result);
  res.send(result);
});

///change order status api

app.put("/updateDeliveryStatus/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: { deliveryStatus: "delivered" },
  };
  const result = await Orders.updateOne(filter, updateDoc);
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
