require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const slotRoutes = require('./routes/slotRoutes');
const cors = require('cors');

const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/slots', slotRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
