import * as yup from "yup";

const validator = (country, schema, msg) => {
  return !country || country === 1 || country === 72
    ? schema.required(msg)
    : schema;
};

export const AffiliatePayoutAccount = yup.object({
  country: yup.number().required("Select your country"),

  paypal_email: yup.string().when("country", (country, schema) => {
    return country && country !== 1 && country !== 72
      ? schema.required("Enter paypal email")
      : schema;
  }),

  bank: yup.number().when("country", (country, schema) => {
    return validator(country, schema, "Select your bank");
  }),

  account_number: yup.string().when("country", (country, schema) => {
    return validator(country, schema, "Enter your bank account number");
  }),

  account_name: yup.string().when("country", (country, schema) => {
    return validator(country, schema, "Enter your bank account name");
  }),

  password: yup.string().required("Enter your password"),
});
