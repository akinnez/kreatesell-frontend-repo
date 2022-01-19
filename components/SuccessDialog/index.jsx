import React from "react";
import PropTypes from "prop-types";
import styles from "./SuccessDialog.module.scss";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Button } from "components/button/Button";
import { Modal } from "antd";

const SuccessDialog = ({
  visible,
  content,
  handleSuccess,
  handleFailure,
  successBtnText,
  failureBtnText,
}) => {
  return (
    <Modal
      centered={true}
      visible={visible}
      className={styles.successDialogContianer}
      closable={false}
      footer={null}
    >
      <div className={styles.successDialogInner}>
        <div className={styles.iconContainer}>
          <IoIosCheckmarkCircleOutline className={styles.goodIcon} />
        </div>
        <br />
        <h1 className={styles.congratulations}>Congratulations</h1>
        <br />
        <p className={styles.content}>{content}</p>
        <div className={styles.buttonsDiv}>
          <Button
            type="button"
            text={failureBtnText}
            className={styles.addBlogBtn}
            onClick={() => handleFailure()}
          />
          &nbsp; &nbsp;
          <Button
            type="button"
            text={successBtnText}
            bgColor="blue"
            className={styles.addBlogBtn}
            onClick={() => handleSuccess()}
          />
        </div>
      </div>
    </Modal>
  );
};

SuccessDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  successBtnText: PropTypes.string.isRequired,
  failureBtnText: PropTypes.string.isRequired,
  handleSuccess: PropTypes.func.isRequired,
  handleFailure: PropTypes.func.isRequired,
};
export default SuccessDialog;
