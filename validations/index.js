import * as Yup from "yup";

export const WaitListSchema = () => {
  return Yup.object().shape({
    // added trim to account for when whitespace is supplied

    customer_name: Yup.string("Please put in your details to proceed")
      .trim()
      .required("Please input your first name"),
    customer_email: Yup.string()
      .email("Please use a valid e-mail address")
      .required("Please input your e-mail address"),
  });
};
