// create & init express router //
const express = require("express");
const router = express.Router();

/////////////
// GET BST //
/////////////
router.get("/", (req, res) => {
  try {
    const { BST } = req;
    return res.status(200).json(BST);
  } catch (err) {
    console.error(`Error: ${err}`);
    return res.status(500).json({ err: "Internal Server Error" });
  }
});

/////////////////////
// INSERT INTO BST //
/////////////////////
router.post("/insert", (req, res) => {
  try {
    const { data } = req.body;
    const { BST } = req;
    BST.insert(data);
    return res.status(200).json(BST);
  } catch (err) {
    console.error(`Error: ${err}`);
    return res.status(500).json({ err: "Internal Server Error" });
  }
});

////////////////
// SEARCH BST //
////////////////
router.post("/search", async (req, res) => {
  try {
    const { data } = req.body;
    const { BST } = req;
    const response = BST.iterativeSearch(data);
    return res.status(200).json(response);
  } catch (err) {
    console.error(`Error: ${err}`);
    return res.status(500).json({ err: "Internal Server Error" });
  }
});

/////////////////////
// DELETE FROM BST //
/////////////////////
router.post("/delete", (req, res) => {
  try {
    const { data } = req.body;
    const { BST } = req;
    const response = BST.delete(data);
    if (response === "success") {
      return res.status(200).json(BST);
    } else {
      return res
        .status(404)
        .json(`${data} was not found in the Binary Search Tree.`);
    }
  } catch (err) {
    console.error(`Error: ${err}`);
    return res.status(500).json({ err: "Internal Server Error" });
  }
});

module.exports = router;
