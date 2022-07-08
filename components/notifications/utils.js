export const generateName = (name, type) => {
  return name
    ? name
    : type === "affiliate request"
    ? "A Kreator"
    : "An affiliate";
};

export const generateProductName = (productName, type) => {
  return productName
    ? productName
    : type === "affiliate request"
    ? "their product"
    : "A product";
};
