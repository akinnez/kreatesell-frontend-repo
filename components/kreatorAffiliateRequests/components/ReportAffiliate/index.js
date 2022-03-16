import { useState } from "react";
import { Modal, Typography, Button, Input, Form } from "antd";
import { Formik } from "formik";
import CloseIcon from "components/affiliates/CloseIcon";
import { KreatorReportSchema } from "validation/KreatorReportSchema.validation";
import styles from "./index.module.scss";

const { Title, Text } = Typography;
const { TextArea } = Input;

const ReportAffiliate = ({ report, hideReport, affiliateId }) => {
  const [loading, setLoading] = useState(false);
  const submitHandler = () => {};

  return (
    <Modal
      title={null}
      footer={null}
      visible={report}
      onCancel={hideReport}
      closeIcon={<CloseIcon />}
      className={styles.modal}
      width={765}
    >
      <Formik
        initialValues={{
          report_note: "",
        }}
        validationSchema={KreatorReportSchema}
        onSubmit={submitHandler}
      >
        {formik => (
          <Form
            layout="vertical"
            onFinish={formik.handleSubmit}
            size="large"
            className={styles.form}
          >
            <Form.Item
              name="report_note"
              label="Report Note"
              validateStatus={
                formik.touched.report_note &&
                formik.errors.report_note &&
                "error"
              }
              help={formik.touched.report_note && formik.errors.report_note}
            >
              <TextArea
                rows={5}
                placeholder="Fill out how you want to promote this product"
                {...formik.getFieldProps("report_note")}
              />
            </Form.Item>
            <div className={styles.actions}>
              <div>
                <Button></Button>
                <Button></Button>
                <p>
                  <Text>Upload Evidence</Text>
                </p>
              </div>
              <div className={styles.submit__btn}>
                <Button htmlType="submit" loading={loading}>
                  Send
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ReportAffiliate;
