import { useState, useMemo } from "react";
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

const Filters = ({
  setProductName,
  setAffiliateName,
  setProductType,
  setRequestDate,
}) => {
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

  const handleProductType = value => {
    form.setFieldsValue({ product_type: value });
  };

  const handleDate = (_, dateStr) => {
    form.setFieldsValue({
      date_listed: dateStr ? moment(dateStr, "YYYY-MM-DD") : "",
    });
  };

  const handleSubmitFilter = values => {
    const { product_name, affiliate_name, product_type, date_listed } = values;

    if (!product_name && !affiliate_name && !product_type && !date_listed) {
      return;
    }

    setProductName(product_name || "");
    setAffiliateName(affiliate_name || "");
    setProductType(product_type && product_type !== "all" ? product_type : "");
    setRequestDate(date_listed ? date_listed._i : "");
    setIsFiltered(true);
    setShowFilter(false);
  };

  const resetFilters = () => {
    setProductName("");
    setAffiliateName("");
    setProductType("");
    setRequestDate("");
    setIsFiltered(false);
    form.resetFields();
  };

  const handler = (setter, value) => () => {
    setter(value);
  };

  return (
    <>
      <div className={styles.filterToggle}>
        <Button shape="round" onClick={handler(setShowFilter, true)}>
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
          onClick={handler(setShowFilter, false)}
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
                <Form.Item label="Product Name" name="product_name">
                  <Input
                    placeholder="Search By Product Name"
                    onChange={handleSearch("product_name")}
                  />
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 5 }}
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
                xs={{ span: 24 }}
                lg={{ span: 5 }}
                className={styles.input__wrapper}
              >
                <Form.Item label="Product Type" name="product_type">
                  <Select placeholder="All" onChange={handleProductType}>
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
                    onChange={handleDate}
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
