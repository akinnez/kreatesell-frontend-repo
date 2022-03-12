import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Checkbox, Modal, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowRight } from "react-icons/ai";
import CloseIcon from "components/affiliates/CloseIcon";
import CreateBankDetails from "components/Payouts/components/CreateBankDetails";
import { UPDATE_USER_AFFILIATE_STATUS } from "redux/types/auth.types";
import axiosApi from "utils/axios";
import { showToast } from "utils";
import styles from "./index.module.scss";

const { Text, Link: AntLink } = Typography;

const BecomeAnAffiliate = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const { back } = useRouter();

  const dispatch = useDispatch();
  const { auth, store } = useSelector(state => state);

  const { user } = auth;
  const { bank_details: bankDetails } = store.store;

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

  const handleModal = value => () => {
    setModal(value);
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
              <AntLink>terms and conditions</AntLink>
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
              {bankDetails ? (
                <Link href="/account/sales/payouts?redirect=true">
                  <a>
                    Set up an account for your commissions&nbsp;
                    <AiOutlineArrowRight />
                  </a>
                </Link>
              ) : (
                <Button type="link" onClick={handleModal(true)}>
                  Set up an account for your commissions&nbsp;
                  <AiOutlineArrowRight />
                </Button>
              )}
            </div>
          </footer>
        </div>
      </Modal>
      {modal && (
        <CreateBankDetails
          createModal={modal}
          hideCreateModal={handleModal(false)}
        />
      )}
    </>
  );
};

export default BecomeAnAffiliate;
