import { useState } from "react";
import Image from "next/image";
import { Form, Button, DatePicker, Input, Select, Row, Col } from "antd";
import { MdOutlineCancel } from "react-icons/md";
import moment from "moment";
import { currencyOptions } from "utils";
import styles from "./index.module.scss";

const cb = (arr, from, to) => {
  const fromDate = new Date(from).toLocaleDateString();
  const parsedFromDate = Date.parse(fromDate);
  const toDate = new Date(to).toLocaleDateString();
  const parsedToDate = Date.parse(toDate);

  return arr.filter(item => {
    const newDate = new Date(item.date_created).toLocaleDateString();
    const parsedDate = Date.parse(newDate);

    if (parsedFromDate > parsedToDate) {
      return parsedDate <= parsedFromDate && parsedDate >= parsedToDate;
    }

    return parsedDate >= parsedFromDate && parsedDate <= parsedToDate;
  });
};

const ResetBtn = ({ resetFilters }) => (
  <div className={styles.resetFilters}>
    <Button shape="round" icon={<MdOutlineCancel />} onClick={resetFilters}>
      Clear filters
    </Button>
  </div>
);

const Filters = ({ data, setFiltered, searchQuery }) => {
  const [isFiltered, setIsFiltered] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [form] = Form.useForm();

  const handleSearch = e => {
    form.setFieldsValue({ search: e.target.value });
  };

  const handleCurrency = value => {
    form.setFieldsValue({ currency: value });
  };

  const handleFrom = (_, dateStr) => {
    form.setFieldsValue({
      from: dateStr ? moment(dateStr, "YYYY-MM-DD") : "",
    });
  };

  const handleTo = (_, dateStr) => {
    form.setFieldsValue({
      to: dateStr ? moment(dateStr, "YYYY-MM-DD") : "",
    });
  };

  const handleSubmitFilter = values => {
    const { search, currency, from, to } = values;

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
      tempArr = cb(tempArr, from._i, to._i);
    } else if (from && to && !tempArr) {
      tempArr = cb(data, from._i, to._i);
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
    form.resetFields();
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
            form={form}
            name="filter_form"
          >
            <Row gutter={20} align="bottom" justify="space-between">
              <Col
                xs={{ span: 24 }}
                lg={{ span: 5 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="Search" name="search">
                  <Input placeholder="Search" onChange={handleSearch} />
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 5 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="Currency" name="currency">
                  <Select
                    options={currencyOptions}
                    placeholder="NGN"
                    onChange={handleCurrency}
                  />
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 5 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="From" name="from">
                  <DatePicker
                    placeholder="2021-07-22"
                    onChange={handleFrom}
                    allowClear={false}
                  />
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 5 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="To" name="to">
                  <DatePicker
                    placeholder="2021-07-22"
                    onChange={handleTo}
                    allowClear={false}
                  />
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 3 }}
                className={styles.filter__btn}
              >
                <Form.Item>
                  <Button type="primary" htmlType="submit">
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

export default Filters;
