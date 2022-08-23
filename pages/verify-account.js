import { useRouter } from 'next/router'
import { GeneralLayout, TwoFAVerificationForm } from '../components'
import styles from '../public/css/ForgotPassword.module.scss'

const VerifyAccount = () => {
  const router = useRouter()
  const email = router.query?.email
  return (
    <GeneralLayout
      Form={TwoFAVerificationForm}
      formTitle="Let's verify that it's you"
      title="KreateSell | Login"
      subTitle={`Input the 6 digit code that has been sent to ${email}`}
      socialBtn={false}
      signupStyle={styles.signup}
      subTitleOpacity={true}
    />
  )
}

export default VerifyAccount
