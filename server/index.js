const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/properties');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/myEstateDB').then(() => console.log("DB Connected")).catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));