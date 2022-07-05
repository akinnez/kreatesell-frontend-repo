const formatAccountNumber = accountNumber => {
  const lastSet = accountNumber.substring(7);
  return `*******${lastSet}`;
};

export default formatAccountNumber;
