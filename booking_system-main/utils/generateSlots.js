const generateSlots = () => {
  const slots = [];
  let hour = 8;
  let minute = 0;

  while (hour < 24) {
    // Always format with leading zero and uppercase AM/PM
    let h = hour.toString().padStart(2, '0');
    let m = minute.toString().padStart(2, '0');
    let period = hour < 12 ? 'AM' : 'PM';
    let formatted = `${h}:${m} ${period}`;
    slots.push(formatted);
    minute += 30;
    if (minute === 60) {
      hour += 1;
      minute = 0;
    }
    if (hour === 24) break;
  }
  // console.log(slots);
  return slots;
  
  
};

module.exports = generateSlots;
