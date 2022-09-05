import { useState, useEffect } from 'react'
import Image from 'next/image'

import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'
import { usePaystackPayment } from 'react-paystack'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

import crypto from 'crypto'

import { SendPaymentCheckoutDetails } from 'redux/actions'
import { Button } from 'components/button/Button'
import {
  ActiveTick,
  ActiveStripe,
  AdvancedBitcoin,
  AdvancedPaypal,
  AdvancedStripe,
  splitFullName,
  FlutterwaveLogo,
} from 'utils'
import { RightArrow } from 'utils/icons/RightArrow'
import useCurrency from 'hooks/useCurrency'
import Loader from '../loader'
import styles from '../../public/css/UpgradeAccountForm.module.scss'
import CurrencyCard from 'components/settings/CurrencyCard'
import { useSelector } from 'react-redux'
import { Input } from 'components'

const paymentMethods = [
  {
    type: 'Stripe',
    icon: ActiveStripe,
    value: 'stripe',
  },
  {
    type: 'Paypal',
    icon: AdvancedPaypal,
    value: 'paypal',
  },
  {
    type: 'Flutterwave',
    icon: FlutterwaveLogo,
    value: 'flutterwave',
  },
  {
    type: 'CryptoCurrency',
    icon: AdvancedBitcoin,
    value: 'crypto',
  },
]

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export const UpgradeAccountForm = ({
  subscriptionMode: { mode, price },
  selectedCurrency,
  countriesCurrency,
  loading,
  filteredCentral,
  filterdWest,
  setModal,
}) => {
  // const makePlanUpgrade = MakePlanUpgrade();
  const { user } = useSelector((state) => state.auth)

  const [activeCurrency, setActiveCurrency] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const sendPaymentCheckoutDetails = SendPaymentCheckoutDetails()

  // // for stripe
  // const [clientSecret, setClientSecret] = useState('')

  // const stripe = useStripe()
  // const elements = useElements()

  // const [message, setMessage] = useState(null)
  // const [isLoading, setIsLoading] = useState(false)

  const randomId = `kreate-sell-${crypto.randomBytes(16).toString('hex')}`
  const paymentStatusList = {
    success: 's',
    failed: 'f',
    // abandoned: "a"
  }
  const paymentDetails = ({ reference = '', status = '' }) => {
    const statusValue = paymentStatusList[status]
    const value = {
      fullname: user?.full_name,
      email_address: user?.email,
      mobile_number: user?.mobile,
      datetime: new Date().toISOString(),
      total: price,
      reference_id: reference,
      purchase_details: [],
      status: statusValue,
      card_type: '',
      last_four: '',
      currency: activeCurrency?.currency,
      payment_type: 'subscription',
      is_affiliate: user?.is_affiliate,
      affiliate_product_link: '',
      user_identifier: user?.id,
    }
    return value
  }

  // Flutterwave configurations
  // console.log('active currency', activeCurrency?.currency)
  const flutterConfig = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: randomId,
    amount: price,
    currency: `${activeCurrency?.currency}`,
    payment_options: 'card, mobilemoney, ussd, mobile_money_ghana',
    customer: {
      email: user?.email,
      phonenumber: user?.mobile,
      name: splitFullName(user?.full_name),
    },
    type: '',
    customizations: {
      title: 'Kreatesell Title',
      description: 'Kreatesell description',
      logo:
        'https://res.cloudinary.com/salvoagency/image/upload/v1636216109/kreatesell/mailimages/KreateLogo_sirrou.png',
    },
  }

  // console.log('activeCurrency?.currency', activeCurrency?.currency)
  const handleFlutterPayment = useFlutterwave(flutterConfig)

  // Flutterwave configurations end here

  // paystack config
  const payStackConfig = {
    reference: randomId,
    email: user?.email,
    amount: price * 100,
    publicKey:
      activeCurrency?.currency === 'GHS'
        ? process.env.NEXT_PUBLIC_PAYSTACK_GHANA_PUBLIC_KEY
        : process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    firstName: splitFullName(user?.full_name, 'arr')?.[0],
    lastname: splitFullName(user?.full_name, 'arr')?.[1],
    phone: user?.mobile,
    currency: `${activeCurrency?.currency}`,
    channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
  }
  const onPaystackSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    // console.log(reference)
    const status = paymentStatusList[reference?.status]
    sendPaymentCheckoutDetails(
      paymentDetails({ reference: reference?.reference, status }),
    )
  }

  const onPaystackClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const initializePaystackPayment = usePaystackPayment(payStackConfig)
  // paystack config ends here

  // stripe configirations
  // const appearance = {
  //   theme: 'stripe', //night | flat | stripe
  //   // variables: {
  //   //   colorPrimary: '#4b8657',
  //   //   colorBackground: '#434770',
  //   //   colorText: '#a25757',
  //   // },
  // }
  // const options = {
  //   clientSecret,
  //   appearance,
  // }

  // useEffect(() => {
  //   if (!stripe) {
  //     return
  //   }

  //   const clientSecret = new URLSearchParams(window.location.search).get(
  //     'payment_intent_client_secret',
  //   )

  //   if (!clientSecret) {
  //     return
  //   }

  //   stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
  //     switch (paymentIntent.status) {
  //       case 'succeeded':
  //         setMessage('Payment succeeded!')
  //         break
  //       case 'processing':
  //         setMessage('Your payment is processing.')
  //         break
  //       case 'requires_payment_method':
  //         setMessage('Your payment was not successful, please try again.')
  //         break
  //       default:
  //         setMessage('Something went wrong.')
  //         break
  //     }
  //   })
  // }, [stripe])

  const handleSubmitStripe = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:3000',
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message)
    } else {
      setMessage('An unexpected error occurred.')
    }

    setIsLoading(false)
  }
  // stripe configuration ends here

  const handleSubmit = (e) => {
    e.preventDefault()
    /** Currencies using PayStack are listed here */
    if (['GHS', 'NGN'].includes(activeCurrency.currency)) {
      return initializePaystackPayment(onPaystackSuccess, onPaystackClose)
    }

    // currencies using stripe

    /** Currencies using FlutterWave are listed here. When other payment options for USD and GBP are implemented, remember to consider it here also */
    if (
      (!['NGN', 'GHS'].includes(activeCurrency.currency) ||
        selectedPaymentMethod === 'flutterwave') &&
      !['paypal', 'stripe', 'crypto'].includes(selectedPaymentMethod)
    ) {
      setModal(false)
      handleFlutterPayment({
        callback: async (response) => {
          // console.log('response ', response)
          await sendPaymentCheckoutDetails(
            paymentDetails({
              reference: response?.tx_ref,
              status: response?.status,
            }),
          )
          closePaymentModal()
          //   openModal();
        },
        onClose: () => {},
      })
    }
  }

  // set currency on mount
  useEffect(() => {
    if (countriesCurrency && !selectedCurrency.value) {
      setActiveCurrency(countriesCurrency[0])
      setSelectedPaymentMethod(paymentMethods[0].value)
    } else if (selectedCurrency.value) {
      setActiveCurrency(selectedCurrency)
    }
  }, [countriesCurrency])

  useEffect(() => {
    if (!['USD', 'GBP'].includes(activeCurrency.currency)) {
      setSelectedPaymentMethod('')
    }
  }, [activeCurrency?.currency])
  // console.log('activeCurrency', activeCurrency)

  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   if(['USD', 'GBP'].includes(activeCurrency.currency)){
  //     fetch('/api/create-payment-intent', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ items: [], type: "subscription", price: price }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setClientSecret(data.clientSecret))
  //   }
  // }, [activeCurrency.currency])

  // console.log("client secret is", clientSecret);
  const handleSelect = (currency) => {
    setActiveCurrency(currency)
  }

  const handlePaymentMethod = (method) => {
    setSelectedPaymentMethod(method)
  }

  if (loading) return <Loader />

  return (
    <>
      <div className="px-0 md:px-5">
        <div className="text-center mb-4">
          <h3 className="text-black-100 font-bold text-xl">
            Upgrade Your Account
          </h3>
          <h4 className="text-black-100 pt-2">BUSINESS</h4>
          <div className="divider"></div>

          <div className="text-base-green-200 font-bold text-2xl">
            <sup className="font-normal text-xs text-black-100">NGN</sup> 4,167
            <sub className="font-normal text-xs text-black-100">/ Month</sub>
          </div>
        </div>

        <form className="px-2 md:px-2 pt-4" onSubmit={handleSubmit}>
          <div className="text-primary-blue font-medium text-lg">
            Payment Details
          </div>
          <div className="divider"></div>

          <div>
            <div>Select Currency</div>
            <p className="text-base-gray-200 text-xs pt-2 md:pt-0 md:text-sm">
              Select your preferred currency and get price equivalent
            </p>
          </div>
          <div className="grid gap-4 grid-cols-3 md:grid-cols-6 pt-3">
            {countriesCurrency?.map(({ currency, currency_id, flag }, i) => (
              <CurrencyCard
                key={currency_id}
                handleSelect={() => handleSelect({ currency_id, currency })}
                {...{ currency, currency_id, flag, activeCurrency }}
              />
            ))}
          </div>

          <div className="py-7">
            <h2>West African CFA Franc BCEAO(XOF)</h2>
            <div className="grid gap-2 grid-cols-4 ">
              {filterdWest.map(({ id, currency, flag, name }, index) => (
                <div
                  key={index}
                  className={
                    activeCurrency.id === id ? styles.activeCard : styles.card
                  }
                  // onClick={() => setActiveCurrency(country)}
                  onClick={() => handleSelect({ id, currency })}
                >
                  <div
                    className={styles.checFlag + ' mr-2'}
                    style={{ borderRadius: '50%' }}
                  >
                    <Image src={flag} alt="flag" layout="fill" />
                  </div>
                  <div className="">{name}</div>
                  {activeCurrency.id === id && (
                    <div className="pl-1 pt-1">
                      <Image
                        src={ActiveTick}
                        alt="active"
                        width="16"
                        height="16"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="py-7">
            <h2>Central African CFA Franc BEAC(XAF)</h2>
            <div className="grid gap-1 grid-cols-4 ">
              {filteredCentral.map(({ id, currency, name, flag }, index) => (
                <div
                  key={index}
                  className={
                    activeCurrency.id === id ? styles.activeCard : styles.card
                  }
                  // onClick={() => setActiveCurrency(country)}
                  onClick={() => handleSelect({ id, currency })}
                >
                  <div
                    className={styles.checFlag + ' mr-2'}
                    style={{ borderRadius: '50%' }}
                  >
                    <Image src={flag} alt="flag" layout="fill" />
                  </div>
                  <div className="">{name}</div>
                  {activeCurrency.id === id && (
                    <div className="pl-1 pt-1">
                      <Image
                        src={ActiveTick}
                        alt="active"
                        width="16"
                        height="16"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* only show this section if selected currency is "USD" or "GBP" */}
          {['USD', 'GBP'].includes(activeCurrency?.currency) && (
            <>
              <div className="pt-6">
                <div>Payment Method</div>
                <p className="text-base-gray-200 text-xs pt-2 md:pt-0 md:text-sm">
                  Select your preferred payment method
                </p>
              </div>
              <div className="grid gap-4 grid-cols-3 pt-3">
                {paymentMethods.map(({ type, icon, value }) => (
                  <div
                    key={value}
                    onClick={() => handlePaymentMethod(value)}
                    className={`${
                      selectedPaymentMethod === value ? 'activeCard' : 'card'
                    } p-2 flex justify-around items-center`}
                  >
                    <Image src={icon} alt={type} />
                    {selectedPaymentMethod === value && (
                      <Image
                        src={ActiveTick}
                        alt="active"
                        width="16"
                        height="16"
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="w-full flex gap-2 items-center pr-4 lg:hidden">
            <div className="w-3/5 xs:w-3/4 md:w-4/5">
              <Input
                placeholder="Coupon Code"
                name="couponCode"
                // onChange={formik.handleChange}
              />
            </div>
            <div className="w-30 xs:w-1/4 md:w-1/5 pb-2">
              <Button text="Apply Coupon" className={styles.couponBtn} />
            </div>
          </div>

          <div className="w-full lg:w-6/6 mt-5 mx-auto hidden lg:flex gap-4 items-center">
            <div className="w-4/5">
              <Input
                placeholder=" Enter Coupon Code lg"
                name="couponCode"
                // onChange={formik.handleChange}
              />
            </div>
            <div className="w-1/5 ">
              <Button text="Apply Coupon" className={styles.couponBtn} />
            </div>
          </div>

          <div className="priceMenu my-6 py-3 px-8">
            <div className="flex justify-between pt-2">
              <p>SubTotal</p>
              <p>NGN 4,167</p>
            </div>
            <div className="divider"> </div>
            <div className="flex justify-between">
              <p>Total</p>
              <p className="text-primary-blue font-medium">NGN 4,167</p>
            </div>
          </div>

          <div className="w-full">
            <Button
              text="Pay NGN 4,167"
              bgColor="blue"
              style={{ width: '100%' }}
              icon={<RightArrow />}
            />
          </div>
        </form>
      </div>

      <style jsx>{`
        .activeCard {
          border: 1px solid #2dc071;
          border-radius: 0.5rem;
          cursor: pointer;
          color: #8c8c8c;
          font-size: 12px;
        }

        .card {
          border-radius: 0.5rem;
          border: 1px solid #f0f0f0;
          cursor: pointer;
          color: #8c8c8c;
          font-size: 12px;
        }

        .priceMenu {
          box-shadow: 0px 20px 200px rgba(34, 34, 34, 0.1);
          background: #ffffff;
          color: #262626;
        }
      `}</style>
    </>
  )
}

// const CheckoutForm = () => {
//   const { countriesCurrency, loading } = useCurrency()
//   const [activeCurrency, setActiveCurrency] = useState('')
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

//   const stripe = useStripe();
//   const elements = useElements();

//   const [message, setMessage] = React.useState(null);
//   const [isLoading, setIsLoading] = React.useState(false);

//   useEffect(() => {
//     if (!stripe) {
//       return;
//     }

//     const clientSecret = new URLSearchParams(window.location.search).get(
//       "payment_intent_client_secret"
//     );

//     if (!clientSecret) {
//       return;
//     }

//     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//       switch (paymentIntent.status) {
//         case "succeeded":
//           setMessage("Payment succeeded!");
//           break;
//         case "processing":
//           setMessage("Your payment is processing.");
//           break;
//         case "requires_payment_method":
//           setMessage("Your payment was not successful, please try again.");
//           break;
//         default:
//           setMessage("Something went wrong.");
//           break;
//       }
//     });
//   }, [stripe]);

//   return (
//     <>
//        <div className="px-0 md:px-5">
//         <div className="text-center mb-4">
//           <h3 className="text-black-100 font-bold text-xl">
//             Upgrade Your Account
//           </h3>
//           <h4 className="text-black-100 pt-2">BUSINESS</h4>
//           <div className="divider"></div>

//           <div className="text-base-green-200 font-bold text-2xl">
//             <sup className="font-normal text-xs text-black-100">NGN</sup> 4,167
//             <sub className="font-normal text-xs text-black-100">/ Month</sub>
//           </div>
//         </div>

//         <form className="px-2 md:px-2 pt-4" onSubmit={handleSubmit}>
//           <div className="text-primary-blue font-medium text-lg">
//             Payment Details
//           </div>
//           <div className="divider"></div>

//           <div>
//             <div>Select Currency</div>
//             <p className="text-base-gray-200 text-xs pt-2 md:pt-0 md:text-sm">
//               Select your preferred currency and get price equivalent
//             </p>
//           </div>
//           <div className="grid gap-4 grid-cols-3 md:grid-cols-6 pt-3">
//             {/* TODO: change this to component */}

//             {countriesCurrency?.map(({ currency, currency_id, flag }, i) => (
//               <CurrencyCard
//                 key={currency_id}
//                 handleSelect={() => handleSelect({ currency_id, currency })}
//                 {...{ currency, currency_id, flag, activeCurrency }}
//               />
//             ))}
//           </div>

//           <div className="pt-6">
//             <div>Payment Method</div>
//             <p className="text-base-gray-200 text-xs pt-2 md:pt-0 md:text-sm">
//               Select your preferred payment method
//             </p>
//           </div>
//           {/* paystack is NGN and GHS */}

//           {/* only show this section if selected currency is "USD" or "GBP" */}
//           {['USD', 'GBP'].includes(activeCurrency?.currency) && (
//             <div className="grid gap-4 grid-cols-3 pt-3">
//               {paymentMethods.map(({ type, icon, value }) => (
//                 <div
//                   key={value}
//                   onClick={() => handlePaymentMethod(value)}
//                   className={`${
//                     selectedPaymentMethod === value ? 'activeCard' : 'card'
//                   } p-2 flex justify-around items-center`}
//                 >
//                   <Image src={icon} alt={type} />
//                   {selectedPaymentMethod === value && (
//                     <Image
//                       src={ActiveTick}
//                       alt="active"
//                       width="16"
//                       height="16"
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="priceMenu my-6 py-3 px-8">
//             <div className="flex justify-between pt-2">
//               <p>SubTotal</p>
//               <p>NGN 4,167</p>
//             </div>
//             <div className="divider"> </div>
//             <div className="flex justify-between">
//               <p>Total</p>
//               <p className="text-primary-blue font-medium">NGN 4,167</p>
//             </div>
//           </div>

//           <div className="w-full">
//             <Button
//               text="Pay NGN 4,167"
//               bgColor="blue"
//               style={{ width: '100%' }}
//               icon={<RightArrow />}
//             />
//           </div>
//         </form>
//       </div>
//     </>
//   )
// }
