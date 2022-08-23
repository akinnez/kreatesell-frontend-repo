import { useState } from 'react'
import { useRouter } from 'next/router'

import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import OTPInput, { ResendOTP } from 'otp-input-react'

import { Input, Button, FormError } from '../'
import { TwoFactorAuthSchema } from '../../validation'
import { isAnEmpytyObject } from '../../utils'
import { InitiatePasswordReset } from '../../redux/actions'
import styles from '../../public/css/2FA.module.scss'

export const TwoFAVerificationForm = () => {
  const router = useRouter()
  const initiatePasswordReset = InitiatePasswordReset()
  const [OTP, setOTP] = useState('')

  const { loading } = useSelector((state) => state.auth)

  const initialValues = {
    username: '',
  }

  const handleSubmit = (data) => {
    // initiatePasswordReset(data, () => {
    //   router.push("/forgot-password/token");
    // });
  }

  const resendOTP = () => {
    console.log('resending OTP')
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: TwoFactorAuthSchema,
    validateOnChange: false,
  })

  return (
    <div className={styles.body}>
      {!isAnEmpytyObject(formik.errors) && <FormError errors={formik.errors} />}

      <form
        onSubmit={formik.handleSubmit}
        autoComplete="off"
        className={styles.container}
      >
        {/* <Input
          label="Token"
          name="token"
          placeholder="Enter token sent to your email "
          onChange={formik.handleChange}
        /> */}
        <OTPInput
          value={OTP}
          onChange={setOTP}
          autoFocus
          OTPLength={6}
          otpType="number"
          disabled={false}
          secure
        />

        <Button text="Reset password" bgColor="primaryBlue" loading={loading} />
      </form>

      <div className={styles.footer}>
        Didn’t get OTP?{' '}
        <div onClick={resendOTP}>
          <a>Resend</a>
        </div>{' '}
      </div>
    </div>
  )
}
