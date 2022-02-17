import { useState, useMemo } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Form, Button, DatePicker, Input, Select, Row, Col } from "antd";
import { MdOutlineCancel } from "react-icons/md";
import moment from "moment";
import styles from "./index.module.scss";

// const sortByOptions = [
//   { label: "Launch Date", value: "launchDate" },
//   { label: "Sales", value: "sales" },
// ];

const cbOne = (arr, key, query) => {
  return arr.filter(item => {
    return item[key].toLowerCase().includes(query.toLowerCase());
  });
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

  const types = useMemo(() => {
    if (productTypes.length === 0) return [];
    return [{ id: "all", product_type_name: "All" }, ...productTypes];
  }, [productTypes]);

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
    setProductType(`${value}`);
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
      if (productType === "all") {
        tempArr = tempArr;
      } else {
        tempArr = tempArr.filter(item => item.product_type_id === productType);
      }
    } else if (productType && !tempArr) {
      if (productType === "all") {
        tempArr = data;
      } else {
        tempArr = data.filter(item => item.product_type_id === productType);
      }
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
        <div className={isFiltered ? styles.mdMargin : styles.lgMargin}>
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={handleSubmitFilter}
            size="large"
          >
            <Row gutter={20} align="bottom" justify="space-between">
              <Col
                xs={{ span: 24 }}
                lg={{ span: 5 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="Product Name" name="productName">
                  <Input
                    placeholder="Search by product name"
                    onChange={handleProductName}
                    value={productName}
                  />
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 5 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="Kreator Name" name="kreator_name">
                  <Input
                    placeholder="Search by kreator name"
                    onChange={handleKreatorName}
                    value={kreatorName}
                  />
                </Form.Item>
              </Col>
              {/* <Col
                xs={{ span: 24 }}
                lg={{ span: 5 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="Launch Date" name="sort_by">
                  <Select
                    options={sortByOptions}
                    placeholder="Launch Date"
                    size="large"
                    onChange={handleSortBy}
                  />
                </Form.Item>
              </Col> */}
              <Col
                xs={{ span: 24 }}
                lg={{ span: 5 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="Product Type" name="product_type">
                  <Select
                    placeholder="All"
                    onChange={handleProductType}
                    value={productType}
                    allowClear
                  >
                    {types.map(({ id, product_type_name }) => (
                      <Select.Option key={id} value={id}>
                        {product_type_name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 5 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="Date Listed" name="date_listed">
                  <DatePicker
                    placeholder="2021-07-22"
                    onChange={handleDateListed}
                    value={dateListed ? moment(dateListed, "YYYY-MM-DD") : ""}
                  />
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 3 }}
                className={styles.filter__btn}
              >
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={handleSubmitFilter}
                  >
                    <Image
                      src="/images/FilterIcon.png"
                      alt="Filter icon"
                      width={19}
                      height={16}
                    />
                    &nbsp; Filter
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      {isFiltered && <ResetBtn resetFilters={resetFilters} />}
    </>
  );
};

export default AffiliateProductsFilters;
