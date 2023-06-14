// create & init express web server //
const express = require("express");
const app = express();

// import & init BinarySearchTree //
const BinarySearchTree = require("./models/BinarySearchTree");
const BST = new BinarySearchTree();

// import & use middlewares //
const cors = require("cors");
const morgan = require("morgan");
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// custom middleware to attach the BST to the requests //
app.use((req, res, next) => {
  req.BST = BST;
  next();
});

// import & use routes //
const binarySearchTreeRouter = require("./routes/BinarySearchTree");
app.use("/bst", binarySearchTreeRouter);

// listen //
app.listen(5000, () => {
  console.log("Server listening on Port 5000 ...");
});
