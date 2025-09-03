const generateSlots = () => {
  const slots = [];
  let hour = 8;
  let minute = 0;

  while (hour < 24) {
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    let formatted = date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    });
    // Ensure AM/PM is uppercase
    formatted = formatted.replace('am', 'AM').replace('pm', 'PM');
    slots.push(formatted); // example: "08:00 AM"
    minute += 30;
    if (minute === 60) {
      hour += 1;
      minute = 0;
    }

    if (hour === 24) break;
  }
console.log(slots);
  return slots;
  
  
};

module.exports = generateSlots;
