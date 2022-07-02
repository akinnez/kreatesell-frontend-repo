import { Layout } from "components";
import styles from "../public/css/payouts.module.scss";
import Image from "next/image";
import {
  data,
  selectCountry,
  selectCurrency,
  getWaitTime,
  getFee,
} from "components/paymentsPayouts/data";
import { MoneyRain } from "utils";
import { SharedSubFooter } from "./how-it-works";
import { Form, Select } from "antd";
import React, { useState, useEffect } from "react";
import { XofDefault } from "utils";

const Payouts = () => {
  const [form] = Form.useForm();
  // state for country and currency
  const [country, setCountry] = useState("Nigeria");
  const [currency, setCurrency] = useState("NGN");

  // state to track flags and currency for fee display area
  const [feeCurrency, setFeeCurrency] = useState("NGN");

  const currentCountryFlagObj = selectCountry.find(
    (item) => item.label === country
  );

  const currentCurrencyFlagObj = selectCurrency.find(
    (item) => item.label === currency
  );

  // fee display area.
  const currentFeesFlagObj = selectCurrency.find(
    (item) => item.label === feeCurrency
  );
  // console.log(currentCountryFlag);
  const [countryFlag, setCountryFlag] = useState(currentCountryFlagObj);
  const [currencyFlag, setCurrencyFlag] = useState(currentCurrencyFlagObj);
  const [feesCurrencyFlag, setFeesCurrencyFlag] = useState(currentFeesFlagObj);

  // state to track amount entered
  const [feeAmount, setFeeAmount] = useState(2000);

  const handleAmountChange = (e) => {
    setFeeAmount(e.target.value);
  };
  // state for wait time
  const [time, setTime] = useState(getWaitTime(country, currency));

  // first 2 select boxes
  const handleCountrySelect = (field) => (value) => {
    form.setFieldsValue({ [field]: value });
    setCountry(value);
  };

  const handleCurrencySelect = (field) => (value) => {
    form.setFieldsValue({ [field]: value });
    setCurrency(value);
  };

  const handleFeeCurrencySelect = (field) => (value) => {
    form.setFieldsValue({ [field]: value });
    setFeeCurrency(value);
  };

  const { rate, fee } = getFee(feeCurrency, feeAmount);
  useEffect(() => {
    getWaitTime(country, currency);
    setTime(getWaitTime(country, currency));
  }, [country, currency]);
  // here

  useEffect(() => {
    setCountryFlag(currentCountryFlagObj);
  }, [country, currentCountryFlagObj]);

  useEffect(() => {
    setCurrencyFlag(currentCurrencyFlagObj);
  }, [currency, currentCurrencyFlagObj]);

  useEffect(() => {
    setFeesCurrencyFlag(currentFeesFlagObj);
  }, [feeCurrency, currentFeesFlagObj]);

  // console.log(selectCurrency);

  useEffect(() => {
    getFee(feeCurrency, feeAmount);
  }, [feeAmount, feeCurrency]);

  // const {rate, fee} = handleAmountChange
  return (
    <Layout subFooter={false} defaultMarginTop={true}>
      <section className={styles.payoutsContainer}>
        <div className={styles.deskFlex}>
          <section>
            <div className={styles.details}>
              <h1 className={styles.mobileHeading}>
                Payout and Transaction Fees
              </h1>
              <h1 className={styles.lgHeading}>
                Payout And <br />
                Transaction Fees
              </h1>
            </div>

            <div className={styles.flagsAndText}>
              <div className={styles.flagItems}>
                <GenerateFlags data={data} withDetails={false} dimension={40} />
              </div>
              <div className={`${styles.flagItems} ${styles.lgFlags}`}>
                <GenerateFlags data={data} withDetails={false} dimension={50} />
              </div>
              <div className={styles.text}>
                Kreatesell supports twenty one (21) currencies today and because
                we work with multiple providers to make this possible,
                settlements into your bank account/wallet are made based on your
                default currency. So, you get to sell in any currency around the
                globe and have the amount converted and credited in your
                country&aops;s default currency.
              </div>
            </div>
          </section>
          <div className={styles.moneyRain}>
            <Image src={MoneyRain} alt="money rain" />
          </div>
        </div>

        <section className={styles.howPayoutsWork}>
          <h3 className={styles.heading}>How Payouts Work</h3>
          <p className={styles.text}>
            We help you collect your payment from anywhere in the world, process
            and pay it in your local currency into your default account/ wallet.
            Processing time is dependent on your location and currency.
          </p>
          <section className={styles.formAndTime}>
            <Form className={styles.selectBox} form={form}>
              <div className={styles.selectMain}>
                <Image
                  src={countryFlag?.flag}
                  alt={`Flag of ${country}`}
                  width={40}
                  height={40}
                  className={styles.optionIcon}
                />

                <div className={styles.top}>
                  I am in
                  <Select
                    placeholder="Select Country"
                    size="large"
                    onChange={handleCountrySelect("country")}
                    value={country}
                    className={styles.selectContainer}
                  >
                    {selectCountry.map((item) => (
                      <Select.Option
                        value={item.label}
                        key={item.label}
                        className={styles.selectOption}
                      >
                        <div className={styles.selectContent}>
                          <span className={styles.country}>{item.label}</span>
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className={styles.selectMain}>
                <Image
                  src={
                    currencyFlag.label === "XOF"
                      ? XofDefault
                      : currencyFlag?.flag
                  }
                  alt={`Flag of ${currencyFlag?.value}`}
                  width={40}
                  height={40}
                  className={styles.optionIcon}
                />

                <div className={styles.top}>
                  I want to sell in
                  <Select
                    placeholder="Select Currency"
                    size="large"
                    onChange={handleCurrencySelect("currency")}
                    value={currency}
                    className={styles.selectContainer}
                  >
                    {selectCurrency.map((item) => (
                      <React.Fragment key={item.label}>
                        <Select.Option
                          value={item.label}
                          key={item.label}
                          className={styles.selectOption}
                        >
                          <div className={styles.selectContent}>
                            <span className={styles.country}>{item.label}</span>
                          </div>
                        </Select.Option>
                      </React.Fragment>
                    ))}
                  </Select>
                </div>
              </div>
            </Form>
            <div className={styles.waitTime}>
              <div className={styles.innerBox}>
                <div className={styles.box}>
                  <p className={styles.text}>
                    You would automatically be <br /> credited in your{" "}
                    <span className={styles.wallet}>wallet</span>
                  </p>
                  <p className={styles.time}>{`${time} ${
                    time > 1 ? "days" : "day"
                  }`}</p>
                  <p className={styles.text}>After the successful sale</p>
                </div>
              </div>
            </div>
          </section>
        </section>
        <section className={styles.transactionFees}>
          <div className={styles.details}>
            <h1 className={styles.heading}>Our Transaction Fees</h1>
            <p className={styles.text}>
              No matter what Kreatesell plan you are on, you would be charged a
              small affordable fee for processing your successful sales. This
              fee is determined by your location and currency. Below are the
              supported countries and corresponding fees.
            </p>
          </div>
          <div className={styles.getFee}>
            <Form className={styles.selectBox} form={form}>
              <div className={styles.selectMain}>
                <Image
                  src={
                    feesCurrencyFlag.label === "XOF"
                      ? XofDefault
                      : feesCurrencyFlag?.flag
                  }
                  alt={`Flag of ${currencyFlag?.value}`}
                  width={40}
                  height={40}
                  className={styles.optionIcon}
                />

                <div className={styles.top}>
                  <span> If your customer pays you in</span>
                  <div className={styles.selectAndInput}>
                    <Select
                      placeholder="Select Currency"
                      size="large"
                      onChange={handleFeeCurrencySelect("currency")}
                      value={feeCurrency}
                      className={styles.selectContainer}
                    >
                      {selectCurrency.map((item) => (
                        <React.Fragment key={item.label}>
                          <Select.Option
                            value={item.label}
                            key={item.label}
                            className={styles.selectOption}
                          >
                            <div className={styles.selectContent}>
                              <span className={styles.country}>
                                {item.label}
                              </span>
                            </div>
                          </Select.Option>
                        </React.Fragment>
                      ))}
                    </Select>
                    <input
                      type="number"
                      className={styles.input}
                      value={feeAmount}
                      onChange={handleAmountChange}
                    />
                  </div>
                </div>
              </div>
            </Form>
          </div>
          <section className={styles.feeDisplay}>
            <div className={styles.txnBox}>
              <p className={styles.text}>We’ll pay you</p>
              <p className={styles.amount}>
                <span className={styles.currencyBox}>{feeCurrency}</span>
                {(feeAmount - fee).toFixed(2)}
              </p>
            </div>
            <div className={styles.txnBox}>
              <p className={styles.text}>Transaction fee charge</p>
              <p className={styles.amount}>
                <span className={styles.currencyBox}>{feeCurrency}</span>

                {fee}
              </p>
              <div className={styles.percentBox}>
                <p className={styles.rate}>{rate}%</p>
                <p className={styles.subText}>
                  of the sales price for <br /> your transaction fee.
                </p>
              </div>
            </div>
          </section>
        </section>
        <SharedSubFooter />
      </section>
    </Layout>
  );
};

export default Payouts;

const FlagItem = ({
  flag,
  country,
  fullWidth = false,
  withDetails = false,
  dimension = "29.73",
}) => {
  return (
    <div
      className={`${styles.flagItem} ${withDetails ? styles.withDetails : ""}`}
    >
      <Image
        src={flag}
        alt="flag"
        layout="fixed"
        width={dimension}
        objectFit="fill"
        height={dimension}
      />
      {withDetails && (
        <div
          className={`${styles.countryName} ${
            fullWidth ? styles.fullWidth : ""
          }`}
        >
          {country}
        </div>
      )}
    </div>
  );
};

const GenerateFlags = ({ data, withDetails = false, dimension }) => {
  return (
    <>
      {data?.map((item) => (
        <FlagItem
          key={item?.country}
          {...item}
          withDetails={withDetails}
          dimension={dimension}
        />
      ))}
    </>
  );
};
