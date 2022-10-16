import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { useSelector } from 'react-redux'
import Webcam from 'react-webcam'

import { Dialog, DialogOverlay, DialogContent } from '@reach/dialog'

import { Form, Checkbox } from 'antd'

import styles from './Advanced.module.scss'
import { Input, Button } from '../form-input'
import useMyDropzone from 'hooks/useUploadV2'
import {
  AdvancedBitcoin,
  AdvancedIdCard,
  AdvancedPaypal,
  AdvancedSelfie,
  AdvancedSettings,
  AdvancedStripe,
  RightArrow2,
  CurvedArrow,
  DownArrow,
} from 'utils'

import { SubmitPaymentOptions } from 'redux/actions'

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

function FiletoDataURL(file, setter) {
  var reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
    setter(reader.result)
  }
  reader.onerror = function (error) {
    console.log('Error: ', error)
  }
}

const videoConstraints = {
  width: 980,
  height: 620,
  facingMode: 'user',
}

const paymentModes = [
  {
    id: 'stripe',
    // name: 'Stripe',
    image: AdvancedStripe,
  },
  {
    id: 'paypal',
    // name: 'Paypal',
    image: AdvancedPaypal,
  },
  {
    id: 'cryptocurrency',
    // name: 'Cryptocurrency',
    image: AdvancedBitcoin,
  },
]

const status = {
  Denied: 'Denied',
  Pending: 'REQUEST UNDER REVIEW',
  Approved: 'REQUEST APPROVED',
  // request will be removed eventually
  Request: 'REQUEST UNDER REVIEW',
}

// the 3 kyc status are: Pending, Approved, Denied
const Advanced = () => {
  const {
    getInputProps,
    getRootProps,
    isDragActive,
    files: dropZoneFiles,
  } = useMyDropzone()
  const { store } = useSelector((state) => state.store)
  const [checked, setChecked] = useState(false)
  const [statusStyle, setStatusStyle] = useState('')
  const [webcamImgSrc, setWebcamImgSrc] = useState(null)
  const [fileUploadImageSrc, setFileUploadImageSrc] = useState(null)
  const [showWebcamModal, setShowWebcamModal] = useState(false)
  const [activePaymentMode, setActivePaymentMode] = useState(paymentModes[0].id)
  const [files, setFiles] = useState({
    webcamFile: null,
    validIdCard: null,
  })

  // this will be used for setting the className for kyc status div
  useEffect(() => {
    if (store?.kyc_status) {
      setStatusStyle(`statEllipse${store?.kyc_status}`)
    }
  }, [store?.kyc_status])

  const submitPaymentOptions = SubmitPaymentOptions()

  const openModal = () => setShowWebcamModal(true)
  const closeModal = () => setShowWebcamModal(false)

  const handleChange = (e) => {
    setChecked(e.target.checked)
  }

  const openSelfieModal = () => {
    openModal()
  }

  const handlePaymentModeSelection = (mode) => {
    setActivePaymentMode(mode)
  }

  const handleWebcam = (imgSrc) => {
    // convert to file object
    setWebcamImgSrc(imgSrc)
    const file = dataURLtoFile(imgSrc, 'selfie.jpeg')
    setFiles((prev) => ({ ...prev, webcamFile: file }))
    // close the modal
    closeModal()
  }

  const handleSubmit = (e) => {
    //TODO: do validations to make sure each fields have been uploaded or filled
    const formData = new FormData()
    formData.append('Selfie', files.webcamFile)
    formData.append('Valid_Card', files.validIdCard)
    formData.append('Id_Number', e.Id_Number)
    // formData.append('Payment_Option_Id', activePaymentMode)

    submitPaymentOptions(formData, () => console.log('success'))
  }

  useEffect(() => {
    if (dropZoneFiles.length > 0) {
      FiletoDataURL(dropZoneFiles[0], setFileUploadImageSrc)
      setFiles((prev) => ({ ...prev, validIdCard: dropZoneFiles[0] }))
    }
  }, [dropZoneFiles?.length])

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>High Level Settings</h1>
        <p className={styles.subTitle}>
          Note that this page is reserved for a 2nd tier settings and you will
          be required to complete your KYC to activate the process.{' '}
        </p>
        <section className={styles.paymentIntegration}>
          <div className={styles.left}>
            <h1 className={styles.title}>Payment method integrations</h1>
            <p className={styles.subTitle}>
              You have to provide the credentials requested below to activate
              these payment methods to offer checkout options that best suits
              you and your clients
            </p>
            <div className={styles.paymentMethods}>
              {paymentModes.map(({ id, image }) => (
                <div
                  key={id}
                  className={`${styles.paymentMethodCard} ${
                    activePaymentMode === id && styles.active
                  }`}
                  onClick={() => handlePaymentModeSelection(id)}
                >
                  <Image src={image} alt="" />{' '}
                  {id === 'cryptocurrency' && <>&nbsp; Cryptocurrency</>}
                </div>
              ))}
            </div>
            {store?.kyc_status && (
              <div className={styles.status}>
                <div className={styles[statusStyle]}>{'  '}</div>
                {status[store?.kyc_status]}
              </div>
            )}

            {/* only show this section for rejected requests */}
            {store?.kyc_status === 'Denied' && (
              <>
                <h3 className={styles.reasonsHeader}>
                  Reasons for rejecting second level verification
                </h3>
                <div className={styles.reasonsContainer}>
                  <div className={styles.reasonsHeader}>Identity Card/Slip</div>
                  <div className={styles.reasons}>
                    <div className={styles.reason}>
                      <span className={styles.number}>1</span>The document
                      uploaded is not a valid identity card/slip
                    </div>
                    <div className={styles.reason}>
                      <span className={styles.number}>2</span>Your name does not
                      match with the name on your identity card/slip
                    </div>
                    <div className={styles.reason}>
                      <span className={styles.number}>3</span>Your identity
                      number does not match with the number on your Identity
                      card/slip
                    </div>
                    <div className={styles.reason}>
                      <span className={styles.number}>4</span>Your identity
                      card/slip is expired
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={styles.right}>
            <Image src={AdvancedSettings} alt="" />
          </div>
        </section>
        {/* only show this section for when kyc status is null or Denied */}
        {[null, 'Denied', 'Request'].includes(store?.kyc_status) && (
          <section className={styles.steps}>
            <div className={styles.stepsLeft}>
              <div className={styles.top}>
                {/* 1st card */}
                <div
                  className={styles.advancedCardContainer}
                  onClick={() => openSelfieModal()}
                >
                  {true && (
                    <>
                      <h1 className={styles.title}>Step 1</h1>
                      <div
                        className={`${styles.card} ${
                          !!webcamImgSrc && styles.filled
                        }`}
                      >
                        {webcamImgSrc ? (
                          <div className={styles.filledText}>
                            <h3>Take another selfie</h3>
                            <div className={styles.imageWrapper}>
                              <Image
                                src={webcamImgSrc}
                                alt=""
                                width={230}
                                height={200}
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            <Image src={AdvancedSelfie} alt="" />
                            <p>Take a selfie</p>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* show this arrow for tablet view */}
                <div className={styles.downArrow}>
                  <Image src={DownArrow} alt="" height={50} width={50} />
                </div>
                <span>
                  <Image src={RightArrow2} alt="" />
                </span>
                <div
                  {...getRootProps()}
                  className={styles.advancedCardContainer}
                >
                  <h1 className={styles.title}>Step 2</h1>
                  <div
                    className={`${styles.card} ${
                      !!fileUploadImageSrc && styles.filled
                    }`}
                  >
                    <input {...getInputProps({ multiple: false })} />
                    {fileUploadImageSrc ? (
                      <div className={styles.filledText}>
                        <h3>Change ID Card</h3>
                        <div className={styles.imageWrapper}>
                          <Image
                            src={fileUploadImageSrc}
                            alt=""
                            width={230}
                            height={200}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <>
                          <Image src={AdvancedIdCard} alt="" />
                          <p>Upload Valid ID Card</p>
                        </>
                      </>
                    )}
                  </div>
                </div>
                {/* show this arrow for tablet view */}
                <div className={styles.downArrow}>
                  <Image
                    src={DownArrow}
                    className={styles.downArrow}
                    alt=""
                    height={50}
                    width={50}
                  />
                </div>
              </div>
              <div className={styles.bottom}>
                <h1 className={styles.title}>Step 3</h1>
                <Form layout="vertical" onFinish={handleSubmit}>
                  <Input
                    // placeholder=""
                    extraLabel="Enter a Valid Identification Number"
                    placeholder="Enter the id number of the uploaded card"
                    type="text"
                    className={styles.input}
                    name="Id_Number"
                  />
                  <Checkbox
                    onChange={handleChange}
                    className={styles.checkbox}
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
                    htmlType="submit"
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
        )}
      </div>
      <DialogOverlay
        isOpen={showWebcamModal}
        onDismiss={closeModal}
        className="pt-12 "
      >
        <DialogContent className={styles.modal} aria-label="modal">
          <WebcamCapture {...{ handleWebcam }} />
        </DialogContent>
      </DialogOverlay>
    </>
  )
}

const WebcamCapture = ({ handleWebcam }) => (
  <Webcam
    audio={false}
    height={720}
    screenshotFormat="image/jpeg"
    width={1280}
    videoConstraints={videoConstraints}
  >
    {({ getScreenshot }) => (
      <Button
        // disabled={!checked}
        type="primary"
        label="Capture Photo"
        className={styles.captureBtn}
        onClick={() => {
          const imageSrc = getScreenshot()
          handleWebcam(imageSrc)
        }}
      />
    )}
  </Webcam>
)

export default Advanced
