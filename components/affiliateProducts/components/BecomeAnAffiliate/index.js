import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Checkbox, Modal, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowRight } from "react-icons/ai";
import CloseIcon from "components/affiliates/CloseIcon";
import PayoutsForm from "components/Payouts/components/PayoutsForm";
import { UPDATE_USER_AFFILIATE_STATUS } from "redux/types/auth.types";
import axiosApi from "utils/axios";
import { showToast } from "utils";
import styles from "./index.module.scss";

const { Text, Link } = Typography;

const BecomeAnAffiliate = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accountModal, setAccountModal] = useState(false);
  const { back } = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleChecked = e => {
    setIsChecked(e.target.checked);
  };

  const handleClick = async () => {
    setLoading(true);

    axiosApi.request(
      "get",
      `${process.env.BASE_URL}admin/UpgradetoAffiliate`,
      res => {
        const newUser = { ...user, is_affiliate: true };

        localStorage.setItem("user", JSON.stringify(newUser));
        dispatch({ type: UPDATE_USER_AFFILIATE_STATUS });
        showToast(res.data.data, "success");
      },
      () => {
        showToast("Something went wrong. Try again later", "error");
        setLoading(false);
      }
    );
  };

  const showAccountModal = () => {
    setAccountModal(true);
  };

  const hideAccountModal = () => {
    setAccountModal(false);
  };

  return (
    <>
      <Modal
        title={null}
        footer={null}
        visible
        onCancel={() => back()}
        maskClosable={false}
        closeIcon={<CloseIcon />}
        className={styles.affiliate__modal}
      >
        <div className={styles.modal__content}>
          <header className={styles.header}>
            <Text strong>
              To access the products in the marketplace, you have to click the
              button below to become an affiliate.
            </Text>
          </header>
          <section className={styles.content}>
            <p>
              <Text>
                Ensure that you have read and agree to the terms and conditions
                of becoming an affiliate before proceeding.
              </Text>
            </p>
            <div>
              <Checkbox
                onChange={handleChecked}
                checked={isChecked}
                disabled={loading}
              >
                I have read the affiliate
              </Checkbox>
              <Link>terms and conditions</Link>
              <Text>.</Text>
            </div>
          </section>
          <footer>
            <div className={styles.btn}>
              <Button
                disabled={!isChecked}
                type={isChecked ? "primary" : "default"}
                onClick={handleClick}
                loading={loading}
              >
                Become An Affiliate
              </Button>
            </div>
            <div className={styles.account__link}>
              <Button type="link" onClick={showAccountModal}>
                Set up an account for your commissions&nbsp;
                <AiOutlineArrowRight />
              </Button>
            </div>
          </footer>
        </div>
      </Modal>
      {accountModal && (
        <PayoutsForm show={accountModal} hide={hideAccountModal} />
      )}
    </>
  );
};

export default BecomeAnAffiliate;
