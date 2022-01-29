import React from "react";
import PropTypes from "prop-types";
import styles from "./AcceptChargebackDialog.module.scss";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Button } from "components/button/Button";
import { Modal } from "antd";

const AcceptChargebackDialog = ({
  visible,
  handleSuccess,
  handleFailure,
  successBtnText,
  failureBtnText,
  submittingDeactivate,
}) => {
  return (
    <Modal
      centered={true}
      visible={visible}
      className={styles.successDialogContianer}
      closable={false}
      footer={null}
    >
      <div className={styles.confirmDialogInner}>
        <div className={styles.iconContainer}>
          <AiOutlineQuestionCircle className={styles.questionIcon} />
        </div>
        <br />
        <h1 className={styles.title}>
          Are you sure you want to accept the chargeback?
        </h1>
        <br />
        <p className={styles.content}>
          Doing this means that we should make a refund to the customer
        </p>
        <div className={styles.buttonsDiv}>
          <Button
            disabled={submittingDeactivate}
            loading={submittingDeactivate}
            type="button"
            text={failureBtnText}
            className={styles.addBlogBtn}
            onClick={() => handleFailure()}
          />
          &nbsp; &nbsp;
          <Button
            disabled={submittingDeactivate}
            loading={submittingDeactivate}
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

AcceptChargebackDialog.defaultProps = {
  successBtnText: "Continue",
  failureBtnText: "Cancel",
};
AcceptChargebackDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  successBtnText: PropTypes.string.isRequired,
  failureBtnText: PropTypes.string.isRequired,
  handleSuccess: PropTypes.func.isRequired,
  handleFailure: PropTypes.func.isRequired,
};
export default AcceptChargebackDialog;
