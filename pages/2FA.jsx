import { GeneralLayout, TwoFAVerificationForm } from '../components'
import styles from '../public/css/ForgotPassword.module.scss'

const ForgotPassword = () => {
  return (
    <GeneralLayout
      Form={TwoFAVerificationForm}
      formTitle="2 FA form"
      title="KreateSell | "
      subTitle="Enter your email and a reset link will be sent to you"
      socialBtn={false}
      signupStyle={styles.signup}
      subTitleOpacity={true}
      withMargin={true}
    />
  )
}

export default ForgotPassword
