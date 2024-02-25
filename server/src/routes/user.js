const express = require("express");
const Pdd = require("../classes/PddClass");
const User = require("../classes/UserClass");
const Stock = require("../classes/StockCollectorClass");
const HistoCollector = require("../classes/HistoCollectorClass");
const Usine = require("../classes/UsineClass");
const Chargement = require("../classes/ChargementClass");
const HistoTransporter = require("../classes/HistoTransporterClass");
const router = express.Router()


// Create an User
router.post("/", async (req, res) => {
  try {
    const user = req.body
    const newUser = await User.create(user)
    res.status(201).send(newUser)

  } catch (error) {
    res.status(500).send(error)
  }
});

// router.post("/discharge/collector", async(req, res)  => {
//   try{
//   const newDischarge = req.body;
//   const pdd = await Pdd.findById(newDischarge.pdd);
//   const newStock = pdd.kilo + newDischarge.kilo
//   await Pdd.update(pdd._id, { kilo: newStock })
//   await Stock.update(newDischarge.collector, {kilo: 0})
//   await HistoCollector.create(newDischarge)
//   res.status(200).send('newDischarge success');
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });



router.post("/discharge/collector", async (req, res) => {
  try {
    const { pdd_, collector, kilo } = req.body;
    const kiloNum = parseFloat(kilo);
    // const pdd = await Pdd.findById(newDischarge.pdd);
    // const newStock = pdd.kilo + newDischarge.kilo
    

    const collectorStock = await Stock.findByCollector(collector._id);

    if (collectorStock) {
      const newCollectorStock = collectorStock.kilo + kiloNum;
      await Stock.update(collectorStock._id, { kilo: newCollectorStock });

    } else {
      await Stock.create({
        collector: collector._id,
        kilo: kiloNum,
      });

    }

    // const newCollectorStock = collectorStock.kilo + kiloNum;
    // await Stock.update(collectorStock._id, { kilo: newCollectorStock })
    await Pdd.update(pdd_._id, pdd_)

    await HistoCollector.create({ kilo: kiloNum, pdd: pdd_._id, collector: collector._id })

    res.status(200).send('newDischarge success');
  } catch (error) {
    res.status(500).send(error);
  }
});


router.post("/discharge/transporter", async (req, res) => {
  try {
    const { usine_, chargement } = req.body;

    await Chargement.update(chargement._id, {kilo: 0})
    await Usine.update(usine_._id, usine_)
    await HistoTransporter.create({kilo: chargement.kilo, transporter: chargement.transporter})
    // await Chargement.remove(chargement)
    res.status(200).send('newDischarge success');
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});



// Update an User
router.put("/:id", async (req, res) => {
  try {
    const user = req.body;
    const _id = req.params.id;

    const result = await User.update(_id, user);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Delete an User
router.delete("/:id", async (req, res) => {
  try {
    const user = req.params.id;
    const newUser = await User.remove(user)
    res.status(200).send(newUser)
  } catch (error) {
    res.status(500).send(error)
  }
});


// Find an User
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).send(users)
  } catch (error) {
    res.status(500).send(error)
  }
});


// Find an User by id
router.get("/find/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const newUser = await User.findById(_id);
    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;