const express = require("express");
const HistoCollector = require("../classes/HistoCollectorClass");
const router = express.Router()


// Create a HistoCollector
router.post("/", async (req, res) => {
    try {
        const histocollector = req.body
        const newHistoCollector = await HistoCollector.create(histocollector)
        res.status(201).send(newHistoCollector)
    } catch (error) {
        res.status(500).send(error)
    }
});


// Update a HistoCollector
router.put("/", async (req, res) => {
    try {
        const histocollector = req.body;
        const _id = histocollector._id;

        const result = await HistoCollector.update(_id, histocollector);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
});


// Delete a HistoCollector
router.delete("/", async (req, res) => {
    try {
        const histocollector = req.body
        const newHistoCollector = await HistoCollector.remove(histocollector)
        res.status(200).send(newHistoCollector)
    } catch (error) {
        res.status(500).send(error)
    }
});


// Find a HistoCollector
router.get("/", async (req, res) => {
    try {
        const histocollector = req.body
        const newHistoCollector = await HistoCollector.find(histocollector)
        res.status(200).send(newHistoCollector)
    } catch (error) {
        res.status(500).send(error)
    }
});


router.get("/findbycoll/:userId", async (req, res) => {
    try {
        const {userId} = req.params
        const newHistoCollector = await HistoCollector.findByCollector(userId)
        res.status(200).send(newHistoCollector)
    } catch (error) {
        res.status(500).send(error)
    }
});


// Find a HistoCollector by id
router.get("/find/:id", async (req, res) => {
    try {
      const { _id } = req.params;
      const newHistoCollector = await HistoCollector.findById(_id);
      res.status(200).send(newHistoCollector);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;