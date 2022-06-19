import { useState, useRef } from "react";
import { Modal, Typography, Button, Input, Form } from "antd";
import { Formik } from "formik";
import { MdOutlineImage } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import CloseIcon from "components/affiliates/CloseIcon";
import { KreatorReportSchema } from "validation/KreatorReportSchema.validation";
import { showToast } from "utils";
import axiosAPI from "utils/axios";
import styles from "./index.module.scss";

const { Text } = Typography;
const { TextArea } = Input;
const imageTypes = ["image/png", "image/jpeg", "image/gif"];
const maxSize = 2 * 1024 * 1024;
const size = `${maxSize / (1024 * 1024).toFixed(1)}MB`;
const limit = 5;

const ReportAffiliate = ({
  reportIsVisible,
  hideReport,
  id,
  updateReported,
  showSuccess,
}) => {
  const [images, setImages] = useState([]);
  const inputElement = useRef();

  const submitHandler = (values, actions) => {
    if (images.length > 0) {
      if (images.length > limit) {
        showToast(`You can only select up to ${limit} images`, "warn");
        actions.setSubmitting(false);
        return;
      }

      for (let i = 0; i < images.length; i++) {
        if (!imageTypes.includes(images[i].type)) {
          showToast(
            "Selected files can only be of type png/jpg/jpeg/gif",
            "warn"
          );
          actions.setSubmitting(false);
          return;
        }

        if (images[i].size > maxSize) {
          showToast(`Selected images cannot exceed ${size}`, "warn");
          actions.setSubmitting(false);
          return;
        }
      }
    }

    const formData = new FormData();

    formData.append("Affiliate_Id", id);
    formData.append("Report_Details", values.report_note.trim());
    images.forEach(image => {
      formData.append("Evidence", image);
    });

    axiosAPI.request(
      "post",
      `${process.env.BASE_URL}v1/kreatesell/product/report/affiliate`,
      () => {
        updateReported(id);
        showSuccess();
        hideReport();
      },
      err => {
        showToast(err.message, "error");
        hideReport();
      },
      formData
    );
  };

  const handleClick = () => {
    inputElement.current.click();
  };

  const handleChange = e => {
    const { files } = e.target;

    if (files.length > limit || files.length + images.length > limit) {
      showToast(`You can only select up to ${limit} images`, "warn");
      return;
    }

    let newImages = [];

    for (let i = 0; i < files.length; i++) {
      if (!imageTypes.includes(files[i].type)) {
        showToast(
          "Selected files can only be of type png/jpg/jpeg/gif",
          "warn"
        );
        return;
      }

      if (files[i].size > maxSize) {
        showToast(`Selected images cannot exceed ${size}`, "warn");
        return;
      }

      newImages = [...newImages, files[i]];
    }

    setImages([...images, ...newImages]);
  };

  const handleKeyUp = e => {
    if (e.target.scrollHeight > e.target.clientHeight) {
      e.target.style.height = e.target.scrollHeight + "px";
    }
  };

  const handleRemove = index => {
    setImages(state => state.filter((_, idx) => idx !== index));
  };

  return (
    <Modal
      title={null}
      footer={null}
      visible={reportIsVisible}
      onCancel={hideReport}
      closeIcon={<CloseIcon />}
      className={styles.modal}
      width={765}
    >
      <Formik
        initialValues={{ report_note: "" }}
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
                onKeyUp={handleKeyUp}
              />
            </Form.Item>
            <div className={styles.actions}>
              {images.length > 0 && (
                <div className={styles.image__preview__container}>
                  <ul className={styles.image__preview}>
                    {images.map((image, index) => (
                      <li key={`${image.name}-${index}`}>
                        <div className={styles.image__container}>
                          <p>
                            <Text>{image.name}</Text>
                          </p>
                          <Button
                            icon={<AiFillDelete />}
                            onClick={() => handleRemove(index)}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <div className={styles.image__upload}>
                  <Button
                    icon={<MdOutlineImage />}
                    onClick={handleClick}
                    disabled={images.length === 5}
                  />
                  <Text>Upload Evidence</Text>
                  <input
                    ref={inputElement}
                    type="file"
                    multiple
                    onChange={handleChange}
                    accept="image/png, image/jpeg, image/gif"
                  />
                </div>
              </div>
              <div className={styles.submit__btn}>
                <Button htmlType="submit" loading={formik.isSubmitting}>
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
