import React from 'react'
import Image from 'next/image'

import { Row, Col } from 'antd'

import styles from '../../public/css/checkoutSuccess.module.scss'
import { Button } from 'components'
import {
  ZipFile,
  SuccessProduct,
  OtherProductsSuccess,
  ExternalLink2,
  SuccessCheck,
  DownloadIcon2,
  SuccessKreatesellLogo,
  UserPicture,
} from 'utils'

const success = () => {
  return (
    <div className={styles.successContainer}>
      <nav>
        <span>Think Fast and Slow</span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image src={UserPicture} width={50} height={50} />
          Jon Doe
        </div>
      </nav>
      <div className={styles.body}>
        <section className={styles.successfulPurchase}>
          <div className={styles.successText}>
            <Image className={styles.icon} src={SuccessCheck} />
            <h2 className={styles.header}>Thank you for your purchase!</h2>
            <p className={styles.description}>
              Your purchase was successful and a receipt will be sent to your
              mail.
            </p>
          </div>
          <div className={styles.item}>
            <Row gutter={[32, 32]}>
              <Col md={{ span: 8 }} span={8}>
                <ProductCard />
              </Col>
              <Col md={{ span: 16 }} span={16}>
                <PurchaseSummaryCard />
              </Col>
            </Row>
          </div>
        </section>
        <section className={styles.otherProducts}>
          <h2 className={styles.headerText}>Other Products by the Kreator</h2>
          <Row gutter={[32, 32]}>
            <Col md={{ span: 8 }}>
              <OtherProductsCard />
            </Col>
            <Col md={{ span: 8 }}>
              <OtherProductsCard />
            </Col>
            <Col md={{ span: 8 }}>
              <OtherProductsCard />
            </Col>
            <Col md={{ span: 8 }}>
              <OtherProductsCard />
            </Col>
            <Col md={{ span: 8 }}>
              <OtherProductsCard />
            </Col>
            <Col md={{ span: 8 }}>
              <OtherProductsCard />
            </Col>
          </Row>
        </section>
      </div>
      <footer>
        <p>
          Powered by&nbsp; <Image src={SuccessKreatesellLogo} />
        </p>
      </footer>
    </div>
  )
}

const ProductCard = ({}) => {
  return (
    <div className={styles.productCardContainer}>
      <Image
        className={`${styles.productImage} rounded-t-lg`}
        src={SuccessProduct}
        width="320"
        height="300"
      />
      <div className={styles.productDetails}>
        <p className={styles.productName}>Think fast and slow</p>
        <span className={styles.userDetails}>
          <p className={styles.username}>
            <Image src={UserPicture} width="55" height="55" />
            Olumide John
          </p>
        </span>
      </div>
    </div>
  )
}

const OtherProductsCard = ({}) => {
  return (
    <div className={styles.otherProductCardContainer}>
      <Image
        className={`${styles.productImage} rounded-t-lg`}
        src={OtherProductsSuccess}
        width="330"
        height="250"
      />
      <div className={styles.productDetails}>
        <div className={styles.top}>
          <p className={styles.availability}>Out of Stock</p>
          <p className={styles.amountSold}>100 Sold</p>
        </div>
        <h5>Fundamental of Graphics Design</h5>
        <div className={styles.bottom}>
          <p>NGN 1000</p>
          <Image src={ExternalLink2} className={styles.goto} />
        </div>
      </div>
    </div>
  )
}

const PurchaseSummaryCard = ({}) => {
  return (
    <div className={styles.purchaseSummaryCardContainer}>
      <p className={styles.header}>Purchase Summary</p>
      <div className={styles.purchase}>
        <Image
          className={styles.purchaseIcon}
          src={ZipFile}
          height="80"
          width="80"
        />
        <span>
          <div className={styles.top}>Think fast and slow.rar</div>
          <div className={styles.bottom}>
            <div>
              <p className={styles.left}>236MB</p>|
              <p className={styles.right}>NGN 5,000</p>
            </div>
            <Button
              text="Download File"
              bgColor="blue"
              // icon={<DownloadIcon2 />}
            />
          </div>
        </span>
      </div>
    </div>
  )
}

export default success
