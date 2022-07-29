const dataLoading = ({ products, loading, response, error, isValidating }) => {
  let isLoading;

  // NOTE: the order of arrangment is important
  if (loading && response) {
    isLoading = false;
  }else if(loading){
    isLoading=true;
  } else if (!response && !error) {
    isLoading = true;
  } else if (products.length === 0 && !isValidating) {
    isLoading = false;
  } else {
    isLoading = false;
  }

  return isLoading;
};

export default dataLoading;
