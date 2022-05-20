import * as yup from "yup";

export const AffiliatePermission = yup.object({
  permission: yup
    .string()
    .required("Enter your permission notes")
    .trim("Enter your permission notes"),
});
