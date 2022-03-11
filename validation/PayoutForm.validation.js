import * as yup from "yup";

const validator = (schema, msg) => schema.required(msg).trim(msg);

export const PayoutFormValidator = yup.object({
  country: yup.number().required("Select your country"),

  paypal_email: yup.string().when("country", (country, schema) => {
    return country && country !== 1 && country !== 72
      ? validator(schema, "Enter paypal email")
      : schema;
  }),

  bank: yup.number().when("country", (country, schema) => {
    return !country || country === 1 || country === 72
      ? schema.required("Select your bank")
      : schema;
  }),

  account_number: yup.string().when("country", (country, schema) => {
    return !country || country === 1 || country === 72
      ? validator(schema, "Enter your bank account number")
          .length(
            10,
            "Account number cannot be more or less than 10 characters"
          )
          .matches(/^\d+$/, "Account number should only contain numbers")
      : schema;
  }),

  account_name: yup.string().when("country", (country, schema) => {
    return !country || country === 1 || country === 72
      ? validator(schema, "Enter your bank account name")
      : schema;
  }),

  password: yup.string().required("Enter your password"),
});
