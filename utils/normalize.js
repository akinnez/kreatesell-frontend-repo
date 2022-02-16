const normalize = (data, key) => {
  return data?.reduce((acc, curr) => {
    acc[curr[key]] = curr;
    return acc;
  }, {});
};

export default normalize;
