const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = "mysecretkey123";

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, phone, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (err) { res.status(500).json(err); }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("User not found");
    
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json("Wrong password");

    const token = jwt.sign({ id: user._id, name: user.name }, SECRET); //_doc is raw data(name, email, phone password) without any other mongoose utility functions.
    const { password, ...others } = user._doc; // pulled password out
    res.status(200).json({ ...others, token }); // only sending others and not password
  } catch (err) { res.status(500).json(err); }
});

module.exports = router;