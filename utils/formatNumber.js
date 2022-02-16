const formatNumber = number => {
  const formatter = new Intl.NumberFormat("en-US");
  return formatter.format(number);
};

export default formatNumber;
