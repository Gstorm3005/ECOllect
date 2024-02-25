const express = require("express");
const Chargement = require("../classes/ChargementClass");
const router = express.Router()


// Create an Chargement
router.post("/", async (req, res) => {
  try {
    const chargement = req.body
    const newChargement = await Chargement.create(chargement)
    res.status(201).send(newChargement)
  } catch (error) {
    res.status(500).send(error)
  }
});


// Update an Chargement
router.put("/", async (req, res) => {
  try {
    const chargement = req.body;
    const _id = chargement._id;

    const result = await Chargement.update(_id, chargement);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Delete an Chargement
router.delete("/", async (req, res) => {
  try {
    const chargement = req.body
    const newChargement = await Chargement.remove(chargement)
    res.status(200).send(newChargement)
  } catch (error) {
    res.status(500).send(error)
  }
});


// Find an Chargement
router.get("/", async (req, res) => {
  try {
    const chargement = req.body
    const newChargement = await Chargement.find(chargement)
    res.status(200).send(newChargement)
  } catch (error) {
    res.status(500).send(error)
  }
});

// Find a Chargement by Transporter
router.get("/find/:userId", async (req, res) => {
  try {
    const { userId } = req.params
    const newChargement = await Chargement.findByTransporter(userId)
    res.status(200).send(newChargement)
  } catch (error) {
    res.status(500).send(error)
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const newChargement = await Chargement.findById(_id);
    res.status(200).send(newChargement);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;