import InputBox from "./InputBox";
import styles from "./form.module.scss";
// import cogoToast from "cogo-toast";
import { WaitListSchema } from "../../../validations";
import { isAnEmpytyObject } from "../../../utils";
import { useFormik } from "formik";
import { FormError } from "./FormError";

const Form = ({ showModal }) => {
  // const feedBackOptions = {
  //   hideAfter: 5,
  //   position: "top-right",
  // };

  const initialValues = {
    FirstName: "",
    Email: "",
  };

  const handleSubmit = (values) => {
    const { Email, FirstName } = values;
    const data = { Email, FirstName };

    let formData = new FormData();
    for (let value in data) {
      formData.append(value, data[value]);
    }
    // make request here and then showModal should be passed as a callback to
    // successfully posting these details to the given endpoint.
    showModal();
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
            name="FirstName"
            onChange={formik.handleChange}
          />
          <InputBox
            type="mail"
            placeholder="Enter your Mail Address"
            name="Email"
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
