const express = require("express");
const Role = require("../classes/RoleClass");
const router = express.Router()



// Update a Role
router.put("/", async (req, res) => {
    try {
      const role = req.body;
      const _id = role._id;
  
      const result = await Role.update(_id, role);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });


// Remove a Role
router.delete("/", async (req, res) => {
    try {
        const role = req.body
        const newRole = await Role.remove(role)
        res.status(200).send(newRole)
    } catch (error) {
        res.status(500).send(error)
    }
});


// Find a Role
router.get("/", async (req, res) => {
    try {
        const role = req.body
        const newRole = await Role.find(role)
        res.status(200).send(newRole)
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;