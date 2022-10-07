import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useFormik } from 'formik'
import { useSelector } from 'react-redux'

import { Input, PasswordInput, Button, Checkbox, FormError } from '../'
import { SignupSchema } from '../../validation'
// import ReCAPTCHA from "react-google-recaptcha";
import { isAnEmpytyObject } from '../../utils'
import { Signup, Login } from '../../redux/actions'
import styles from '../../public/css/Signup.module.scss'

export const SignupForm = () => {
  const router = useRouter()
  const signup = Signup()
  const login = Login()
  const email = router.query?.email

  const { loading } = useSelector((state) => state.auth)

  const initialValues = {
    Email: '',
    FullName: '',
    Password: '',
    phoneNo: '',
    terms: false,
    // recaptchaToken: "",
  }

  const handleSubmit = async (values) => {
    /**Destructuring the values below so that data used for validation on client side not required by the endpoint isn't passed along */
    const { Email, Password, phoneNo, FullName } = values
    const data = { Email, Password, phoneNo, FullName }
    data.isTracked = false
    if (
      Object.keys(router.query).length > 0 &&
      Object.keys(router.query).includes('fromPricing')
    ) {
      data.isTracked = true
    }
    let formData = new FormData()
    for (let value in data) {
      formData.append(value, data[value])
    }
    // console.log('router.query', router.query)
    // if user is from pricing page, automatically log user in
    if (
      Object.keys(router.query).length > 0 &&
      Object.keys(router.query).includes('fromPricing')
    ) {
      // console.log('router.query', router.query)
      await signup(
        formData,
        (val) => {
          data.username = data.Email
          data.password = data.Password
          delete data.Password
          delete data.Email
          delete data.FullName
          delete data.phoneNo
          login(
            data,
            (res) => {
              console.log(res)
              return router.push('/account/kreator/settings?activeTab=billing')
            },
            (err) => {
              console.log('error is', err)
            },
          )
        },
        (err) => {
          console.log('error is', err)
        },
      )
      return
    }

    /**Signup endpoint is called with data */
    await signup(formData, () => {
      return router.push('/login')
    })
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: SignupSchema,
    validateOnChange: false,
  })

  const { errors, setFieldValue } = formik

  useEffect(() => {
    if (email) setFieldValue('Email', email)
  }, [email])

  return (
    <>
      {!isAnEmpytyObject(errors) && <FormError errors={errors} />}

      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Input
          label="Full Name"
          name="FullName"
          placeholder="Enter your Full name"
          onChange={formik.handleChange}
        />

        <Input
          label="Email address"
          name="Email"
          placeholder="Enter your Email address"
          onChange={formik.handleChange}
          value={formik.values.Email}
        />

        <Input
          label="Phone number"
          name="phoneNo"
          placeholder="Enter your Phone number"
          inputMode="numeric"
          onChange={formik.handleChange}
        />

        <PasswordInput
          label="Password"
          name="Password"
          placeholder="Create Password"
          onChange={formik.handleChange}
        />

        {/* <ReCAPTCHA
					sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
					size="normal"
					onChange={(value) => setFieldValue("recaptchaToken", value)}
				/> */}

        <div className={styles.terms}>
          <Checkbox name="terms" onChange={formik.handleChange} />
          <p>I agree to terms & conditions</p>
        </div>
        <Button
          text="Sign up"
          type="submit"
          bgColor="primaryBlue"
          loading={loading}
        />
      </form>

      <div className={styles.footer}>
        Already have an account?{' '}
        <Link href="/login">
          <a>Login</a>
        </Link>{' '}
      </div>
    </>
  )
}
