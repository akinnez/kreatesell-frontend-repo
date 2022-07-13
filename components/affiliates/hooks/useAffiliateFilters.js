import { useState } from "react";

const useAffiliateFilters = api => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    productName: "",
    kreatorName: "",
    sortBy: null,
    productType: null,
    dateListed: "",
  });

  const url = new URL(
    `${process.env.BASE_URL}${api}?Page=${filters.page}&Limit=${filters.limit}`
  );

  if (filters.productName) {
    url.searchParams.set("Product_Name", filters.productName);
  }

  if (filters.kreatorName) {
    url.searchParams.set("Kreator_Name", filters.kreatorName);
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
    url.searchParams.set("DateListed", filters.dateListed);
  }

  return { url, filters, setFilters };
};

export default useAffiliateFilters;
