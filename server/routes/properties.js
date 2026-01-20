const router = require('express').Router();
const Property = require('../models/Property');
const User = require('../models/User');

router.post('/', async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    const savedProperty = await newProperty.save();
    res.status(200).json(savedProperty);
  } catch (err) { res.status(500).json(err); }
});

router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().populate('userId', 'name phone email');
    res.status(200).json(properties);
  } catch (err) { res.status(500).json(err); }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) { res.status(500).json(err); }
});

router.delete('/:id', async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted");
  } catch (err) { res.status(500).json(err); }
});

module.exports = router;