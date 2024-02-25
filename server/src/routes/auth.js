const express = require('express');
const router = express.Router();
const Admin = require('../classes/AdminClass');
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const User = require('../classes/UserClass');
const StockCollector = require('../classes/StockCollectorClass');

router.post('/sign-up', async (req, res) => {
    try {
        const user_ = req.body;
    
        const user = await User.create(user_)
        const x = await StockCollector.create({kilo: 0, collector: user._id})

        // const token = jwt.sign(user_.toJSON(), process.env.TOKEN_SECRET_KEY);
    
        res.json({ user, x });   //(, token) inside 
      } catch (error) {
        res.status(500).send(error)
      }
});

router.post('/sign-in', async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findByUsername(username);
    
        if (!admin) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
    
        const isValidPassword = await bcryptjs.compare(password, admin.password)
    
        if (!isValidPassword) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
    
        const token = jwt.sign(admin.toJSON(), process.env.TOKEN_SECRET_KEY);

        const { firstname, lastname } = admin;
    
        res.json({ token, admin });
      } catch (error) {
        console.log(error)
        res.status(500).send(error)
      }
});

router.post('/client/sign-in', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isValidPassword = await bcryptjs.compare(password, user.password);
    console.log(password)

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if user has any of the allowed roles (Supervisor, Transporter, Collector)
    // const { role } = user;
    // const allowedRoles = ['6403f6bc0f0f92b0d5ab969c', '6403f6bc0f0f92b0d5ab969d', '6403f6bc0f0f92b0d5ab969e'];
    
    // if (!allowedRoles.includes(role)) {
    //   return res.status(401).json({ message: 'You are not authorized to access this page' });
    // }

    const token = jwt.sign(user.toJSON(), process.env.TOKEN_SECRET_KEY);

    const { firstName, lastName } = user;

    res.json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


module.exports = router;