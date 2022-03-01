import * as yup from "yup";

export const AffiliatePayoutAccount = yup.object({
  country: yup.number().required("Select your country"),
  bank: yup.number().required("Select your bank"),
  account_number: yup.string().required("Enter your bank account number"),
  account_name: yup.string().required("Enter your bank account name"),
  password: yup.string().required("Enter your password"),
});
