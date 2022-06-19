import { useState, useEffect } from "react";

const useFilters = api => {
  const [uri, setUri] = useState("");
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    dateListed: "",
    productName: "",
    productType: null,
    kreatorName: "",
    affiliateName: "",
    status: "All",
    requestDate: "",
  });

  useEffect(() => {
    const url = new URL(
      `${process.env.BASE_URL}${api}?Page=${filters.page}&Limit=${filters.limit}`
    );

    if (filters.dateListed) {
      url.searchParams.set("Launch_Date", filters.dateListed);
    }

    if (filters.productName) {
      url.searchParams.set("Product_Name", filters.productName);
    }

    if (filters.productType) {
      url.searchParams.set("Product_Type", filters.productType);
    }

    if (filters.kreatorName) {
      url.searchParams.set("Kreator_Name", filters.kreatorName);
    }

    if (filters.affiliateName) {
      url.searchParams.set("Kreator_Name", filters.affiliateName);
    }

    if (filters.status !== "All") {
      url.searchParams.set("Status", filters.status);
    }

    if (filters.requestDate) {
      url.searchParams.set("Launch_Date", filters.requestDate);
    }

    setUri(url);
  }, [
    api,
    filters.page,
    filters.limit,
    filters.dateListed,
    filters.productName,
    filters.productType,
    filters.kreatorName,
    filters.affiliateName,
    filters.status,
    filters.requestDate,
  ]);

  return { uri, filters, setFilters };
};

export default useFilters;
