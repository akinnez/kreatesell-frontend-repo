import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, Typography } from "antd";
import RequestSuccessModal from "../RequestSuccessModal";
import { showToast } from "utils";
import axiosApi from "utils/axios";
import styles from "./index.module.scss";

const { TextArea } = Input;

const Request = () => {
  const [permission, setPermission] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const submitHandler = () => {
    const id = router.query.pId;
    const data = permission.trim();

    setLoading(true);
    axiosApi.request(
      "post",
      `${process.env.BASE_URL}affiliate/create-product-marketing-request`,
      res => {
        setLoading(false);
        setShowModal(true);
      },
      err => {
        setLoading(false);
        showToast(err.message, "error");
      },
      { requested_product_id: id, data }
    );
  };

  const handleChange = e => {
    setPermission(e.target.value);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.form__wrapper}>
        <Form layout="vertical" onFinish={submitHandler} size="large">
          <Form.Item name="permission" label="Request Permission">
            <TextArea
              rows={5}
              placeholder="Fill out how you want to promote this product"
              onChange={handleChange}
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
            <Button
              htmlType="submit"
              type="primary"
              loading={loading}
              className={styles.submit__btn}
            >
              Request Approval
            </Button>
          </Form.Item>
        </Form>
      </div>
      {showModal && (
        <RequestSuccessModal
          showModal={showModal}
          handleHideModal={handleHideModal}
        />
      )}
    </>
  );
};

export default Request;
