import { useMemo, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Form, Button, DatePicker, Input, Select, Row, Col } from "antd";
import { MdOutlineCancel } from "react-icons/md";
import moment from "moment";
import styles from "./index.module.scss";

const ResetBtn = ({ resetFilters }) => (
  <div className={styles.resetFilters}>
    <Button shape="round" icon={<MdOutlineCancel />} onClick={resetFilters}>
      Clear filters
    </Button>
  </div>
);

const AffiliateFilters = ({ setFilters }) => {
  const [isFiltered, setIsFiltered] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const { productTypes } = useSelector(state => state.product);
  const [form] = Form.useForm();

  const types = useMemo(() => {
    return [{ id: "all", product_type_name: "All" }, ...productTypes];
  }, [productTypes]);

  const handleSearch = field => e => {
    form.setFieldsValue({ [field]: e.target.value });
  };

  const handleOptions = field => value => {
    form.setFieldsValue({ [field]: value });
  };

  const handleDateListed = (_, dateStr) => {
    form.setFieldsValue({
      date_listed: dateStr ? moment(dateStr, "YYYY-MM-DD") : "",
    });
  };

  const handleSubmitFilter = values => {
    const { product_name, kreator_name, sort_by, product_type, date_listed } =
      values;

    if (
      !product_name &&
      !kreator_name &&
      !sort_by &&
      !product_type &&
      !date_listed
    ) {
      return;
    }

    setIsFiltered(true);
    setShowFilter(false);
    setFilters(s => ({
      ...s,
      page: 1,
      productName: product_name || "",
      kreatorName: kreator_name || "",
      sortBy: sort_by || null,
      productType: product_type || null,
      dateListed: date_listed ? date_listed._i : "",
    }));
  };

  const resetFilters = () => {
    form.resetFields();
    setIsFiltered(false);
    setFilters(s => ({
      ...s,
      page: 1,
      productName: "",
      kreatorName: "",
      sortBy: null,
      productType: null,
      dateListed: "",
    }));
  };

  const handleClicks = (setter, value) => () => {
    setter(value);
  };

  return (
    <>
      <div className={styles.filterToggle}>
        <Button shape="round" onClick={handleClicks(setShowFilter, true)}>
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
          onClick={handleClicks(setShowFilter, false)}
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
                lg={{ span: 4 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="Product Name" name="product_name">
                  <Input
                    placeholder="Search by product name"
                    onChange={handleSearch("product_name")}
                  />
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 4 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="Kreator Name" name="kreator_name">
                  <Input
                    placeholder="Search by kreator name"
                    onChange={handleSearch("kreator_name")}
                  />
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 4 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="Sort By" name="sort_by">
                  <Select
                    placeholder="Launch Date"
                    onChange={handleOptions("sort_by")}
                  >
                    <Select.Option value="launchDate">
                      Launch Date
                    </Select.Option>
                    <Select.Option value="sales">Sales</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 4 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="Product Type" name="product_type">
                  <Select
                    placeholder="All"
                    onChange={handleOptions("product_type")}
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
                lg={{ span: 4 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="Date Listed" name="date_listed">
                  <DatePicker
                    placeholder="2021-07-22"
                    onChange={handleDateListed}
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

export default AffiliateFilters;
