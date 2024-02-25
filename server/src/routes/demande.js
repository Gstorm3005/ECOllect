const express = require("express");
const Demande = require("../classes/DemandeClass");
const router = express.Router()


// Create a Demande
router.post("/", async (req, res) => {
    try {
        const demande = req.body
        const newDemande = await Demande.create(demande)
        res.status(201).send(newDemande)
    } catch (error) {
        res.status(500).send(error)
    }
});


// Update a Demande
router.put("/:id", async (req, res) => {
    try {
      const demande = req.body;
      const _id = req.params.id;;
  
      const result = await Demande.update(_id, demande);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });



// Delete a Demande
router.delete("/:id", async (req, res) => {
    try {
        const demande = req.params.id;
        const newDemande = await Demande.remove(demande)
        res.status(200).send(newDemande)
    } catch (error) {
        res.status(500).send(error)
    }
});


// Find a Demande
router.get("/", async (req, res) => {
    try {
        const demande = req.body
        const newDemande = await Demande.find(demande)
        res.status(200).send(newDemande)
    } catch (error) {
        res.status(500).send(error)
    }
});


// Find a Demande by id
router.get("/find/:id", async (req, res) => {
    try {
      const { _id } = req.params;
      const newDemande = await Demande.findById(_id);
      res.status(200).send(newDemande);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;