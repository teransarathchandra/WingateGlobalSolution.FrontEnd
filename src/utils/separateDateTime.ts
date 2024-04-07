export const separateDateTime = async (datetime, dateFormat) => {

  // Parse the datetime string into a Date object
  const parsedDate = new Date(datetime);

  // Extracting components
  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1; // getMonth() returns 0-11
  const day = parsedDate.getDate();
  const hours = parsedDate.getHours();
  const minutes = parsedDate.getMinutes();
  const seconds = parsedDate.getSeconds();

  // Helper function to ensure two-digit formats
  const formatNumber = (num) => num.toString().padStart(2, '0');

  // Handling various date formats
  let formattedDate, formattedTime;
  switch (dateFormat) {
    case 'YYYY-MM-DD':
      formattedDate = `${year}-${formatNumber(month)}-${formatNumber(day)}`;
      break;
    case 'DD-MM-YYYY':
      formattedDate = `${formatNumber(day)}-${formatNumber(month)}-${year}`;
      break;
    // Add more cases for different date formats as needed
    default:
      formattedDate = `${year}-${formatNumber(month)}-${formatNumber(day)}`;
  }

  // Formatting time
  formattedTime = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
}
