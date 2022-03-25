import { useState, useMemo } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Form, Button, DatePicker, Input, Select, Row, Col } from "antd";
import { MdOutlineCancel } from "react-icons/md";
import moment from "moment";
import normalize from "utils/normalize";
import { cbOne, cbTwo } from "../callbacks";
import styles from "./index.module.scss";

const ResetBtn = ({ resetFilters }) => (
  <div className={styles.resetFilters}>
    <Button shape="round" icon={<MdOutlineCancel />} onClick={resetFilters}>
      Clear filters
    </Button>
  </div>
);

const AffiliateFilters = ({ data, setFiltered }) => {
  const [isFiltered, setIsFiltered] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const { productTypes } = useSelector(state => state.product);

  const types = useMemo(() => {
    return [{ id: "all", product_type_name: "All" }, ...productTypes];
  }, [productTypes]);

  const [normalizeById, normalizeByName] = useMemo(() => {
    const normalizeById = normalize(types, "id");
    const normalizeByName = normalize(types, "product_type_name");

    return [normalizeById, normalizeByName];
  }, [types]);

  const [form] = Form.useForm();

  const handleSearch = field => e => {
    form.setFieldsValue({ [field]: e.target.value });
  };

  const handleProductType = value => {
    form.setFieldsValue({
      product_type: normalizeById[value].product_type_name,
    });
  };

  const handleDateListed = (_, dateStr) => {
    form.setFieldsValue({
      date_listed: dateStr ? moment(dateStr, "YYYY-MM-DD") : "",
    });
  };

  const handleSubmitFilter = values => {
    const { product_name, kreator_name, product_type, date_listed } = values;

    if (!product_name && !kreator_name && !product_type && !date_listed) {
      return;
    }

    const productType = normalizeByName[product_type]?.id;
    let tempArr;

    if (product_name) {
      tempArr = cbOne(data, "product_name", product_name);
    }

    if (kreator_name && tempArr) {
      tempArr = cbOne(tempArr, "kreator_name", kreator_name);
    } else if (kreator_name && !tempArr) {
      tempArr = cbOne(data, "kreator_name", kreator_name);
    }

    if (productType && tempArr) {
      if (productType === "all") {
        tempArr = tempArr;
      } else {
        tempArr = tempArr.filter(item => +item.product_type_id === productType);
      }
    } else if (productType && !tempArr) {
      if (productType === "all") {
        tempArr = data;
      } else {
        tempArr = data.filter(item => +item.product_type_id === productType);
      }
    }

    if (date_listed && tempArr) {
      tempArr = cbTwo(tempArr, date_listed._i);
    } else if (date_listed && !tempArr) {
      tempArr = cbTwo(data, date_listed._i);
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
                <Form.Item label="Product Name" name="product_name">
                  <Input
                    placeholder="Search by product name"
                    onChange={handleSearch("product_name")}
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
                    onChange={handleSearch("kreator_name")}
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
