import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Form, Checkbox } from 'antd'

import styles from './Advanced.module.scss'
import { Input, Button } from '../form-input'
import {
  AdvancedBitcoin,
  AdvancedIdCard,
  AdvancedPaypal,
  AdvancedSelfie,
  AdvancedSettings,
  AdvancedStripe,
  RightArrow2,
  CurvedArrow,
} from 'utils'

const Advanced = () => {
  const [checked, setChecked] = useState(false)

  const handleChange = (e) => {
    setChecked(e.target.checked)
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>High Level Settings</h1>
      <p className={styles.subTitle}>
        Note that this page is reserved for a 2nd tier settings and you will be
        required to complete your KYC to activate the process.{' '}
      </p>
      <section className={styles.paymentIntegration}>
        <div className={styles.left}>
          <h1 className={styles.title}>Payment method integrations</h1>
          <p className={styles.subTitle}>
            You have to provide the credentials requested below to activate
            these payment methods to offer checkout options that best suits you
            and your clients
          </p>
          <div className={styles.paymentMethods}>
            <div className={styles.paymentMethodCard}>
              <Image src={AdvancedStripe} alt="" />
            </div>
            <div className={styles.paymentMethodCard}>
              <Image src={AdvancedPaypal} alt="" />
            </div>
            <div className={styles.paymentMethodCard}>
              <Image src={AdvancedBitcoin} alt="" /> &nbsp; Cryptocurrency
            </div>
          </div>
          <span className={styles.status}>Request under Review</span>
          <h3 className={styles.reasonsHeader}>
            Reasons for rejecting second level verification
          </h3>
          <div className={styles.reasonsContainer}>
            <div className={styles.reasonsHeader}>Identity Card/Slip</div>
            <div className={styles.reasons}>
              <div className={styles.reason}>
                <span className={styles.number}>1</span>The document uploaded is
                not a valid identity card/slip
              </div>
              <div className={styles.reason}>
                <span className={styles.number}>2</span>Your name does not match
                with the name on your identity card/slip
              </div>
              <div className={styles.reason}>
                <span className={styles.number}>3</span>Your identity number
                does not match with the number on your Identity card/slip
              </div>
              <div className={styles.reason}>
                <span className={styles.number}>4</span>Your identity card/slip
                is expired
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <Image src={AdvancedSettings} alt="" />
        </div>
      </section>
      <section className={styles.steps}>
        <div className={styles.stepsLeft}>
          <div className={styles.top}>
            {/* 1st card */}
            <div className={styles.advancedCardContainer}>
              <h1 className={styles.title}>Step 1</h1>
              <div className={styles.card}>
                <Image src={AdvancedSelfie} alt="" />
                <p>Take a selfie</p>
              </div>
            </div>
            <span>
              <Image src={RightArrow2} alt="" />
            </span>
            <div className={styles.advancedCardContainer}>
              <h1 className={styles.title}>Step 2</h1>
              <div className={styles.card}>
                <Image src={AdvancedIdCard} alt="" />
                <p>Upload Valid ID Card</p>
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <h1 className={styles.title}>Step 3</h1>
            <Form layout="vertical">
              <Input
                // placeholder=""
                extraLabel="Enter a Valid Identification Number"
                placeholder="Enter the id number of the uploaded card"
                type="text"
                style={{ width: '80%', marginBottom: '0px', margin: 'auto' }}
              />
              <Checkbox
                onChange={handleChange}
                style={{ width: '80%', margin: 'auto' }}
                {...{ checked }}
              >
                <span className={styles.checkboxLabel}>
                  I agree to the terms of service and{' '}
                  <Link href="#">privacy policy</Link>
                </span>
              </Checkbox>
              <br />
              <Button
                disabled={!checked}
                type="primary"
                label="Submit"
                className={styles.submitBtn}
              />
            </Form>
          </div>
        </div>
        <div className={styles.stepsRight}>
          <div className={styles.arrowContainer}>
            <Image src={CurvedArrow} alt="" />
          </div>
        </div>
      </section>
    </div>
  )
}

// const AdvancedCard = () => {

// }

export default Advanced
