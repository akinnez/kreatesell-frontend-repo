import { Row, Col, Input, Select, Button } from "antd";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./CustomCheckout.module.scss";
import { GetAllowedCurrencies } from "redux/actions";

export default function CustomCheckoutSelect({
  title,
  field,
  setField,
  withCustomFeedBack = false,
  showFeedBack = false,
  noMatchFound = false,
}) {
  const { countries } = useSelector((state) => state.utils);
  const { currency } = useSelector((state) => state.utils);
  const getAllowedCurrencies = GetAllowedCurrencies();
  const { Option } = Select;
  const removeCurrency = (item) => {
    const filtered = field.filter((i) => i !== item);
    setField(filtered);
  };
  const [newCurrency, setNewCurrency] = useState({
    currency_name: "NGN",
    currency_value: "",
  });
  const filterCurrency = useMemo(
    () => currency?.map((cur) => cur.short_name),
    [currency]
  );
  const countriesCurrency = useMemo(
    () =>
      countries?.filter(
        (country) =>
          country.currency_id !== null &&
          filterCurrency?.includes(country.currency)
      ),
    [countries, filterCurrency]
  );
  const addCurrency = () => {
    console.log("add currency");
    const { currency_name, currency_value } = newCurrency;
    if (!currency_name || !currency_value) {
      return;
    }
    for (let value of field) {
      if (value.currency_name === currency_name) {
        value.currency_value = currency_value;
        return setField([...field]);
      }
    }
    setField([...field, { currency_name, currency_value }]);
    setNewCurrency({
      currency_value: "",
      currency_name,
    });
  };

  // console.log("countriesCurrency cur", countriesCurrency);
  useEffect(() => {
    getAllowedCurrencies();
  }, []);

  return (
    <div className="">
      <p className="text-base mb-3 font-medium">
        {title}
        <>
          {withCustomFeedBack &&
            showFeedBack &&
            title === "Original price (NGN)" && (
              <span className={styles.charLimit}>
                Original Price should be more than Selling Price
              </span>
            )}
          {noMatchFound && (
            <span className={styles.charLimit}>
              Kindly set matching currencies
            </span>
          )}
        </>
      </p>

      <div className="w-4/5 flex">
        <Select
          onChange={(e) => setNewCurrency({ ...newCurrency, currency_name: e })}
          defaultValue="NGN"
          className={styles.selectButton}
        >
          {countriesCurrency.map((country, index) => (
            <Option
              className={styles.optionField}
              key={index}
              value={country.currency}
            >
              <div className="flex items-center">
                <div className={styles.countriesFlag}>
                  <Image src={country.flag} alt="flag" layout="fill" />
                </div>
                <h2 className="mb-0 ml-1">{country.currency}</h2>
              </div>
            </Option>
          ))}
        </Select>
        <div className={styles.inputButton}>
          <Input
            type="number"
            value={newCurrency.currency_value}
            onChange={(e) =>
              setNewCurrency({ ...newCurrency, currency_value: e.target.value })
            }
            className="w-24"
            placeholder="0"
          />
        </div>
        <Button
          onClick={addCurrency}
          className={styles.addCurrency}
          type="primary"
        >
          + Add Currency
        </Button>
      </div>
      <h2 className={`${styles.currencyHeader} mt-3 mb-3`}>
        Selected Currencies
      </h2>
      <div className={styles.currencyField}>
        <Row gutter={[24, 16]}>
          {field.length > 0 ? (
            field.map((f, i) => (
              <div className="mr-3 mb-3" key={i} span={5}>
                <div className={styles.currencyButtons}>
                  <h2 className="mb-0 mr-1">{f.currency_value}</h2>
                  <h2 className="mb-0">{f.currency_name}</h2>
                  <p
                    onClick={() => removeCurrency(f)}
                    className="text-base mb-1 ml-2"
                  >
                    x
                  </p>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </Row>
      </div>
    </div>
  );
}
