const Booking = require('../models/Booking');

const formatSlot = (rawSlot) => {
  // Accept slot values like "08:00 AM", "8:00 AM", "08:30 am", etc.
  if (
    typeof rawSlot === 'string' &&
    /^([0]?[8-9]|1[0-9]|2[0-3]):[0-5][0-9] ?([AaPp][Mm])$/.test(
      rawSlot.replace(/\s+/g, '').replace(/\./g, '')
    )
  ) {
    // Normalize to "HH:MM AM/PM" format
    let [time, period] = rawSlot.trim().split(' ');
    let [h, m] = time.split(':');
    h = h.padStart(2, '0');
    period = period ? period.toUpperCase() : '';
    return `${h}:${m} ${period}`;
  }
  throw new Error('Invalid slot format');
};

exports.bookSlot = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('User from token:', req.user);
    const { name, mobile, message, time } = req.body;

    // Validate required fields
    if (!name || !mobile || !time) {
      return res.status(400).json({ 
        message: 'Name, mobile, and time are required fields' 
      });
    }

    // Validate mobile number format
    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({ 
        message: 'Mobile number must be 10 digits' 
      });
    }

    let formattedSlot;
    try {
      formattedSlot = formatSlot(time);
    } catch (e) {
      console.log('Invalid slot value received:', time);
      return res.status(400).json({ message: 'Invalid time slot selected. Please choose a valid slot.' });
    }
    console.log('Original time:', time, 'Formatted slot:', formattedSlot);

    const count = await Booking.countDocuments({ slot: formattedSlot });
    console.log('Current bookings for this slot:', count);

    if (count >= 10) {
      return res.status(400).json({ message: 'Booking slot is full' });
    }

    const booking = await Booking.create({
      user: req.user.id,
      name,
      mobile,
      message: message || '',
      slot: formattedSlot
    });

    console.log('Booking created successfully:', booking);
    res.status(201).json(booking);
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ error: err.message });
  }
};


exports.getAllBookings = async (req, res) => {
  try {
    const { email } = req.query; 
    console.log('Searching for email:', email);
    
    // First find the user with this email
    const Doctor = require('../models/User');
    const user = await Doctor.findOne({ email: email });
    
    if (!user) {
      return res.json([]); // Return empty array if user not found
    }
    
    // Then find all bookings for this user
    const bookings = await Booking.find({ user: user._id });
    console.log('Found bookings:', bookings);
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: error.message });
  }
};

// Admin function to get all bookings from all users
exports.getAllBookingsForAdmin = async (req, res) => {
  try {
    // Get all bookings and populate user details
    const bookings = await Booking.find({}).populate('user', 'email name');
    console.log('Admin fetching all bookings:', bookings.length);
    // Map bookings to send slot and createdAt in correct format
    const mapped = bookings.map(b => ({
      ...b.toObject(),
      slot: b.slot,
      createdAt: b.createdAt ? b.createdAt.toISOString() : null
    }));
    res.json(mapped);
  } catch (error) {
    console.error('Error fetching all bookings for admin:', error);
    res.status(500).json({ error: error.message });
  }
};
