import { useState } from "react";

const useFilters = api => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    productName: "",
    currency: null,
    from: "",
    to: "",
  });

  const url = new URL(
    `${process.env.BASE_URL}${api}?Page=${filters.page}&Limit=${filters.limit}`
  );

  if (filters.productName) {
    url.searchParams.set("Product_Name", filters.productName);
  }

  if (filters.currency && filters.currency !== "All") {
    url.searchParams.set("Currency", filters.currency);
  }

  if (filters.from) {
    url.searchParams.set("StartDate", filters.from);
  }

  if (filters.to) {
    url.searchParams.set("EndDate", filters.to);
  }

  return { url: url.href, filters, setFilters };
};

export default useFilters;