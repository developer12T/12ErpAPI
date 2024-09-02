module.exports.formatDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
};

module.exports.getCurrentTimeFormatted = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}${minutes}${seconds}`;
};

module.exports.getCurrentYearMonth = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = (now.getMonth() + 1).toString().padStart(2, "0");

  return `${currentYear}${currentMonth}`;
};
