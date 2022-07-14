import { useState } from "react";
import Image from "next/image";
import { Form, Button, DatePicker, Input, Select, Row, Col } from "antd";
import { MdSearch } from "react-icons/md";
import moment from "moment";
import ResetFilters from "components/ResetFilters";
import { currencyOptions } from "utils";
import styles from "./index.module.scss";

const currencies = [{ value: "All", label: "All" }, ...currencyOptions];

const Filters = ({ setFilters, setLoading }) => {
  const [isFiltered, setIsFiltered] = useState(false);
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

    setIsFiltered(true);
    setLoading?.(true);
    setFilters(s => ({
      ...s,
      page: 1,
      productName: search || "",
      currency: currency,
      from: from ? from._i : "",
      to: to ? to._i : "",
    }));
  };

  const resetFilters = () => {
    form.resetFields();
    setIsFiltered(false);
    setFilters(s => ({
      ...s,
      page: 1,
      productName: "",
      currency: null,
      from: "",
      to: "",
    }));
  };

  return (
    <div className={isFiltered ? null : styles["lg-margin"]}>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={handleSubmitFilter}
        size="large"
        form={form}
        name="filter_form"
      >
        <Row gutter={[15, 14]} align="bottom" justify="start" wrap>
          <Col
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
            xl={{ span: 5 }}
            className={styles.input__wrapper}
          >
            <Form.Item label="Search" name="search">
              <Input
                placeholder="Click here to Search"
                onChange={handleSearch}
                prefix={<MdSearch color="#8C8C8C" fontSize={"1.2em"} />}
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 12 }}
            lg={{ span: 6 }}
            xl={{ span: 5 }}
            className={styles.input__wrapper}
          >
            <Form.Item label="Currency" name="currency">
              <Select
                options={currencies}
                placeholder="NGN"
                onChange={handleCurrency}
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 12 }}
            lg={{ span: 6 }}
            xl={{ span: 5 }}
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
            xs={{ span: 12 }}
            lg={{ span: 6 }}
            xl={{ span: 5 }}
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
          <Col className={`${styles.input__wrapper} ${styles.filter__btn}`}>
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
      {isFiltered && <ResetFilters resetFilters={resetFilters} />}
    </div>
  );
};

export default Filters;
