const express = require("express");
const StockCollector = require("../classes/StockCollectorClass");
const router = express.Router()


// Create a StockCollector
router.post("/", async (req, res) => {
    try {
        const stockcollector = req.body
        const newStockCollector = await StockCollector.create(stockcollector)
        res.status(201).send(newStockCollector)
    } catch (error) {
        res.status(500).send(error)
    }
});


// Update a StockCollector
router.put("/:id", async (req, res) => {
    try {
      const stockcollector = req.body;
      const _id = stockcollector._id;
  
      const result = await StockCollector.update(_id, stockcollector);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });


// Delete a StockCollector
router.delete("/", async (req, res) => {
    try {
        const stockcollector = req.body
        const newStockCollector = await StockCollector.remove(stockcollector)
        res.status(200).send(newStockCollector)
    } catch (error) {
        res.status(500).send(error)
    }
});


// Find a StockCollector
router.get("/", async (req, res) => {
    try {
        const stockcollector = req.body
        const newStockCollector = await StockCollector.find(stockcollector)
        res.status(200).send(newStockCollector)
    } catch (error) {
        res.status(500).send(error)
    }
});


// Find a StockCollector by Collector 
router.get("/find/:userId", async (req, res) => {
  try {
    const { userId } = req.params
    const newStock = await StockCollector.findByCollector(userId)
    res.status(200).send(newStock)
  } catch (error) {
    res.status(500).send(error)
  }
});


// Find a StockCollector by id
router.get("/find/:id", async (req, res) => {
    try {
      const { _id } = req.params;
      const newStockCollector = await StockCollector.findById(_id);
      res.status(200).send(newStockCollector);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;