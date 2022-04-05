import InputBox from "./InputBox";
import styles from "./form.module.scss";
import cogoToast from "cogo-toast";
import { WaitListSchema } from "../../../validations";
import { isAnEmpytyObject } from "../../../utils";
import { useFormik } from "formik";
import { FormError } from "./FormError";
// import axios from '../../../utils/axios'
import axios from "axios";

const waitListUrl = `${process.env.BASE_URL}v1/kreatesell/utils/subscribe`;

const Form = ({ showModal }) => {
  const feedBackOptions = {
    hideAfter: 5,
    position: "top-right",
  };

  const initialValues = {
    customer_name: "",
    customer_email: "",
  };

  const handleSubmit = (values) => {
    const { customer_name, customer_email } = values;
    const data = { customer_name, customer_email };

    // make request here and then showModal should be passed as a callback to
    // successfully posting these details to the given endpoint.
    axios
      .post(waitListUrl, data)
      .then(() => {
        // DETAILS GO THROUGH
        showModal();
      })
      .catch(() => {
        // ERROR OCCURRED
        cogoToast.error(
          "Sorry, we encountered a problem while saving your details. Please, try again",
          feedBackOptions
        );
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
      {!isAnEmpytyObject(errors) && <FormError errors={errors} />}

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
            placeholder="Enter your Mail Address"
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
