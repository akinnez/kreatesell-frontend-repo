import { useState } from "react";
import Image from "next/image";
import { Form, Input, Button, DatePicker, Select, Row, Col } from "antd";
import { MdOutlineCancel } from "react-icons/md";
import moment from "moment";
import { currencyOptions } from "utils";
import styles from "./index.module.scss";

const showOptions = [
  { label: "Today", value: "today" },
  { label: "1 Week", value: "1Week" },
  { label: "1 Month", value: "1Month" },
  { label: "6 Months", value: "6Months" },
];

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

const UserFilters = ({ data, setFiltered, searchQuery }) => {
  const [isFiltered, setIsFiltered] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [form] = Form.useForm();

  const handleSearch = e => {
    form.setFieldsValue({ search: e.target.value });
  };

  const handleSelect = field => value => {
    form.setFieldsValue({ [field]: value });
  };

  const handleDatePicker = field => (_, dateStr) => {
    form.setFieldsValue({
      [field]: dateStr ? moment(dateStr, "YYYY-MM-DD") : "",
    });
  };

  const handleSubmitFilter = values => {
    const { search, show, currency, from, to } = values;

    if (!search && !show && !currency && !from && !to) {
      return;
    }

    // if (search) {
    //   tempArr = data.filter(item => {
    //     if (item[searchQuery]) {
    //       return item[searchQuery].toLowerCase().includes(search.toLowerCase());
    //     }

    //     return null;
    //   });
    // }

    // let tempArr;

    // if (show) {
    //   tempArr = data.filter(item => {
    //     if (item[searchQuery]) {
    //       return item[searchQuery].toLowerCase().includes(search.toLowerCase());
    //     }

    //     return null;
    //   });
    // }

    // if (currency && tempArr) {
    //   tempArr = tempArr.filter(item => item.currency === currency);
    // } else if (currency && !tempArr) {
    //   tempArr = data.filter(item => item.currency === currency);
    // }

    // if (from && to && tempArr) {
    //   tempArr = cb(tempArr, from._i, to._i);
    // } else if (from && to && !tempArr) {
    //   tempArr = cb(data, from._i, to._i);
    // }

    // if (tempArr) {
    //   setFiltered(tempArr);
    //   setIsFiltered(true);
    //   setShowFilter(false);
    // }
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
          >
            <Row gutter={20} align="bottom" justify="space-between">
              <Col
                xs={{ span: 24 }}
                lg={{ span: 4 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="Search" name="search">
                  <Input placeholder="Search" onChange={handleSearch} />
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 4 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="Show" name="show">
                  <Select
                    options={showOptions}
                    placeholder="Today"
                    onChange={handleSelect("show")}
                  />
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 4 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="Currency" name="currency">
                  <Select
                    options={currencyOptions}
                    placeholder="NGN"
                    onChange={handleSelect("currency")}
                  />
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 4 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="From" name="from">
                  <DatePicker
                    placeholder="2021-07-22"
                    onChange={handleDatePicker("from")}
                    allowClear={false}
                  />
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 4 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="To" name="to">
                  <DatePicker
                    placeholder="2021-07-22"
                    onChange={handleDatePicker("to")}
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

export default UserFilters;
