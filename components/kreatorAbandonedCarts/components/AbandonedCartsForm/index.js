import { useState } from "react";
import { Typography, Button, Form, Input, Switch, Select } from "antd";
import { useFormik } from "formik";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import Editor from "../Editor";
import {
  emailTags,
  options,
} from "components/kreatorAbandonedCarts/data/formData";
import styles from "./index.module.scss";

const { Text } = Typography;

const AbandonedCartsForm = ({ editMailData }) => {
  const [showTags, setShowTags] = useState(false);

  const submitHandler = values => {
    console.log("submitted", values);
  };

  const formik = useFormik({
    initialValues: {
      admin_title: editMailData?.admin_title || "",
      enable: editMailData?.enable ?? false,
      when_to_send: editMailData?.when_to_send || null,
      email_subject_line: editMailData?.email_subject_line || "",
      email_content: editMailData?.email_content || "",
    },
    onSubmit: submitHandler,
  });

  const customHandler = (field, value) => {
    formik.setFieldValue(field, value);
  };

  const handleToggle = () => {
    setShowTags(!showTags);
  };

  return (
    <Form
      className={styles.form}
      name="abandoned_carts_form"
      layout="vertical"
      size="large"
      onFinish={formik.handleSubmit}
      initialValues={{
        admin_title: formik.values.admin_title,
        when_to_send: formik.values.when_to_send,
        email_subject_line: formik.values.email_subject_line,
        email_content: formik.values.email_content,
      }}
    >
      <Form.Item label="Admin Title" name="admin_title">
        <Input
          placeholder="kreatesell"
          {...formik.getFieldProps("admin_title")}
        />
      </Form.Item>
      <div className={styles.form__switch}>
        <div>
          <label htmlFor="switch">Enabled?</label>
        </div>
        <Switch
          id="switch"
          onChange={checked => customHandler("enable", checked)}
          onBlur={formik.handleBlur}
          checked={formik.values.enable}
          name="enable"
        />
        <div>
          <span>{formik.values.enable ? "Enabled" : "Disabled"}</span>
        </div>
      </div>
      <Form.Item label="When To Send" name="when_to_send">
        <Select
          placeholder="10 min"
          options={options}
          onChange={val => customHandler("when_to_send", val)}
          onBlur={formik.handleBlur}
        />
      </Form.Item>
      <Form.Item label="Email Subject Line" name="email_subject_line">
        <Input
          placeholder="kreatesell"
          {...formik.getFieldProps("email_subject_line")}
        />
      </Form.Item>
      <Editor formik={formik} />
      <div className={styles.email__tags__container}>
        <div
          className={
            showTags
              ? `${styles.email__tags__header} ${styles.email__tags__header__clicked}`
              : `${styles.email__tags__header}`
          }
        >
          <Text>Email Tags</Text>
          <Button onClick={handleToggle}>
            Show Tags&nbsp;{" "}
            {showTags ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
          </Button>
        </div>
        <div
          className={
            showTags
              ? `${styles.email__tags} ${styles.email__tags__open}`
              : `${styles.email__tags}`
          }
        >
          {emailTags.map(({ id, tag, content }) => (
            <div key={id} className={styles.email__tag}>
              <Text>{`{${tag}}`}</Text>
              <Text>{content}</Text>
            </div>
          ))}
        </div>
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AbandonedCartsForm;
