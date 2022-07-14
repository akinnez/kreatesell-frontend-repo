import { useState, useMemo } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Form, Button, DatePicker, Input, Select, Row, Col } from "antd";
import moment from "moment";
import ResetFilters from "components/ResetFilters";
import styles from "./index.module.scss";

const Filters = ({ setFilters, setLoading }) => {
  const [isFiltered, setIsFiltered] = useState(false);
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

  const handleDate = (_, dateStr) => {
    form.setFieldsValue({
      date_listed: dateStr ? moment(dateStr, "YYYY-MM-DD") : "",
    });
  };

  const handleSubmitFilter = values => {
    const { product_name, affiliate_name, sort_by, product_type, date_listed } =
      values;

    if (
      !product_name &&
      !affiliate_name &&
      !sort_by &&
      !product_type &&
      !date_listed
    ) {
      return;
    }

    setIsFiltered(true);
    setLoading(true);
    setFilters(s => ({
      ...s,
      page: 1,
      productName: product_name || "",
      affiliateName: affiliate_name || "",
      sortBy: sort_by || null,
      productType: product_type || null,
      requestDate: date_listed ? date_listed._i : "",
    }));
  };

  const resetFilters = () => {
    form.resetFields();
    setIsFiltered(false);
    // setLoading(true);
    setFilters(s => ({
      ...s,
      page: 1,
      productName: "",
      affiliateName: "",
      sortBy: null,
      productType: null,
      requestDate: "",
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
        <Row gutter={[15, 14]} align="bottom" justify="space-between" wrap>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 8 }}
            xl={{ span: 4 }}
            className={styles.input__wrapper}
          >
            <Form.Item label="Product Name" name="product_name">
              <Input
                placeholder="Search By Product Name"
                onChange={handleSearch("product_name")}
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 8 }}
            xl={{ span: 4 }}
            className={styles.input__wrapper}
          >
            <Form.Item label="Affiliate Name" name="affiliate_name">
              <Input
                placeholder="Search By Affiliate Name"
                onChange={handleSearch("affiliate_name")}
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 12 }}
            sm={{ span: 12 }}
            md={{ span: 8 }}
            xl={{ span: 4 }}
            className={styles.input__wrapper}
          >
            <Form.Item label="Sort By" name="sort_by">
              <Select
                placeholder="Launch Date"
                onChange={handleOptions("sort_by")}
              >
                <Select.Option value="launchDate">Launch Date</Select.Option>
                <Select.Option value="sales">Sales</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 12 }}
            sm={{ span: 12 }}
            md={{ span: 8 }}
            xl={{ span: 4 }}
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
            xs={{ span: 12 }}
            sm={{ span: 12 }}
            md={{ span: 8 }}
            xl={{ span: 4 }}
            className={styles.input__wrapper}
          >
            <Form.Item label="Date Listed" name="date_listed">
              <DatePicker
                placeholder="2021-07-22"
                onChange={handleDate}
                allowClear={false}
              />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 12 }}
            sm={{ span: 12 }}
            md={{ span: 8 }}
            xl={{ span: 3 }}
            className={`${styles.input__wrapper} ${styles.filter__btn}`}
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
      {isFiltered && <ResetFilters resetFilters={resetFilters} />}
    </div>
  );
};

export default Filters;
