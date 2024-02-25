const express = require("express");
const Usine = require("../classes/UsineClass");
const router = express.Router()


// Update an Usine
router.put("/:id", async (req, res) => {
    try {
        const usine = req.body;
        const _id = req.params.id;

        const result = await Usine.update(_id, usine);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Remove an Usine
router.delete("/", async (req, res) => {
    try {
        const usine = req.body
        const newUsine = await Usine.remove(usine)
        res.status(200).send(newUsine)
    } catch (error) {
        res.status(500).send(error)
    }
});


// Find an Usine
router.get("/", async (req, res) => {
    try {
        const newUsine = await Usine.find()
        res.status(200).send(newUsine)
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;