import { useState } from "react";

const useFilters = api => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    productName: "",
    affiliateName: "",
    sortBy: null,
    productType: null,
    dateListed: "",
    status: "All",
  });

  const url = new URL(
    `${process.env.BASE_URL}${api}?Page=${filters.page}&Limit=${filters.limit}`
  );

  if (filters.productName) {
    url.searchParams.set("Product_Name", filters.productName);
  }

  if (filters.affiliateName) {
    url.searchParams.set("Affiliate_Name", filters.affiliateName);
  }

  if (filters.sortBy) {
    if (filters.sortBy === "launchDate") {
      url.searchParams.set("LaunchDate", true);
    } else if (filters.sortBy === "sales") {
      url.searchParams.set("TotalSales", true);
    }
  }

  if (filters.productType && filters.productType !== "all") {
    url.searchParams.set("Product_Type", filters.productType);
  }

  if (filters.dateListed) {
    url.searchParams.set("Date_Listed", filters.dateListed);
  }

  if (filters.status !== "All") {
    url.searchParams.set("Status", filters.status);
  }

  return { url, filters, setFilters };
};

export default useFilters;
