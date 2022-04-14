import InputBox from "./InputBox";
import styles from "./form.module.scss";
import cogoToast from "cogo-toast";
import { WaitListSchema } from "../../../validations";
import { isAnEmpytyObject } from "../../../utils";
import { useFormik } from "formik";
import { FormError } from "./FormError";
import { AnimatePresence } from "framer-motion";
// import axios from '../../../utils/axios'
import axios from "axios";

const waitListUrl = `${process.env.BASE_URL}v1/kreatesell/utils/waitlist`;

const Form = ({ showSubmissionSuccessModal, showSubmissionFailureModal }) => {
  // const feedBackOptions = {
  //   hideAfter: 5,
  //   position: "center",
  // };

  const initialValues = {
    customer_name: "",
    customer_email: "",
  };

  const handleSubmit = (values) => {
    const { customer_name, customer_email } = values;
    const data = { customer_name, customer_email };

    // always show the submitting details message
    cogoToast.loading("Saving your details...").then(() => {
      // make request to submit details
      axios
        .post(waitListUrl, data)
        .then((res) => {
          // console.log(res?.data?.message);
          // DETAILS GO THROUGH, THEN showSubmissionSuccessModal
          showSubmissionSuccessModal(res?.data?.message);
        })
        .catch(() => {
          // ERROR OCCURRED
          showSubmissionFailureModal();
        });
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: WaitListSchema,
    validateOnChange: false,
  });

  const { errors } = formik;

  return (
    <>
      <AnimatePresence>
        {!isAnEmpytyObject(errors) && <FormError errors={errors} />}
      </AnimatePresence>

      <form className={styles.formMain} onSubmit={formik.handleSubmit}>
        <div className={styles.formBox}>
          <InputBox
            type="text"
            placeholder="Enter your First Name"
            name="customer_name"
            onChange={formik.handleChange}
          />
          <InputBox
            type="mail"
            placeholder="Enter your Email Address"
            name="customer_email"
            onChange={formik.handleChange}
          />
        </div>
        <button type="submit" className={styles.btn}>
          Join the wait-list
        </button>
      </form>
    </>
  );
};

export default Form;
