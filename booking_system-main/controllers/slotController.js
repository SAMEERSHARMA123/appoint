const generateSlots = require('../utils/generateSlots');
const Booking = require('../models/Booking');

exports.getAvailableSlots = async (req, res) => {
  try {
    const allSlots = generateSlots();
    const result = {};

    for (let slot of allSlots) {
      const count = await Booking.countDocuments({ slot });
      result[slot] = {
        count,
        isFull: count >= 10
      };
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error generating slots', error: err.message });
  }
};
