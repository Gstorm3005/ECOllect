const express = require("express");
const HistoTransporter = require("../classes/HistoTransporterClass");
const router = express.Router()


// Create a HistoTransporter
router.post("/", async (req, res) => {
    try {
        const histotransporter = req.body
        const newHistoTransporter = await HistoTransporter.create(histotransporter)
        res.status(201).send(newHistoTransporter)
    } catch (error) {
        res.status(500).send(error)
    }
});


// Update a HistoTransporter
router.put("/", async (req, res) => {
    try {
        const histotransporter = req.body;
        const _id = histotransporter._id;

        const result = await HistoTransporter.update(_id, histotransporter);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
});


// Delete a HistoTransporter
router.delete("/", async (req, res) => {
    try {
        const histotransporter = req.body
        const newHistoTransporter = await HistoTransporter.remove(histotransporter)
        res.status(200).send(newHistoTransporter)
    } catch (error) {
        res.status(500).send(error)
    }
});


// Find a HistoTransporter
router.get("/", async (req, res) => {
    try {
        const histotransporter = req.body
        const newHistoTransporter = await HistoTransporter.find(histotransporter)
        res.status(200).send(newHistoTransporter)
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get("/findbytran/:userId", async (req, res) => {
    try {
        const {userId} = req.params
        const newHistoTransporter = await HistoTransporter.findByTransporter(userId)
        res.status(200).send(newHistoTransporter)
    } catch (error) {
        res.status(500).send(error)
    }
});

// Find a HistoTransporter by id
router.get("/find/:id", async (req, res) => {
    try {
      const { _id } = req.params;
      const newHistoTransporter = await HistoTransporter.findById(_id);
      res.status(200).send(newHistoTransporter);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;