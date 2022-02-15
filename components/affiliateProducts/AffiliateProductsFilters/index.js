import { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Button, DatePicker, Input, Select } from "antd";
import { MdOutlineCancel } from "react-icons/md";
import moment from "moment";
import styles from "./index.module.scss";

// const sortByOptions = [
//   { label: "Launch Date", value: "launchDate" },
//   { label: "Sales", value: "sales" },
// ];

const cbOne = (arr, key, query) => {
  arr.filter(item => item[key].toLowerCase().includes(query.toLowerCase()));
};

const cbTwo = (arr, dateListed) => {
  const listedDate = Date.parse(dateListed);
  return arr.filter(item => Date.parse(item.date_created) === listedDate);
};

const ResetBtn = ({ resetFilters }) => (
  <div className={styles.resetFilters}>
    <Button shape="round" icon={<MdOutlineCancel />} onClick={resetFilters}>
      Clear filters
    </Button>
  </div>
);

const AffiliateProductsFilters = ({ data, setFiltered }) => {
  const [productName, setProductName] = useState("");
  const [kreatorName, setKreatorName] = useState("");
  // const [sortBy, setSortBy] = useState("");
  const [productType, setProductType] = useState("");
  const [dateListed, setDateListed] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const { productTypes } = useSelector(state => state.product);

  const handleProductName = e => {
    setProductName(e.target.value);
  };

  const handleKreatorName = e => {
    setKreatorName(e.target.value);
  };

  // const handleSortBy = value => {
  //   setSortBy(value);
  // };

  const handleProductType = value => {
    setProductType(value);
  };

  const handleDateListed = (_, dateStr) => {
    setDateListed(dateStr);
  };

  const handleSubmitFilter = () => {
    if (!productName && !kreatorName && !productType && !dateListed) {
      return;
    }

    let tempArr;

    if (productName) {
      tempArr = cbOne(data, "product_name", productName);
    }

    if (kreatorName && tempArr) {
      tempArr = cbOne(tempArr, "kreator_name", kreatorName);
    } else if (kreatorName && !tempArr) {
      tempArr = cbOne(data, "kreator_name", kreatorName);
    }

    if (productType && tempArr) {
      tempArr = tempArr.filter(item => item.product_type === productType);
    } else if (productType && !tempArr) {
      tempArr = data.filter(item => item.product_type === productType);
    }

    if (dateListed && tempArr) {
      tempArr = cbTwo(tempArr, dateListed);
    } else if (dateListed && !tempArr) {
      tempArr = cbTwo(data, dateListed);
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
    // setSortBy("");
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
              >
                {productTypes.map(({ id, product_type_name }) => (
                  <Select.Option key={id} value={id}>
                    {product_type_name}
                  </Select.Option>
                ))}
              </Select>
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
