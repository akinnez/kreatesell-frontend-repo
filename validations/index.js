import * as Yup from "yup";

export const WaitListSchema = () => {
  return Yup.object().shape({
    // added trim to account for when whitespace is supplied
    FirstName: Yup.string().trim().required("Please enter your first name"),
    Email: Yup.string().email().required("Please input a valid email address"),
  });
};
