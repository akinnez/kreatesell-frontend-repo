const productPriceFn = prices => {
  if (!prices || prices.length === 0) return null;

  return {
    currency: prices[0].currency_name,
    price: prices[0].price,
  };
};

export default productPriceFn;
