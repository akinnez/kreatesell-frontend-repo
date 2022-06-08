import * as yup from "yup";

export const AbandonedCartSchema = yup.object({
  admin_title: yup
    .string()
    .required("Enter an admin title")
    .trim("Enter an admin title"),

  enable: yup.boolean(),

  when_to_send: yup.string().required("Select when to send mail"),

  email_subject: yup
    .string()
    .required("Enter email subject")
    .trim("Enter email subject"),

  email_content: yup
    .string()
    .required("Enter eamil content")
    .trim("Enter eamil content"),
});
