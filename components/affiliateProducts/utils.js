export const cbOne = (arr, key, query) => {
  return arr.filter(item => {
    return item[key]?.toLowerCase().includes(query.toLowerCase());
  });
};

export const cbTwo = (arr, dateListed) => {
  const listedDate = new Date(dateListed).toLocaleDateString();

  return arr.filter(item => {
    return new Date(item.date_created).toLocaleDateString() === listedDate;
  });
};
