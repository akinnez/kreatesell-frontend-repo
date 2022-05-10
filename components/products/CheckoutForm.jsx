import { Percentage, Radio } from "components/inputPack";
import { Switch, Form, Input, Select, Button } from "antd";
import styles from "./Checkout.module.scss";
import { useState, useEffect } from "react";
import { CloudUpload } from "utils";
import Image from "next/image";
import { useFormik } from "formik";
// import { Select } from "components/select/Select";
import { useSelector } from "react-redux";
import {
  GetProductByID,
  GetBillingInterval,
  CreateProduct,
  SetProductTab,
} from "redux/actions";
import { useHandleProductInputDebounce, useUpload } from "hooks";
import CustomCheckoutSelect from "./CustomCheckout";
import {useRouter} from "next/router";
import { transformToFormData } from 'utils'

export const CheckoutForm = ({ ctaBtnText, priceType, setCtaBtnText }) => {
  /**
   * PriceType Values
   * FixedPrice: 1
   * Pay What You Want: 2
   * Installment Payment: 3
   * Make It Free: 4
   */
  const getProductByID = GetProductByID();
  const getBillingInterval = GetBillingInterval();
  const createProduct = CreateProduct();
  const setProductTab = SetProductTab();

  const router = useRouter()

  const [compareToPrice, setCompareToPrice] = useState(false);
  const [applyCoupon, setApplyCoupon] = useState(false);
  const [isCouponDiabled, setIsCouponDisabled] = useState(true)
  const [couponType, setCouponType] = useState(0);
  const [promotionalMaterial, setPromotionalMaterial] = useState([]);
  const [frequencyOptions, setFrequencyOptions] = useState([]);
  const [numberOfInputs, setNumberOfInputs] = useState(1);
  const [inputsArray, setInputsArray] = useState([])
  const [initialPayment, setInitialPayment] = useState([])
  const [firstPayment, setFirstPayment] = useState([])
  const [secondPayment, setSecondPayment] = useState([])
  const [thirdPayment, setThirdPayment] = useState([])
  const [billingIntervalDuration, setBillingIntervalDuration] = useState(7)
  const [initialBillingInput, setInitialBillingInput] = useState(0)
  const [custombillingInterval, setCustomBillingInterval] = useState(0)

  const {Option} = Select

  const [couponVariance, setCouponVariance] = useState({
    isPercentage: true,
    is_fixed_amount: false,
  });

  // Fixed Price Inputs
  const [fixedSellingPrice, setFixedSellingPrice] = useState([])
  const [fixedOriginalPrice, setFixedOriginalPrice] = useState([])
  
  // Pay What You Want
  const [minimumPrice, setMinimumPrice] = useState([])
  const [suggestedPrice, setSuggestedPrice] = useState([])


  // Settings Controlled Inputs
  const [allowAffiliateMarket, setAllowAffiliateMarket] 
  = useState(false);
  const [afiliatePercentage, setAfiliatePercentage] = useState(0)
  const [uploadPromotionalMaterial, setUploadPromotionalMaterial] =
  useState(false);
  const [limitProductSale, setLimitProductSale] = useState(false);
  const [numberOfLimit, setNumberOfLimit] = useState(0)
  const [showTotalSales, setShowTotalSales] = useState(false);
  const [buyerPaysTransactionFee, setBuyerPaysTransactionFee] = useState(false);

  const [totalSelling, setTotalSelling] = useState([])
  const mapNumberToArray = (number)=>{
    const arrayNumbers = []
    for(let i=0; i< number; i++){
      arrayNumbers.push(i)
    }
    return arrayNumbers
  }
  const handleBillingIntervalChange = (e)=>{
    setInitialBillingInput(e)
    setCustomBillingInterval(e * billingIntervalDuration)
  }

  useEffect(()=>{
    setCustomBillingInterval(initialBillingInput * billingIntervalDuration)
  }, [billingIntervalDuration])

  const { preview, getRootProps, getInputProps } = useUpload({
    setFileChange: setPromotionalMaterial,
  });

  const { productID, product, billingInterval, loading } = useSelector(
    (state) => state.product
  );

  const customBillingIntervals = [
    {label: "Day(s)", value: 1},
    {label: "Week(s)", value: 7},
    {label: "Month(s)", value: 30}

  ]
  const mappedBillingInterval = billingInterval?.map((billing) => ({
    label: billing.billing_types,
    value: billing.billing_durations,
  }));


  const paymentFrequencyOptions = async () => {
    let opt = [];
    for (let i = 1; i < 10; i++) {
      opt.push(i);
      const values = opt.map((item) => ({ label: item, value: item }));
      setFrequencyOptions(values);
    }
  };

  useEffect(() => {
    paymentFrequencyOptions();
  }, []);

  useEffect(() => {
    getBillingInterval();
  }, []);

  useEffect(()=>{
    setInputsArray(mapNumberToArray(numberOfInputs))
  }, [numberOfInputs])

  const createCustomCurrencyField =(array)=>{
    let title = ""
    let field = []
    let setField = ()=>{}
    return array.map((value, index)=>{
      switch(value){
        case 0:
          title = "Initial Payment at Checkout"
          field = initialPayment
          setField = setInitialPayment
          break
        case 1:
          title = "Second Payment"
          field = firstPayment
          setField = setFirstPayment
          break
        case 2:
          title = "Third Payment"
          field = secondPayment
          setField = setSecondPayment
          break
        case 3:
          title = "Fourth Payment"
          field = thirdPayment
          setField = setThirdPayment
          break
      }
      return (
        <div key={index} className="mt-4">
          <CustomCheckoutSelect field={field} title={title} setField={setField} />
        </div>
      )
    })
  }
  useEffect(() => {
    if (productID) {
      getProductByID(productID);
    }
  }, [productID]);

  useEffect(()=>{
    console.log(product)
  }, [product])

  const populatePricingObject = (currency, price)=>{
    const prices = {
      currency_value: price,
      currency_name: currency
    }
    return prices
  }

  const populatePricing = (array)=>{
    for (let values of array){
      switch(values.price_indicator){
        case "Selling":
          const registeredPrice = populatePricingObject(values.currency_name, values.price)
          setFixedSellingPrice(prev => [...prev, registeredPrice])
          break
        default:
          return
      }
    }
  }
  const checkArrays = (data)=>{
    const arrayLists = ["selling_prices", "minimum_prices", "original_prices", "suggested_prices", "initial_prices", "installment_prices"]
    for(let value of arrayLists){
      if (value in data){
        if(typeof data[value] === "object" && data[value].length < 1){
          delete data[value]
        }
      }
    }
    return data
  }

  const handleSubmit = (data) => {
    // delete data?.cover_image;
    // delete data?.product_details?.product_cover_picture;
    delete data?.upload_content || data?.product_details?.upload_content;
    delete data?.upload_preview;
    // delete data?.product_listing_status;
    delete data?.preorder_details

    if (promotionalMaterial.length < 1) {
      delete data?.promotional_items;
    }
    if (!data.cta_button) {
      delete data.cta_button;
    }
    if (!applyCoupon) {
      delete data.coupon_settings;
      delete data.checkout;
    }
    if (!data.product_settings.allow_affiliates) {
      delete data.product_settings.affiliate_percentage_on_sales;
    }
    if (!data.is_show_compare_price) {
      delete data.is_show_compare_price;
    }
    const checkedData = checkArrays(data)
    console.log(checkedData)
    const result = transformToFormData(checkedData)
    createProduct(result, () => 
    router.push(`/account/kreator/products/preview/${productID}`)
    );
  };

  const initialValues = {
    "action": "e",
    "minimum_price": 0,
    "is_minimum_price": true,
    "is_show_compare_price": compareToPrice,
    "pricing_type_id": 1,
    "is_strike_original_price": true,
    "selling_prices": [],
    "original_prices": [],
    "initial_prices": [],
    "suggested_prices": [],
    "billing_frequency": 0,
    "minimum_prices": [],
    
    "coupon_settings": {
      "coupon_code": "string",
      "is_coupon": true,
      "start_date": "",
      "end_date": "",
      "fixed_amount_value": 0,
      "percentage_value": 0,
      "is_percentage": true,
      "is_fixed_amount": true,
      // "product_id": 0
    },
    "installment_prices": [],
    "promotional_items": {
      "allow_promotional_items": uploadPromotionalMaterial,
      "promotional_files": []
    },
    "set_price": true,
    "cta_button": "",
    "number_of_limited_product": 0,
    "who_bear_fee": buyerPaysTransactionFee,
    "product_settings": {
      "allow_affiliates": allowAffiliateMarket,
      "affiliate_percentage_on_sales": 0,
      "is_limited_sales": limitProductSale,
      "show_number_of_sales": showTotalSales
    },
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    // validationSchema: "",
    validateOnChange: false,
  });

  const { errors, setFieldValue, values } = formik;

  // useEffect(() => {
  //   if (!values.enable_preorder) {
  //     delete values.preorder_details;
  //     delete values.enable_preorder;
  //   }
  // }, [values]);

  // useEffect(() => {
  //   if (
  //     values[
  //       "minimum_prices" ||
  //         "suggested_prices" ||
  //         "original_prices" ||
  //         "suggested_prices" ||
  //         "initial_prices" ||
  //         "installment_prices"
  //     ]?.length > 0
  //   ) {
  //     setFieldValue("set_price", true);
  //   }
  // }, [values]);

  // useEffect(() => {
  //   setFieldValue("pricing_type_id", priceType);
  //   setFieldValue("checkout.cta_button", ctaBtnText);
  //   setFieldValue("selling_prices", sellingPrice);
  //   setFieldValue("minimum_prices", minimumPrice);
  //   setFieldValue("is_show_compare_price", compareToPrice);
  //   setFieldValue("checkout.is_coupon", applyCoupon);
  //   setFieldValue("coupon_settings.is_percentage", couponVariance.isPercentage);
  //   setFieldValue(
  //     "coupon_settings.is_fixed_amount",
  //     couponVariance.is_fixed_amount
  //   );
  //   setFieldValue("product_settings.allow_affiliates", allowAffiliateMarket);
  //   setFieldValue("product_settings.is_limited_sales", limitProductSale);
  //   setFieldValue("product_settings.show_number_of_sales", showTotalSales);
  //   setFieldValue("who_bear_fee", buyerPaysTransactionFee);
  //   setFieldValue("minimum_prices", minimumPrice);
  //   setFieldValue("selling_prices", sellingPrice);
  //   setFieldValue("original_prices", originalPrice);
  //   setFieldValue("suggested_prices", suggestedPrice);
  //   setFieldValue("initial_prices", initialPrice);
  //   setFieldValue("installment_prices", installmentPrice);
  //   setFieldValue(
  //     "promotional_items.allow_promotional_items",
  //     uploadPromotionalMaterial
  //   );
  //   setFieldValue(
  //     "promotional_items.promotional_files",
  //     preview?.map((item) => item.url)
  //   );
  // }, [
  //   priceType,
  //   ctaBtnText,
  //   sellingPrice,
  //   compareToPrice,
  //   applyCoupon,
  //   couponVariance,
  //   allowAffiliateMarket,
  //   limitProductSale,
  //   showTotalSales,
  //   buyerPaysTransactionFee,
  //   minimumPrice,
  //   originalPrice,
  //   suggestedPrice,
  //   uploadPromotionalMaterial,
  //   preview,
  //   promotionalMaterial,
  //   initialPrice,
  //   installmentPrice,
  // ]);

  //Updating Formik values
  useEffect(()=>{
    switch(priceType){
      case "Fixed Price": 
        return setFieldValue("pricing_type_id", 1)
      case "Pay What You Want":
        return setFieldValue("pricing_type_id", 2);
      case "Installment Payment":
        return setFieldValue("pricing_type_id", 3);
      case "Make It Free":
        return setFieldValue("pricing_type_id", 4);

    }
  }, [priceType])
  useEffect(()=>{
    setFieldValue("cta_button", ctaBtnText)
    setFieldValue("selling_prices", [...fixedSellingPrice])
    setFieldValue("is_show_compare_price", compareToPrice)
    setFieldValue("original_prices", [...fixedOriginalPrice])
    setFieldValue("product_settings.allow_affiliates", allowAffiliateMarket);
    setFieldValue("product_settings.affiliate_percentage_on_sales", afiliatePercentage);
    setFieldValue("promotional_items.allow_promotional_items", uploadPromotionalMaterial);
    setFieldValue("product_settings.show_number_of_sales", showTotalSales);
    setFieldValue("who_bear_fee", buyerPaysTransactionFee);
    setFieldValue("product_settings.is_limited_sales", limitProductSale);
    setFieldValue("number_of_limited_product", +numberOfLimit);
    setFieldValue("minimum_prices", [...minimumPrice]);
    setFieldValue("suggested_prices", [...suggestedPrice]);
    setFieldValue("billing_frequency", numberOfInputs);
    setFieldValue("coupon_settings.is_percentage", couponVariance.isPercentage);
    setFieldValue("coupon_settings.is_fixed_amount", couponVariance.is_fixed_amount);
  }, [
    ctaBtnText,
    fixedSellingPrice,
    compareToPrice,
    fixedOriginalPrice,
    allowAffiliateMarket,
    afiliatePercentage,
    uploadPromotionalMaterial,
    showTotalSales,
    buyerPaysTransactionFee,
    limitProductSale,
    numberOfLimit,
    minimumPrice,
    suggestedPrice,
    numberOfInputs,
    couponVariance
  ])


  // Clear outs
  useEffect(()=>{
    if(compareToPrice === false){
      setFixedOriginalPrice([])
    }
    if(allowAffiliateMarket === false){
      setAfiliatePercentage(0)
    }
    if(limitProductSale === false){
      setNumberOfLimit(0)
    }
  }, [compareToPrice, allowAffiliateMarket, limitProductSale])

  useEffect(() => {
    if(Object.keys(product).length > 0){
      setFieldValue("product_name", product?.product_details?.product_name);
      setFieldValue('product_details', product?.product_details?.product_details)
      setFieldValue(
        "product_description",
        product?.product_details?.product_description
      );
      setFieldValue("enable_preorder", product?.product_details?.enable_preorder);
      setFieldValue("upload_content", product?.product_details?.upload_content);
      setFieldValue(
        "product_visibility_status",
        product?.product_details?.product_visibility
      );
      setFieldValue("upload_preview", product?.product_details?.is_preview_only);
      setFieldValue(
        "preorder_details.preorder_release_date",
        product?.product_details?.preoder_date
      );
      setFieldValue(
        "preorder_details.is_preorder_downloadable",
        product?.product_details?.is_preoder_downloadable ?? false
      );
      setFieldValue(
        "kreatesell_id",
        product?.product_details?.kreasell_product_id
      );
      setFieldValue("product_type_id", product?.product_details?.product_type_id);
      setFieldValue("product_id", product?.product_details?.id);
      setFieldValue(
        "product_listing_status_id",
        product?.product_details?.product_listing_status
      );
      setFieldValue("upload_content", product.product_details.upload_content ? product.product_details.upload_content : false);
      console.log(product.product_details.cta_button)
      setFieldValue("cta_button", product.product_details.cta_button ? product.product_details.cta_button : ctaBtnText)
      setCtaBtnText(product?.product_details?.cta_button)

      if(product.check_out_details && product.check_out_details.length > 0){
        populatePricing(product?.check_out_details)
      }
      if(product.product_details.is_allow_affiliate === true){
        setAllowAffiliateMarket(true)
        setAfiliatePercentage(product?.product_details?.affiliate_percentage_on_sales)
      }
      if(product.product_details.is_limited_sales === true){
        setLimitProductSale(true)
      }
    }
  }, [product]);

  return (
    <Form onFinish={formik.handleSubmit}>
      {priceType === "Fixed Price" && (
        <div className="flex flex-col">
          <CustomCheckoutSelect title={"Selling Price"} field={fixedSellingPrice} setField={setFixedSellingPrice} />
          <p className="text-base-gray-200 text-xs pt-2">
            Set the equivalent price of your product in the currencies of the
            country you accept. You can always enable or disable any currency in
            your currency settings page.
          </p>
        </div>
      )}
      {priceType === "Pay What You Want" && (
        <div className="flex flex-col">
          <div className="mt-1">
            <CustomCheckoutSelect title={"Minimum Amount"} field={minimumPrice} setField={setMinimumPrice} />
          </div>
            <div className="mt-4">
              <CustomCheckoutSelect title={"Suggested Amount"} field={suggestedPrice} setField={setSuggestedPrice} />
            </div>
        </div>
      )}

      {priceType === "Installment Payment" && (
          <div>
            <p className="text-base mb-2"></p>
            <CustomCheckoutSelect title={"Total Selling Price"} field={totalSelling} setField={setTotalSelling} />
            <div className="mt-3 w-full">
              <p className="text-base mb-2">Select Frequency of payments</p>
              <div className={"w-full lg:w-1/5 "+ styles.selectBorder}>
                <Select
                  defaultValue={numberOfInputs}
                  onChange={(e) => setNumberOfInputs(e)}
                  style={{width: "100%", borderRadius: "8px"}}
                >
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                </Select>
              </div>
            </div>
            <h2 className="font-semibold my-3 text-base">Type What You Want Buyers To Pay At Each Installments</h2>
            {createCustomCurrencyField(inputsArray)}
            <div className="mt-3 w-full">
              <h2 className="text-base font-medium mb-2">Interval Between Each Payment</h2>
              <div className={"w-full flex lg:w-2/5 "+ styles.billingContainer}>
                <Input type="number"
                onChange={(e)=>handleBillingIntervalChange(e.target.value)}
                style={{paddingLeft: "10px"}}  />
                <Select
                 onChange={(e)=>setBillingIntervalDuration(e)}
                  defaultValue={customBillingIntervals[1].value}
                  style={{width: "30%"}}
                >
                  {customBillingIntervals && customBillingIntervals.map((item, index)=>(
                    <Option key={index} value={item.value}>{item.label}</Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
      )}

      <div>
        {priceType === "Fixed Price" && (
          <div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
            <div className="text-black-100 font-semibold text-lg">
              Show Compare-To Price (Optional)
            </div>
            <div className="flex">
              <Switch
                onChange={(e) => {
                  setCompareToPrice((value) => !value);
                }}
                checked={compareToPrice}
              />
              <span className="pl-6 text-black-100 text-lg font-semibold">
                {compareToPrice ? "ON" : "OFF"}
              </span>
            </div>
          </div>
        )}
        {priceType === "Fixed Price" && compareToPrice && (
          <div className="mt-4">
            <CustomCheckoutSelect title={"Original price (NGN)"} field={fixedOriginalPrice} setField={setFixedOriginalPrice} />
          </div>
        )}

        {priceType !== 4 && (
          <div className={styles.aplyCpn + " flex justify-between items-center mt-3 w-full pt-4"}>
            <div className="text-black-100 font-semibold text-lg">Apply Coupon Code</div>
            <div className={styles.businessCoupon +" flex"}>
              <Switch
                onChange={(e) => {
                  setApplyCoupon((value) => !value);
                }}
                checked={applyCoupon}
                disabled={isCouponDiabled ? true : false}
              />
              <span className="pl-6 text-black-100 font-semibold text-lg">
                {isCouponDiabled ? "DISABLED": applyCoupon ? "ON" : "OFF"}
              </span>
              <h3>Business</h3>
            </div>
          </div>
        )}

        {priceType !== 4 && applyCoupon && (
          <div className="my-2">
            <div className="w-full md:w-2/5">
              <Input
                placeholder="Enter coupon code"
                className={styles.ctaBtn}
                name="coupon_settings.coupon_code"
                onChange={formik.handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-2 w-full md:w-3/5 lg:w-3/5 xl:w-3/5 ">
              <div>
                <Radio
                  value={couponType}
                  content={0}
                  label="Percentage(%)"
                  onChange={(e) => {
                    setCouponType(e);
                    setCouponVariance((value) => ({
                      ...value,
                      isPercentage: !value.isPercentage,
                      is_fixed_amount: !value.is_fixed_amount,
                    }));
                  }}
                  labelStyle={styles.radioLabelStyle}
                />
                <div className="w-full">
                  <Input
                    placeholder="0"
                    type="number"
                    className={styles.ctaBtn}
                    name="coupon_settings.percentage_value"
                    onChange={formik.handleChange}
                    disabled={couponVariance.isPercentage === true ? false : true}
                  />
                </div>
              </div>

              <div>
                <Radio
                  value={couponType}
                  content={1}
                  label="Fixed Amount(NGN)"
                  onChange={(e) => {
                    setCouponType(e);
                    setCouponVariance((value) => ({
                      ...value,
                      isPercentage: !value.isPercentage,
                      is_fixed_amount: !value.is_fixed_amount,
                    }));
                  }}
                  labelStyle={styles.radioLabelStyle}
                />
                <div className="w-full">
                  <Input
                    placeholder="0"
                    type="number"
                    className={styles.ctaBtn}
                    name="coupon_settings.fixed_amount_value"
                    onChange={formik.handleChange}
                    disabled={couponVariance.is_fixed_amount === true ? false : true}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-3 mt-4 w-full lg:w-full xl:w-3/5 grid-cols-1 lg:grid-cols-2">
              <div className="flex items-center gap-3">
                <h2 className="text-base-gray-200 mb-0 text-base font-medium">From</h2>
                <Input
                  type="datetime-local"
                  className={styles.couponDateTimeLocaleContInput}
                  onChange={(e) => {
                    setFieldValue("coupon_settings.start_date", e.target.value);
                  }}
                />
              </div>

              <div className="flex items-center gap-3">
                <h2 className="text-base-gray-200 mb-0 text-base font-medium pr-5 lg:pr-0">To</h2>
                <Input
                  type="datetime-local"
                  className={styles.couponDateTimeLocaleContInput}
                  onChange={(e) => {
                    setFieldValue("coupon_settings.end_date", e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <h2 className="mt-6 text-xl font-semibold">Settings</h2>
        <div className="grey-bg bg-base-white-100 px-6 py-8 rounded-lg mt-3 w-11/12">
          <div className="flex justify-between items-center w-full lg:w-3/4 pt-4">
            <div className="text-black-100 font-semibold">
              Allow Affiliates to Market Product
            </div>
            <div className="flex">
              <Switch
                onChange={(e) => {
                  setAllowAffiliateMarket((
                    value) => !value);
                }}
                checked={allowAffiliateMarket}
              />
              <span className="pl-6 font-semibold text-black-100">
                {allowAffiliateMarket ? "ON" : "OFF"}
              </span>
            </div>
          </div>

          {allowAffiliateMarket && (
            <>
              <div className={styles.affilateUpload}>
                <div className="flex items-center justify-between">
                  <h2 className="mb-0 text-base"> How much percentage are you willing to pay affiliate</h2>
                  <div className={styles.affilateInput}>
                    <Input
                      type="number"
                      placeholder="0"
                      value={afiliatePercentage}
                      onChange={(e)=> setAfiliatePercentage(e.target.value)}
                    />
                    <span>%</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full lg:w-3/5 pt-4">
                <div className="text-gray-500 font-semibold">
                  Upload a Promotional Material for affiliates
                </div>
                <div className="flex">
                  <Switch
                    onChange={(e) => {
                      setUploadPromotionalMaterial((value) => !value);
                    }}
                    checked={uploadPromotionalMaterial}
                  />
                  <span className="pl-6 font-semibold text-black-100">
                    {uploadPromotionalMaterial ? "ON" : "OFF"}
                  </span>
                </div>
              </div>

              {uploadPromotionalMaterial && (
                <div className="pt-2 w-3/5">
                  <p className="text-base-gray-200 text-xs">
                    Only one file is allowed to be uploaded. Bundle all your
                    files into single RAR or ZIP file. <br /> The maximum
                    allowed file size is 1GB.
                  </p>

                  <div
                    className={`${styles.contentFileUpload} ${
                      promotionalMaterial?.length > 0 && styles.activeUpload
                    }`}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <Image src={CloudUpload} alt="upload image" />
                    <p className="hidden md:block text-primary-blue text-sm pl-4 my-auto">
                      Drag and Drop or Upload your product files
                    </p>
                    <p className="md:hidden text-primary-blue text-sm pl-4 my-auto">
                      Upload your product files
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="flex justify-between items-center w-full lg:w-3/4 pt-4">
            <div className="text-black-100 font-semibold">Limit Product Sales</div>
            <div className="flex">
              <Switch
                onChange={(e) => {
                  setLimitProductSale((value) => !value);
                }}
                checked={limitProductSale}
              />
              <span className="pl-6 font-semibold text-black-100">
                {limitProductSale ? "ON" : "OFF"}
              </span>
            </div>
          </div>

          {limitProductSale && (
            <div className={"items-center mt-2 flex justify-between pt-3 w-2/3"}>
              <h2 className="text-base-gray-200 mb-0 font-medium text-base">Product Sales Limit</h2>
              <Input placeholder="Enter Limit"
               onChange={(e)=> setNumberOfLimit(e.target.value)} 
               value={numberOfLimit}
               className={styles.limitProductInput} />
            </div>
          )}

          <div className="flex justify-between items-center w-full lg:w-3/4 pt-4">
            <div className="text-black-100 font-semibold">
              Publicly Show Total Sales on Store Page
            </div>
            <div className="flex">
              <Switch
                onChange={(e) => {
                  setShowTotalSales((value) => !value);
                }}
                checked={showTotalSales}
              />
              <span className="pl-6 font-semibold text-black-100">
                {showTotalSales ? "ON" : "OFF"}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center w-full lg:w-3/4 pt-4">
            <div className="text-black-100 font-semibold">Buyer Pays for Transaction Fee</div>
            <div className="flex">
              <Switch
                onChange={(e) => {
                  setBuyerPaysTransactionFee((value) => !value);
                }}
                checked={buyerPaysTransactionFee}
              />
              <span className="pl-6 font-semibold text-black-100">
                {buyerPaysTransactionFee ? "ON" : "OFF"}
              </span>
            </div>
          </div>
        </div>

          <div className={styles.digitalBtn}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >Save and Preview</Button>
          </div>
        </div>
    </Form>
  );
};