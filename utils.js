export function metersToMiles(meters) {
  const metersNumber = parseFloat(meters);
  // Check if the conversion is successful and the input is a valid number
  if (!isNaN(metersNumber)) {
    // 1 meter is approximately 0.000621371 miles
    const miles = (metersNumber * 0.000621371).toFixed(1);
    return miles;
  } else {
    // Handle invalid input
    return "Invalid input. Please provide a valid number.";
  }
}

export function getFormattedDate() {
  // Get current date
  const today = new Date();
  // Define days and months arrays
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // Get day, month, and year
  const day = daysOfWeek[today.getDay()];
  const date = today.getDate();
  const month = monthsOfYear[today.getMonth()];
  // Get current year
  const year = today.getFullYear();
  // Format the current date without the year and return it
  return `${day} ${date}, ${month}`;
}
