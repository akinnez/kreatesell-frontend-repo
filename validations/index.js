import * as Yup from "yup";

export const WaitListSchema = () => {
  return Yup.object().shape({
    // added trim to account for when whitespace is supplied

    customer_name: Yup.string().trim().required("Please enter your first name"),
    customer_email: Yup.string()
      .email("Supplied email must be valid!")
      .required("Please input a valid email address"),
  });
};
