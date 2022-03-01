import { useState } from "react";
import Image from "next/image";
import { Row, Col, Form, Select, DatePicker, Button } from "antd";
import { MdOutlineCancel } from "react-icons/md";
import { currencyOptions } from "utils";
import styles from "./index.module.scss";

const ResetBtn = ({ resetFilters }) => (
  <div className={styles.resetFilters}>
    <Button shape="round" icon={<MdOutlineCancel />} onClick={resetFilters}>
      Clear filters
    </Button>
  </div>
);

const options = [
  { label: "Today", value: "today" },
  { label: "Last Week", value: "last week" },
  { label: "Last Month", value: "last month" },
  { label: "Last Year", value: "last year" },
];

const RecoveryStatusFilters = () => {
  const [isFiltered, setIsFiltered] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [form] = Form.useForm();

  const handleShow = value => {
    form.setFieldsValue({ show: value });
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
    console.log("submitted - ", values);
  };

  const handleShowFilter = () => {
    setShowFilter(true);
  };

  const handleHideFilter = () => {
    setShowFilter(false);
  };

  const resetFilters = () => {
    // setFiltered(null);
    setIsFiltered(false);
    form.resetFields();
  };

  return (
    <div>
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
                <Form.Item label="Show" name="show">
                  <Select
                    placeholder="Today"
                    onChange={handleShow}
                    options={options}
                  />
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 5 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="Currency" name="currency">
                  <Select
                    placeholder="NGN"
                    onChange={handleCurrency}
                    options={currencyOptions}
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
    </div>
  );
};

export default RecoveryStatusFilters;
