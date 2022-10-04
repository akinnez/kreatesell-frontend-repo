import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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
} from 'utils'

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

const Advanced = () => {
  const {
    getInputProps,
    getRootProps,
    isDragActive,
    files: dropZoneFiles,
    filePreview: dropZoneFilePreview,
  } = useMyDropzone()
  const [checked, setChecked] = useState(false)
  const [webcamImgSrc, setWebcamImgSrc] = useState(null)
  const [showWebcamModal, setShowWebcamModal] = useState(false)
  const [activePaymentMode, setActivePaymentMode] = useState(paymentModes[0].id)

  const [files, setFiles] = useState({
    webcamFile: null,
    validIdCard: null,
  })

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
    // console.log('file is', file)
    setFiles((prev) => ({ ...prev, webcamFile: file }))
    // close the modal
    closeModal()
  }

  const handleSubmit = (e) => {
    // do validations to make sure each fields have been uploaded or filled
    const formData = new FormData()
    formData.append('Selfie', files.webcamFile)
    formData.append('Valid_Card', files.validIdCard)
    formData.append('Id_Number', e.Id_Number)
    formData.append('Payment_Option_Id', activePaymentMode)
  }

  useEffect(() => {
    if (dropZoneFiles.length > 0) {
      setFiles((prev) => ({ ...prev, validIdCard: dropZoneFiles[0] }))
    }
  }, [dropZoneFiles?.length])

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => URL.revokeObjectURL(dropZoneFilePreview.preview)
  }, [])

  console.log('files is', files)
  console.log('dropZoneFilePreview is', dropZoneFilePreview)

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
            <span className={styles.status}>Request under Review</span>
            <h3 className={styles.reasonsHeader}>
              Reasons for rejecting second level verification
            </h3>
            <div className={styles.reasonsContainer}>
              <div className={styles.reasonsHeader}>Identity Card/Slip</div>
              <div className={styles.reasons}>
                <div className={styles.reason}>
                  <span className={styles.number}>1</span>The document uploaded
                  is not a valid identity card/slip
                </div>
                <div className={styles.reason}>
                  <span className={styles.number}>2</span>Your name does not
                  match with the name on your identity card/slip
                </div>
                <div className={styles.reason}>
                  <span className={styles.number}>3</span>Your identity number
                  does not match with the number on your Identity card/slip
                </div>
                <div className={styles.reason}>
                  <span className={styles.number}>4</span>Your identity
                  card/slip is expired
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
              <div
                className={styles.advancedCardContainer}
                onClick={() => openSelfieModal()}
              >
                {true && (
                  <>
                    <h1 className={styles.title}>Step 1</h1>
                    <div className={styles.card}>
                      {webcamImgSrc ? (
                        <div style={{ position: 'relative' }}>
                          <h3
                            style={{
                              position: 'absolute',
                              top: '50%',
                              zIndex: '100',
                              color: '#0072EF',
                            }}
                          >
                            Take another selfie
                          </h3>
                          <Image
                            src={webcamImgSrc}
                            alt=""
                            width={230}
                            height={200}
                            // layout="fill"
                          />
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
              <span>
                <Image src={RightArrow2} alt="" />
              </span>
              <div {...getRootProps()} className={styles.advancedCardContainer}>
                <input {...getInputProps({ multiple: false })} />

                <>
                  <h1 className={styles.title}>Step 2</h1>
                  <div className={styles.card}>
                    <Image src={AdvancedIdCard} alt="" />
                    <p>Upload Valid ID Card</p>
                  </div>
                </>
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
                  style={{ width: '80%', marginBottom: '0px', margin: 'auto' }}
                  name="Id_Number"
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
