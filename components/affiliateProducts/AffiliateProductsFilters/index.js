import { useState } from "react";
import Image from "next/image";
import { Button, DatePicker, Input, Select, Skeleton } from "antd";
import { MdOutlineCancel } from "react-icons/md";
import moment from "moment";
import styles from "./index.module.scss";

const sortByOptions = [
  { label: "Launch Date", value: "launchDate" },
  { label: "Sales", value: "sales" },
];

const cb = (arr, from, to) => {
  const fromDate = Date.parse(from);
  const toDate = Date.parse(to);

  return arr.filter(item => {
    const dateToMs = Date.parse(item.date_created);

    if (fromDate > toDate) {
      return dateToMs <= fromDate && dateToMs >= toDate;
    }

    return dateToMs >= fromDate && dateToMs <= toDate;
  });
};

const ResetBtn = ({ resetFilters }) => (
  <div className={styles.resetFilters}>
    <Button shape="round" icon={<MdOutlineCancel />} onClick={resetFilters}>
      Clear filters
    </Button>
  </div>
);

const AffiliateProductsFilters = ({ data, setFiltered, searchQuery }) => {
  const [productName, setProductName] = useState("");
  const [kreatorName, setKreatorName] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [productType, setProductType] = useState("");
  const [dateListed, setDateListed] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const handleProductName = e => {
    setProductName(e.target.value);
  };

  const handleKreatorName = e => {
    setKreatorName(e.target.value);
  };

  const handleSortBy = value => {
    setSortBy(value);
  };

  const handleProductType = value => {
    setProductType(value);
  };

  const handleDateListed = (_, dateStr) => {
    setDateListed(dateStr);
  };

  const handleSubmitFilter = () => {
    if (!search && !currency && !from && !to) {
      return;
    }

    let tempArr;

    if (search) {
      tempArr = data.filter(item => {
        if (item[searchQuery]) {
          return item[searchQuery].toLowerCase().includes(search.toLowerCase());
        }

        return null;
      });
    }

    if (currency && tempArr) {
      tempArr = tempArr.filter(item => item.currency === currency);
    } else if (currency && !tempArr) {
      tempArr = data.filter(item => item.currency === currency);
    }

    if (from && to && tempArr) {
      tempArr = cb(tempArr, from, to);
    } else if (from && to && !tempArr) {
      tempArr = cb(data, from, to);
    }

    if (tempArr) {
      setFiltered(tempArr);
      setIsFiltered(true);
      setShowFilter(false);
    }
  };

  const resetFilters = () => {
    setFiltered(null);
    setIsFiltered(false);
    setProductName("");
    setKreatorName("");
    setSortBy("");
    setProductType("");
    setDateListed("");
  };

  const handleShowFilter = () => {
    setShowFilter(true);
  };

  const handleHideFilter = () => {
    setShowFilter(false);
  };

  return (
    <>
      <div className={styles.filterToggle}>
        <Button shape="round" onClick={handleShowFilter}>
          Show Filters...
        </Button>
        {isFiltered && <ResetBtn resetFilters={resetFilters} />}
      </div>
      <div
        className={
          showFilter
            ? `${styles.filtersContainer} ${styles.filtersContainerVisible}`
            : `${styles.filtersContainer}`
        }
      >
        <Button
          shape="circle"
          type="text"
          icon={<MdOutlineCancel />}
          onClick={handleHideFilter}
          className={styles.closeFilter}
        />
        {/* {data.length === 0 ? (
          <div className={styles.skeletonContainer}>
            <Skeleton.Input active size="large" />
            <Skeleton.Input active size="large" />
            <Skeleton.Input active size="large" />
            <Skeleton.Input active size="large" />
            <Skeleton.Input active size="large" />
          </div>
        ) : ( */}
        <div
          className={`${styles.allFiltersWrapper} ${
            isFiltered ? styles.mdMargin : styles.lgMargin
          }`}
        >
          <div className={styles.filterInputs}>
            <div className={styles.filterWrapper}>
              <span>Product Name</span>
              <Input
                placeholder="Search by product name"
                size="large"
                onChange={handleProductName}
                value={productName}
              />
            </div>
            <div className={styles.filterWrapper}>
              <span>Kreator Name</span>
              <Input
                placeholder="Search by kreator name"
                size="large"
                onChange={handleKreatorName}
                value={kreatorName}
              />
            </div>
            {/* <div className={styles.filterWrapper}>
              <span>Sort By</span>
              <Select
                options={sortByOptions}
                placeholder="Launch Date"
                size="large"
                onChange={handleSortBy}
              />
            </div> */}
            <div className={styles.filterWrapper}>
              <span>Product Type</span>
              <Select
                placeholder="All"
                size="large"
                onChange={handleProductType}
              />
            </div>
            <div className={styles.filterWrapper}>
              <span>Date Listed</span>
              <DatePicker
                placeholder="2021-07-22"
                size="large"
                onChange={handleDateListed}
                value={dateListed ? moment(dateListed, "YYYY-MM-DD") : ""}
              />
            </div>
          </div>
          <div className={styles.filterButton}>
            <Button size="large" type="primary" onClick={handleSubmitFilter}>
              <Image
                src="/images/FilterIcon.png"
                alt="Filter icon"
                width={19}
                height={16}
              />
              &nbsp; Filter
            </Button>
          </div>
        </div>
        {/* )} */}
      </div>
      {isFiltered && <ResetBtn resetFilters={resetFilters} />}
    </>
  );
};

export default AffiliateProductsFilters;
