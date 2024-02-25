const express = require("express");
const HistoPdd = require("../classes/HistoPddClass");
const router = express.Router()


// Create a HistoPdd
router.post("/", async (req, res) => {
    try {
        const histopdd = req.body
        const newHistoPdd = await HistoPdd.create(histopdd)
        res.status(201).send(newHistoPdd)
    } catch (error) {
        res.status(500).send(error)
    }
});


// Update a HistoPdd
router.put("/", async (req, res) => {
    try {
        const histopdd = req.body;
        const _id = histopdd._id;

        const result = await HistoPdd.update(_id, histopdd);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
});


// Delete a HistoPdd
router.delete("/", async (req, res) => {
    try {
        const histopdd = req.body
        const newHistoPdd = await HistoPdd.remove(histopdd)
        res.status(200).send(newHistoPdd)
    } catch (error) {
        res.status(500).send(error)
    }
});


// Find a HistoPdd
router.get("/", async (req, res) => {
    try {
        const histopdd = req.body
        const newHistoPdd = await HistoPdd.find(histopdd)
        res.status(200).send(newHistoPdd)
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get("/findbysup/:pdd_Id", async (req, res) => {
    try {
        const {pdd_Id} = req.params
        const newHistoPdd = await HistoPdd.findBySupervisor(pdd_Id)
        res.status(200).send(newHistoPdd)
    } catch (error) {
        res.status(500).send(error)
    }
});

// Find a HistoPdd by id
router.get("/find/:id", async (req, res) => {
    try {
      const { _id } = req.params;
      const newHistoPdd = await HistoPdd.findById(_id);
      res.status(200).send(newHistoPdd);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;