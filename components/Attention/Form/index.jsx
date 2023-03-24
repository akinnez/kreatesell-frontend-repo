import InputBox from "./InputBox"; 
import styles from "./form.module.scss";
import cogoToast from "cogo-toast";
import { WaitListSchema } from "../../../validations";
import { isAnEmpytyObject } from "../../../utils";
import { useFormik } from "formik";
import { FormError } from "./FormError";
// import axios from '../../../utils/axios'
import axios from "axios";
import { useRouter } from "next/router";


const waitListUrl = `${process.env.BASE_URL}v1/kreatesell/utils/waitlist`;

const Form = ({ showSubmissionSuccessModal, showSubmissionFailureModal }) => {
  // const feedBackOptions = {
  //   hideAfter: 5,
  //   position: "center",
  // };
  const router = useRouter()

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
          // showSubmissionSuccessModal(res?.data?.message);
          router.push("/WaitlistSucess")
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

  // state to track error view.



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
            placeholder="Enter your Email Address"
            name="customer_email"
            onChange={formik.handleChange}
          />
        </div>
        <button type="submit" className={styles.btn}>
         Submit
        </button>
      </form>
    </>
  );
};

export default Form;
