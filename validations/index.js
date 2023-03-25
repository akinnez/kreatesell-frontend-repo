import * as Yup from "yup";

export const WaitListSchema = () => {
  return Yup.object().shape({
    // added trim to account for when whitespace is supplied

    customer_name: Yup.string().trim().required("Please input your first name"),
    customer_email: Yup.string()
      .trim() // account for whitespace within mail
      .email("Please use a valid e-mail address")
      .required("Please input your e-mail address"),
  });
};
