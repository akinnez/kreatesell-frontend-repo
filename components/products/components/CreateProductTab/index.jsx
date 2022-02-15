import { useState, useEffect } from "react";
import { Button, Typography, Form, Divider, Input } from "antd";
import { useSelector } from "react-redux";
import { GetProductTypes } from "redux/actions";
import { BsJournalBookmark } from "react-icons/bs";
import { AiOutlineDollar } from "react-icons/ai";
import { MdCreditCard } from "react-icons/md";
import { useFormik } from "formik";
import Spinner from "components/Spinner";
import styles from "./index.module.scss";
import { CreateProductSchema } from "validation/CreateProduct.validation";

const { Title, Text } = Typography;

const iconMapper = {
  "Digital Download": BsJournalBookmark,
  "One-Time Subscription": AiOutlineDollar,
  Membership: MdCreditCard,
};

const CreateProductTab = () => {
  const { productTypes } = useSelector(state => state.product);
  const [productType, setProductType] = useState({
    id: 1,
    name: "Digital Download",
  });

  const getProductTypes = GetProductTypes();

  useEffect(() => {
    getProductTypes();
  }, []);

  const handleSubmit = () => {};

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: "",
      preOrder: "",
      releaseDate: "",
      contentFile: "",
      status: "",
    },
    // validationSchema: CreateProductSchema,
    onSubmit: handleSubmit,
  });
  const handleProductTypeChange = type => {
    setProductType(type);
  };

  if (productTypes.length === 0) {
    return <Spinner />;
  }

  const productTypeMapper = (
    <>
      {productTypes.map(item => {
        const Icon = iconMapper[item.product_type_name];
        const obj = { id: item.id, name: item.product_type_name };

        return (
          <Button
            key={item.id}
            icon={<Icon />}
            size="large"
            onClick={() => handleProductTypeChange(obj)}
            className={
              productType.id === item.id
                ? ` ${styles.btn} ${styles.active} `
                : `${styles.btn}`
            }
          >
            <span>{item.product_type_name}</span>
            &nbsp; - {item.product_type_description}
          </Button>
        );
      })}
    </>
  );

  return (
    <>
      <header className={styles.header}>
        <Title level={2}>Add a New Product</Title>
        <Text>Product Type</Text>
        <div className={styles.productTypes}>{productTypeMapper}</div>
      </header>
      <Divider />
      <section className={styles.productTypeForm}>
        <Title level={2}>{productType.name}</Title>
        <Form
          className={styles.creteProductForm}
          layout="vertical"
          onFinish={formik.handleSubmit}
          size="large"
        >
          <Form.Item
            label="Name"
            name="name"
            validateStatus={
              formik.touched.name && formik.errors.name && "error"
            }
            help={formik.touched.name && formik.errors.name}
          >
            <Input
              placeholder="Buyers see this name on the store front page; choose a simple and catchy name!"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            validateStatus={
              formik.touched.description && formik.errors.description && "error"
            }
            help={formik.touched.description && formik.errors.description}
          >
            <Input.TextArea
              rows={11}
              placeholder="A well detailed, persuasive and intriguing description about the product drives more sales. Don't forget, it is all about the product's audience, so keep it simple and personal."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
          </Form.Item>
        </Form>
      </section>
    </>
  );
};

export default CreateProductTab;
