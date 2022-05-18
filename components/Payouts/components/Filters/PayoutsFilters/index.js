import { useState } from "react";
import Image from "next/image";
import { Form, Button, DatePicker, Input, Select, Row, Col } from "antd";
import { MdOutlineCancel, MdSearch } from "react-icons/md";
import moment from "moment";
import { currencyOptions } from "utils";
import styles from "./index.module.scss";

const ResetBtn = ({ resetFilters }) => (
  <div className={styles.resetFilters}>
    <Button shape="round" icon={<MdOutlineCancel />} onClick={resetFilters}>
      Clear filters
    </Button>
  </div>
);

const Filters = ({ setStartDate, setEndDate, setProductName }) => {
  const [isFiltered, setIsFiltered] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [form] = Form.useForm();

  const handleSearch = e => {
    form.setFieldsValue({ search: e.target.value });
  };

  const handleCurrency = value => {
    form.setFieldsValue({ currency: value });
  };

  const handleDate = field => (_, dateStr) => {
    form.setFieldsValue({
      [field]: dateStr ? moment(dateStr, "YYYY-MM-DD") : "",
    });
  };

  const handleSubmitFilter = values => {
    const { search, currency, from, to } = values;

    if (!search && !currency && !from && !to) {
      return;
    }

    setStartDate(from ? from._i : "");
    setEndDate(to ? to._i : "");
    setProductName(search || "");
    setIsFiltered(true);
    setShowFilter(false);
  };

  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
    setProductName("");
    setIsFiltered(false);
    form.resetFields();
  };

  const handleToggle = value => () => {
    setShowFilter(value);
  };

  return (
    <>
      <div className={styles.filterToggle}>
        <Button shape="round" onClick={handleToggle(true)}>
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
          onClick={handleToggle(false)}
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
                  <Input placeholder="Click here to Search" onChange={handleSearch} prefix={<MdSearch color="#8C8C8C" fontSize={"1.2em"}/>} />
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
                    onChange={handleDate("from")}
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
                    onChange={handleDate("to")}
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
