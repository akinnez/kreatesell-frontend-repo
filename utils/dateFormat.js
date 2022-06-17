const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const fullMonths = [
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

const appendZero = t => (t < 10 ? `0${t}` : `${t}`);

export const localeDateString = dateStr => {
  if (!dateStr) return "";

  const d = new Date(dateStr);

  const month = d.getMonth() + 1;
  const day = d.getDate();
  const year = d.getFullYear();

  return `${appendZero(day)}/${appendZero(month)}/${year}`;
};

export const dateString = dateStr => {
  if (!dateStr) return "";

  const d = new Date(dateStr);

  const month = d.getMonth() + 1;
  const day = d.getDate();
  const year = d.getFullYear();

  return `${year}-${appendZero(month)}-${appendZero(day)} `;
};

export const formatDateString = dateStr => {
  if (!dateStr) return "";

  const d = new Date(dateStr);

  const month = fullMonths[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();

  return `${appendZero(day)} ${month}, ${year}`;
};

const dateFormat = dateStr => {
  if (!dateStr) return "";

  const d = new Date(dateStr);

  const month = months[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  const hour = d.getHours();
  const minute = d.getMinutes();

  const hr = hour > 12 ? hour - 12 : hour;
  const meridian = hour >= 12 ? "PM" : "AM";

  return `${month} ${day} ${year} · ${hr}:${appendZero(minute)} ${meridian}`;
};

export default dateFormat;
