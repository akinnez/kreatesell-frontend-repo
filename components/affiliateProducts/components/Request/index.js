import { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { Formik } from "formik";
import SuccessModalBox from "components/SuccessModalBox";
import { showToast } from "utils";
import axiosApi from "utils/axios";
import { AffiliatePermission } from "validation/AffiliatePermission.validation";
import styles from "./index.module.scss";

const { TextArea } = Input;

const Request = ({ productId, hasRequestedAccess, updateProduct }) => {
  const [showModal, setShowModal] = useState(false);

  const submitHandler = (values, actions) => {
    const data = {
      requested_product_id: productId,
      note: values.permission.trim(),
    };

    axiosApi.request(
      "post",
      `${process.env.BASE_URL}affiliate/create-product-marketing-request`,
      () => {
        setShowModal(true);
        actions.setSubmitting(false);
      },
      err => {
        showToast(err.message, "error");
        actions.setSubmitting(false);
      },
      data
    );
  };

  const handleHideModal = () => {
    setShowModal(false);
    updateProduct();
  };

  const handleKeyUp = e => {
    if (e.target.scrollHeight > e.target.clientHeight) {
      e.target.style.height = e.target.scrollHeight + "px";
    }
  };

  return (
    <>
      <div className={styles.form__wrapper}>
        <Formik
          initialValues={{
            permission: "",
          }}
          validationSchema={AffiliatePermission}
          onSubmit={submitHandler}
        >
          {formik => (
            <Form layout="vertical" onFinish={formik.handleSubmit} size="large">
              <Form.Item
                name="permission"
                label="Request Permission"
                validateStatus={
                  formik.touched.permission &&
                  formik.errors.permission &&
                  "error"
                }
                help={formik.touched.permission && formik.errors.permission}
              >
                <TextArea
                  rows={5}
                  placeholder="Fill out how you want to promote this product"
                  {...formik.getFieldProps("permission")}
                  disabled={hasRequestedAccess}
                  onKeyUp={handleKeyUp}
                />
              </Form.Item>
              <div className={styles.text}>
                <p>
                  <Typography.Text>
                    Almost there, Click the next button to continue
                  </Typography.Text>
                </p>
              </div>
              <Form.Item>
                {hasRequestedAccess ? (
                  <Button
                    type="primary"
                    className={styles.submit__btn}
                    disabled
                  >
                    Request Approval
                  </Button>
                ) : (
                  <Button
                    htmlType="submit"
                    type="primary"
                    loading={formik.isSubmitting}
                    className={styles.submit__btn}
                  >
                    Request Approval
                  </Button>
                )}
              </Form.Item>
            </Form>
          )}
        </Formik>
      </div>
      {showModal && (
        <SuccessModalBox
          modalIsVisible={showModal}
          closeModal={handleHideModal}
          closeButton={false}
        >
          <section className={styles.content}>
            <p>
              <Typography.Text strong>
                Your request has been sent to the Kreator
              </Typography.Text>
            </p>
            <p>
              <Typography.Text>
                You will be notified when the Kreator accepts or rejects your
                request
              </Typography.Text>
            </p>
          </section>
        </SuccessModalBox>
      )}
    </>
  );
};

export default Request;
