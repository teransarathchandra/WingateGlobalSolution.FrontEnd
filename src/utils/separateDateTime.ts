export const separateDateTime = async (datetime, dateFormat) => {

  const parsedDate = new Date(datetime);

  // Extracting components
  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getDate();
  const hours = parsedDate.getHours();
  const minutes = parsedDate.getMinutes();
  const seconds = parsedDate.getSeconds();

  const formatNumber = (num) => num.toString().padStart(2, '0');

  let formattedDate;
  switch (dateFormat) {
    case 'YYYY-MM-DD':
      formattedDate = `${year}-${formatNumber(month)}-${formatNumber(day)}`;
      break;
    case 'MM-DD-YYYY':
        formattedDate = `${formatNumber(month)}-${formatNumber(day)}-${year}`;
        break;
    case 'DD-MM-YYYY':
      formattedDate = `${formatNumber(day)}-${formatNumber(month)}-${year}`;
      break;
    default:
      formattedDate = `${year}-${formatNumber(month)}-${formatNumber(day)}`;
  }

  const formattedTime = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
}
