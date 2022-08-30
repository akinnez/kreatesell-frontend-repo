import { useState, useEffect, useMemo } from 'react'

import { Dialog, DialogOverlay, DialogContent } from '@reach/dialog'

import useCurrency from 'hooks/useCurrency'
import { PricingCard, Button, UpgradeAccountForm, Select } from 'components'

import styles from './Settings.module.scss'

const Billing = () => {
  const [modal, setModal] = useState(false)
  const {
    countriesCurrency,
    loading,
    filteredCentral,
    filterdWest,
  } = useCurrency()
  const [activeBtn, setActiveBtn] = useState({
    annually: true,
    monthly: false,
  })
  const { annually, monthly } = activeBtn
  const [businessPrice, setBusinessPrice] = useState('4,999')
  const [priceLabel, setPriceLabel] = useState('Billed Monthly')
  const [subPriceType, setSubPriceType] = useState('NGN 9989')
  const [selectedPlan, setSelectedPlan] = useState('')
  const [countryOptions, setCountryOptions] = useState([])
  const [subscriptionMode, setSubscriptionMode] = useState(null)
  const [selectedCurrency, setSelectedCurrency] = useState({})

  useEffect(() => {
    monthly ? setBusinessPrice('4,999') : setBusinessPrice('4,167')
    monthly ? setPriceLabel('Billed Monthly') : setPriceLabel('Billed Annually')
    monthly ? setSubPriceType('') : setSubPriceType('NGN 9989')
  }, [monthly])

  // useEffect to default to a currency
  useEffect(() => {
    if (countryOptions.length > 0 && !modal) {
      setSelectedCurrency(countryOptions[0])
    }
  }, [countryOptions.length])

  //   useEffect to calculate price
  useEffect(() => {
    if (annually) {
      setSubscriptionMode({ mode: 'annually', price: 4167 * 12 })
    } else if (monthly) {
      setSubscriptionMode({ mode: 'monthly', price: 4999 })
    }
  }, [annually, monthly])

  // change
  useMemo(() => {
    if (countriesCurrency?.length > 0) {
      let currency = countriesCurrency.map((ctr) => ({
        ...ctr,
        value: ctr.name,
        label: ctr.currency,
      }))
      setCountryOptions(currency)
    }
  }, [countriesCurrency?.length])

  // console.log("countryOptions", countryOptions)

  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)

  return (
    <>
      <div>
        <div className="md:text-center pt-4 pb-4">
          <h3 className="text-black-100 font-bold text-xl">
            Upgrade Your Account
          </h3>
          <p className="text-base-gray-200">
            Upgrade your account to a premium account to enjoy more benefits.
          </p>
        </div>

        <div className={styles.tabContainer}>
          <div className={styles.tabSelect}>
            <div className={styles.tab}>
              <button
                onClick={() => setActiveBtn({ annually: true, monthly: false })}
                className={`${styles.btn1} ${annually && styles.activeBtn}`}
              >
                Annually - Save 17%
              </button>
              <button
                onClick={() => setActiveBtn({ annually: false, monthly: true })}
                className={`${styles.btn2} ${monthly && styles.activeBtn}`}
              >
                Monthly
              </button>
            </div>

            <div className={styles.select}>
              <Select
                name="country"
                options={countryOptions}
                arrowIconColor="#0072EF"
                borderColor="#40A9FF"
                onChange={(e) => setSelectedCurrency(e)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center my-6">
          <div className="md:pr-4">
            <PricingCard
              title="basic"
              price="0"
              btnText=""
              subTitle="All of the features you need to start selling your contents"
              priceType="100% Free"
              currentPlan={selectedPlan === 'basic'}
            />
          </div>

          <div className="pt-4 md:pt-0 md:pl-4">
            <PricingCard
              title="business"
              subTitle="The combination of core tools, custom options, and automated events for professional course creators looking for the growing of their businesses."
              price={businessPrice}
              btnText="Select This Plan"
              priceType={priceLabel}
              subPriceType={subPriceType}
              btnOnClick={openModal}
              currentPlan={selectedPlan === 'business'}
            />
          </div>
        </div>

        <div className={styles.cancelSubscription}>
          To disable any further automatic autorenewal attempts, please click{' '}
          <span onClick={() => {}}>&nbsp; Cancel Subscription Autorenewal</span>
        </div>

        <DialogOverlay isOpen={modal} onDismiss={closeModal} className="pt-12 ">
          <DialogContent className={styles.modal} aria-label="modal">
            <UpgradeAccountForm
              {...{
                subscriptionMode,
                selectedCurrency,
                countriesCurrency,
                loading,
                filteredCentral,
                filterdWest,
                setModal,
              }}
            />
          </DialogContent>
        </DialogOverlay>
      </div>
    </>
  )
}

export default Billing
