const productPriceFn = images => {
  if (!images || images.length === 0) return null;

  return images
    .filter(images => images.file_type !== 4)
    .map(item => item.filename.split(",")[0])[0];
};

export default productPriceFn;
