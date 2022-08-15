import { CheckoutForm } from "components";
// import { Radio } from "components/inputPack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetPricingTypes } from "redux/actions";
import { Input, Radio, Form } from "antd";
import styles from "./Checkout.module.scss";

export const CheckoutProductTab = () => {
  const [priceType, setPriceType] = useState("Fixed Price");
  const getPricingTypes = GetPricingTypes();
  const { product } = useSelector((state) => state.product);
  const { store } = useSelector((state) => state.store);
  useEffect(() => {
    getPricingTypes();
  }, []);

  useEffect(() => {
    if (Object.keys(product).length > 0) {
      if (product.product_price_type) {
        setPriceType(product.product_price_type);
      }
    }
  }, [product]);
  // const filterPriceType = (id) =>
  // 	pricingTypes?.filter((item) => item.pricing_type_id === id);
  const options = [
    { label: "Fixed Price", value: "Fixed Price" },
    { label: "Pay What You Want", value: "Pay What You Want" },
    { label: "Installment Payment", value: "Installment Payment" },
    { label: "Make It Free", value: "Make It Free" },
  ];

  const [ctaBtnText, setCtaBtnText] = useState("");
  const changeField = (field) => {
    setPriceType(field.target.value);
  };
  return (
    <div className={`px-0 lg:px-8 ${styles.container}`}>
      <h3 className="text-black-100 font-semibold text-2xl">
        Checkout Details
      </h3>
      <Form layout="vertical" className={styles.antRadioLabel}>
        <Form.Item label="Checkout Call-To-Action Button">
          <div className="w-full md:w-2/5">
            <Input
              placeholder="Buy now"
              className={styles.ctaBtn}
              name="ctaBtnText"
              value={ctaBtnText}
              onChange={(e) => setCtaBtnText(e.target.value)}
              maxLength={10}
            />
          </div>
          <p className="text-xs text-base-gray-200 mt-3">
            Leave blank if you want the default{" "}
            <span className="text-black-100 font-semibold">
              {ctaBtnText ? ctaBtnText : "BUY NOW"}
            </span>
            . Else, change it to best action request of your taste.
          </p>
        </Form.Item>
        <div className={styles.antRadioLabel + " mb-3"}>
          {/* <Radio.Group
						options={options}
						
						
					/> */}
          <Radio.Group
            onChange={(field) => changeField(field)}
            value={priceType}
            defaultValue={options[0].value}
            className="flex-col gap-7 md:gap-0 md:flex-row"
          >
            <Radio value="Fixed Price">Fixed Price</Radio>
            <Radio value="Pay What You Want">Pay What You Want</Radio>
            <Radio value="Installment Payment">Installment Payment</Radio>
            <Radio
              disabled={store?.user?.user_plan !== "Business"}
              className={
                store?.user?.user_plan === "Business"
                  ? styles.businessButton
                  : styles.freeButton
              }
              value="Make It Free"
            >
              <p>Make It Free</p> <h3>Business</h3>
            </Radio>
          </Radio.Group>
        </div>
      </Form>
      <CheckoutForm
        setCtaBtnText={setCtaBtnText}
        priceType={priceType}
        ctaBtnText={ctaBtnText}
      />
    </div>
  );
};
