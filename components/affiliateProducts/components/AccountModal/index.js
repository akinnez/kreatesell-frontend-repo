import { useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Typography, Form, Select, Input, Button } from "antd";
import { Formik } from "formik";
import axios from "axios";
import CloseIcon from "components/affiliates/CloseIcon";
import Spinner from "components/Spinner";
import { AffiliatePayoutAccount } from "validation/AffiliatePayoutAccount.validation";
import { bankSuccess } from "redux/actions";
import { showToast } from "utils";
import axiosApi from "utils/axios";
import styles from "./index.module.scss";

const { Text, Title } = Typography;
const { Option } = Select;

const AccountModal = ({ accountModal, hideAccountModal }) => {
  const [banks, setBanks] = useState([]);
  const [banksLoading, setBanksLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [paypal, setPaypal] = useState(false);

  const dispatch = useDispatch();
  const { countries, loading, normalizedBanks } = useSelector(
    state => state.utils
  );

  const submitHandler = values => {
    const data = {
      country_id: values.country,
      paypal_email: values.paypal_email.trim(),
      bank_id: values.bank,
      account_number: values.account_number.trim(),
      account_name: values.account_name.trim(),
      password: values.password,
    };

    setFormLoading(true);

    axiosApi.request(
      "post",
      `${process.env.BASE_URL}v1/kreatesell/payment/bank-details`,
      res => {
        showToast(res.message, "success");
        hideAccountModal();
      },
      err => {
        showToast(err.message, "error");
        hideAccountModal();
      },
      data
    );
  };

  const countryHandler = async (value, formik) => {
    formik.setFieldValue("country", value);

    if (value === 1 || value === 72) {
      setPaypal(false);

      if (value in normalizedBanks) {
        setBanks(normalizedBanks[value]);
      } else {
        setBanksLoading(true);

        const banksResponse = await axios.get(
          `${process.env.BASE_URL}v1/kreatesell/utils/get-banks/${value}`
        );

        const banksData = banksResponse.data.list_of_banks;

        setBanks(banksData);
        dispatch(bankSuccess({ id: value, banks: banksData }));
        setBanksLoading(false);
      }
    } else {
      setPaypal(true);
    }
  };

  const bankHandler = (value, formik) => {
    formik.setFieldValue("bank", value);
  };

  return (
    <Modal
      title={null}
      footer={null}
      visible={accountModal}
      onCancel={hideAccountModal}
      closeIcon={<CloseIcon />}
      className={styles.account__modal}
      width={765}
    >
      <header className={styles.header}>
        <Title level={2}>Provide your Bank details</Title>
        <p>
          <Text>We pay your funds to this account</Text>
        </p>
      </header>
      <section className={styles.form__section}>
        {banksLoading && (
          <div className={styles.spinner__mask}>
            <Spinner />
          </div>
        )}
        {countries.length === 0 || loading ? (
          <Spinner />
        ) : (
          <Formik
            initialValues={{
              country: "",
              paypal_email: "",
              bank: "",
              account_number: "",
              account_name: "",
              password: "",
            }}
            validationSchema={AffiliatePayoutAccount}
            onSubmit={submitHandler}
          >
            {formik => (
              <Form
                className={styles.form}
                name="account_form"
                layout="vertical"
                size="large"
                onFinish={formik.handleSubmit}
              >
                <Form.Item
                  name="country"
                  label="Select Country"
                  validateStatus={
                    formik.touched.country && formik.errors.country && "error"
                  }
                  help={formik.touched.country && formik.errors.country}
                >
                  <Select
                    placeholder="Nigeria"
                    onChange={value => countryHandler(value, formik)}
                    onBlur={formik.handleBlur}
                    value={formik.values.country}
                  >
                    {countries.map(country => (
                      <Option
                        key={country.id}
                        value={country.id}
                        className={styles.countries__options}
                        title={country.name}
                      >
                        {country.flag && (
                          <Image
                            src={country.flag}
                            alt={`Flag of ${country.name}`}
                            width={40}
                            height={30}
                            className={styles.option__icon}
                          />
                        )}
                        &nbsp;&nbsp;
                        {country.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                {paypal ? (
                  <Form.Item
                    name="paypal_email"
                    label="PayPal Email"
                    validateStatus={
                      formik.touched.paypal_email &&
                      formik.errors.paypal_email &&
                      "error"
                    }
                    help={
                      formik.touched.paypal_email && formik.errors.paypal_email
                    }
                  >
                    <Input
                      placeholder="Enter PayPal email"
                      {...formik.getFieldProps("paypal_email")}
                    />
                  </Form.Item>
                ) : (
                  <>
                    <Form.Item
                      name="bank"
                      label="Select Bank"
                      validateStatus={
                        formik.touched.bank && formik.errors.bank && "error"
                      }
                      help={formik.touched.bank && formik.errors.bank}
                    >
                      <Select
                        placeholder="Choose bank"
                        onChange={value => bankHandler(value, formik)}
                        onBlur={formik.handleBlur}
                        value={formik.values.bank}
                      >
                        {banks.map(bank => (
                          <Option key={bank.id} value={bank.id}>
                            {bank.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="account_number"
                      label="Account Number"
                      validateStatus={
                        formik.touched.account_number &&
                        formik.errors.account_number &&
                        "error"
                      }
                      help={
                        formik.touched.account_number &&
                        formik.errors.account_number
                      }
                    >
                      <Input
                        placeholder="Enter account number"
                        {...formik.getFieldProps("account_number")}
                      />
                    </Form.Item>
                    <Form.Item
                      name="account_name"
                      label="Account Name"
                      validateStatus={
                        formik.touched.account_name &&
                        formik.errors.account_name &&
                        "error"
                      }
                      help={
                        formik.touched.account_name &&
                        formik.errors.account_name
                      }
                    >
                      <Input
                        placeholder="Enter account name"
                        {...formik.getFieldProps("account_name")}
                      />
                    </Form.Item>
                  </>
                )}
                <div className={styles.form__warning}>
                  <p>
                    <Text>Please read carefully</Text>
                  </p>
                  <p>
                    <Text>
                      Make sure your account details are correct before
                      proceeding.
                    </Text>
                  </p>
                  <p>
                    <Text>
                      We will not be held liable for failed transactions
                      resulting from incorrect bank details.
                    </Text>
                  </p>
                </div>
                <Form.Item
                  name="password"
                  label="Enter Your Current Password"
                  validateStatus={
                    formik.touched.password && formik.errors.password && "error"
                  }
                  help={formik.touched.password && formik.errors.password}
                >
                  <Input
                    type="password"
                    autoComplete="new-password"
                    placeholder="****************"
                    {...formik.getFieldProps("password")}
                  />
                </Form.Item>
                <div className={styles.text}>
                  <Text>Finished adding your account details?</Text>
                </div>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={formLoading}
                  >
                    Save Bank Info
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Formik>
        )}
      </section>
    </Modal>
  );
};

export default AccountModal;
