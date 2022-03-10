import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Typography, Form, Select, Input, Button } from "antd";
import { Formik } from "formik";
import axios from "axios";
import createAccount from "components/Payouts/utils/createAccount";
import { PayoutFormValidator } from "validation/PayoutForm.validation";
import { bankSuccess } from "redux/actions";
import axiosApi from "utils/axios";
import styles from "./index.module.scss";
import { isAnEmpytyObject } from "utils";

const { Text } = Typography;
const { Option } = Select;

const PayoutsForm = ({
  hideModal,
  showSuccessModal,
  countries,
  banksByCountryId,
  bankDetails,
}) => {
  const [banksLoading, setBanksLoading] = useState(false);
  const [paypal, setPaypal] = useState(false);
  const [banks, setBanks] = useState(() => {
    if (bankDetails && !isAnEmpytyObject(banksByCountryId)) {
      return banksByCountryId[bankDetails.country_id];
    }

    return [];
  });

  const dispatch = useDispatch();

  const getBank = id => banks.find(bank => bank.id === id);
  const getCountry = id => countries.find(country => country.id === id);

  const submitHandler = (values, actions) => {
    const data = {
      country_id: values.country,
      paypal_email: values.paypal_email.trim(),
      bank_id: values.bank,
      account_number: values.account_number.trim(),
      account_name: values.account_name.trim(),
      password: values.password,
    };

    if (data.country_id === 1 || data.country_id === 72) {
      const bank = getBank(data.bank_id);
      const dispatchObj = {
        bank_name: bank.name,
        bank_id: `${values.bank}`,
        country_id: `${values.country}`,
        country_name: getCountry(values.country).name,
        account_name: "",
        account_number: "",
      };

      delete data.paypal_email;

      axiosApi.request(
        "post",
        `${process.env.BASE_URL}v1/kreatesell/payment/validate-account`,
        res => {
          if (res.status === "error") {
            actions.setFieldError("account_number", res.message);
            actions.setFieldTouched("account_number", true, false);
            actions.setSubmitting(false);
          } else {
            data.account_name = res.data.account_name.trim();
            dispatchObj.account_number = res.data.account_number.trim();
            dispatchObj.account_name = res.data.account_name.trim();

            createAccount({
              data,
              hideModal,
              showSuccessModal,
              dispatchObj,
              dispatch,
            });
          }
        },
        () => {
          actions.setFieldError(
            "account_number",
            "Unable to verify bank account number"
          );
          actions.setFieldTouched("account_number", true, false);
          actions.setSubmitting(false);
        },
        {
          account_number: data.account_number,
          account_bank: bank.bank_code,
        }
      );

      return;
    }

    const dispatchObj = {
      country_id: `${values.country}`,
      country_name: getCountryName(values.country),
      paypal_email: values.paypal_email,
    };

    delete data.bank_id;
    delete data.account_number;
    delete data.account_name;
    createAccount({ data, hideModal, showSuccessModal, dispatchObj, dispatch });
  };

  const countryHandler = async (value, formik) => {
    formik.setFieldValue("country", value);

    if (value === 1 || value === 72) {
      setPaypal(false);

      if (value in banksByCountryId) {
        setBanks(banksByCountryId[value]);
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
    <Formik
      initialValues={{
        country: bankDetails ? +bankDetails.country_id : "",
        paypal_email: bankDetails?.paypal_email || "",
        bank: bankDetails ? +bankDetails.bank_id : "",
        account_number: bankDetails?.account_number || "",
        account_name: bankDetails?.account_name || "",
        password: "",
      }}
      validationSchema={PayoutFormValidator}
      onSubmit={submitHandler}
    >
      {formik => (
        <Form
          className={styles.form}
          layout="vertical"
          size="large"
          onFinish={formik.handleSubmit}
          initialValues={{
            country: formik.values.country || null,
            paypal_email: formik.values.paypal_email,
            bank: formik.values.bank || null,
            account_number: formik.values.account_number,
            account_name: formik.values.account_name,
          }}
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
              disabled={!!bankDetails}
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
              help={formik.touched.paypal_email && formik.errors.paypal_email}
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
                  loading={banksLoading}
                  disabled={banksLoading}
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
                  formik.touched.account_number && formik.errors.account_number
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
                help={formik.touched.account_name && formik.errors.account_name}
              >
                <Input
                  autoComplete="name"
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
                Make sure your account details are correct before proceeding.
              </Text>
            </p>
            <p>
              <Text>
                We will not be held liable for failed transactions resulting
                from incorrect bank details.
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
              loading={formik.isSubmitting}
            >
              {bankDetails ? "Edit" : "Save"} Bank Info
            </Button>
          </Form.Item>
        </Form>
      )}
    </Formik>
  );
};

export default PayoutsForm;
