const express = require("express");
const Chargement = require("../classes/ChargementClass");
const HistoPdd = require("../classes/HistoPddClass");
const Pdd = require("../classes/PddClass");
const router = express.Router()


// Create a Pdd
router.post("/", async (req, res) => {
  try {
    const pdd = req.body
    const newPdd = await Pdd.create(pdd)
    res.status(201).send(newPdd)
  } catch (error) {
    res.status(500).send(error)
  }
});



router.post("/discharge/pdd", async (req, res) => {
  try {
    const {pdd_, transporter, kilo} = req.body;
    const kiloNum = parseFloat(kilo);

    const chargement = await Chargement.findByTransporter(transporter._id);

    if (chargement) {
      // If a Chargement document already exists, update its kilo property
      const newKilo = chargement.kilo + kiloNum;
      await Chargement.update(chargement._id, { kilo: newKilo });
    } else {
      // If no Chargement document exists, create a new one
      await Chargement.create({
        kilo: kiloNum,
        transporter: transporter._id,
        // pdd: pdd_._id
      });
    }

    // const newStock = chargement.kilo + kiloNum
    // await Chargement.update(chargement._id, { kilo: newStock })

    await Pdd.update(pdd_._id,  pdd_)
    
    await HistoPdd.create({transporter: transporter._id, kilo_transported: kiloNum, pdd: pdd_._id})
    
    res.status(200).send('newDischarge success');
  } catch (error) {
    res.status(500).send(error);
  }
}) 


// Update a Pdd
router.put("/:id", async (req, res) => {
  try {
    const pdd = req.body;
    const _id = req.params.id;

    const result = await Pdd.update(_id, pdd);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Delete a Pdd
router.delete("/:id", async (req, res) => {
  try {
    const pdd = req.params.id;
    const newPdd = await Pdd.remove(pdd)
    res.status(200).send(newPdd)
  } catch (error) {
    res.status(500).send(error)
  }
});


// Find a Pdd
router.get("/", async (req, res) => {
  try {
    const newPdd = await Pdd.find()
    res.status(200).send(newPdd)
  } catch (error) {
    res.status(500).send(error)
  }
});


// Find a Pdd by id
router.get("/find/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const newPdd = await Pdd.findById(_id);
    res.status(200).send(newPdd);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Pdd by Supervisor
router.get("/findsup/:supervisor_id", async (req, res) => {
  try {
    const { supervisor_id } = req.params;
    const newPdd = await Pdd.findBySupervisor(supervisor_id);
    res.status(200).send(newPdd);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;