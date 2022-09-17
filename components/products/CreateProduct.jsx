import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CreateProductForm } from 'components'
import styles from './CreateProduct.module.scss'
import { Row, Col, Modal } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import CloseIcon from 'components/affiliates/CloseIcon'
import { AffilateBankSetting, KreatorBankSetting } from 'utils'
import {
  OneTimeSubscriptionIcon,
  MembershipSubscriptionIcon,
  DigitalDownloadIcon,
} from 'components/IconPack'
import { useSelector } from 'react-redux'
import { GetProductTypes } from 'redux/actions'

export const CreateProductTab = ({
  setTitles,
  titles,
  setSelectedTab,
  selectedTab,
  productId,
}) => {
  const getProductTypes = GetProductTypes()

  const [tab, setTab] = useState(1)
  const [iconHover, setIconHover] = useState({
    tab1: tab === 1 || false,
    tab2: tab == 2 || false,
    tab3: tab == 3 || false,
  })

  const { tab1, tab2, tab3 } = iconHover
  const { productTypes, product } = useSelector((state) => state.product)
  const { store } = useSelector((state) => state.store)
  const filterProductType = (id) =>
    productTypes?.filter((item) => item.id === id)

  const digitalDownloadMenu = filterProductType(1)
  const oneTimeSubMenu = filterProductType(2)
  const membershipMenu = filterProductType(3)
  const [isBank, setIsBank] = useState(false)
  const [isTypeEditable, setIsTypeEditable] = useState(false)
  const [isBasic, setIsBasic] = useState(true)
  const [productsMounted, setProductMounted] = useState(false)
  const [mountedCount, setMountedCount] = useState(0)

  const router = useRouter()
  useEffect(() => {
    if (Object.keys(store).length > 0) {
      const { bank_details, user } = store
      if (user.user_plan === 'Business') setIsBasic(false)
      if (!bank_details) {
        setIsBank(true)
      } else {
        setIsBank(false)
      }
      return () => {
        setIsBank(false)
        setIsBasic(true)
      }
    }
  }, [store])

  // console.log("tab is", tab);
  // console.log("isTypeEditable is", isTypeEditable);
  // console.log("productsMounted is", productsMounted);
  // console.log("mountedCount is", mountedCount);

  useEffect(() => {
    if (
      Object.keys(product).length > 0 &&
      !!productsMounted &&
      mountedCount === 1
    ) {
      const { product_type_details } = product
      switch (product_type_details) {
        case 'Digital Download':
          setTab(1)
          setIsTypeEditable(true)
          break
        case 'One-Time Subscription':
          setTab(2)
          setIsTypeEditable(true)
          break
        case 'Membership':
          setTab(3)
          setIsTypeEditable(true)
          break
      }
    }
  }, [product, mountedCount, productsMounted])

  useEffect(() => {
    setProductMounted(true)
    setMountedCount((prev) => prev + 1)
    return () => {
      setProductMounted(false)
    }
  }, [product])

  useEffect(() => {
    if (selectedTab) {
      setTab(selectedTab)
    }
  }, [])
  useEffect(() => {
    getProductTypes()
  }, [])
  useEffect(() => {
    setSelectedTab(tab)
  }, [tab])
  useEffect(() => {
    if (tab === 1) {
      const newTitles = [titles[0], titles[1]]
      setTitles(newTitles)
      return
    }
    if (tab === 2) {
      const newTitles = [titles[0], titles[1], 'One-Time-Subscription']
      setTitles(newTitles)
      return
    }
    if (tab === 3) {
      const newTitles = [titles[0], titles[1], 'Membership']
      setTitles(newTitles)
      return
    }
  }, [tab])

  return (
    <div className={`px-0 lg:px-8 ${styles.container}`}>
      <h3 className="text-black-100 font-bold text-2xl">Add a New Product</h3>
      <p className="text-base font-semibold text-black-100 mt-5">
        Product Type
      </p>

      <Row gutter={24}>
        <Col xs={24} md={8}>
          <div
            className={`${styles.productTypeTab} ${
              tab === 1 && styles.active
            } w-full`}
            key={digitalDownloadMenu[0]?.id ?? 1}
            onClick={() => {
              // TODO: Investigate what this line below doing
              // if(isTypeEditable && tab !==1){
              //   return
              // }
              setSelectedTab(digitalDownloadMenu[0]?.id ?? 1)
              setTab(digitalDownloadMenu[0]?.id ?? 1)
            }}
            onMouseEnter={() =>
              setIconHover({
                ...iconHover,
                tab1: true,
                tab2: false,
                tab3: false,
              })
            }
            onMouseLeave={() =>
              setIconHover({
                ...iconHover,
                tab1: false,
                tab2: false,
                tab3: false,
              })
            }
          >
            <span>
              <DigitalDownloadIcon active={tab === 1} onHover={tab1} />
            </span>
            <div className="hidden lg:block">
              <h2 className="text-lg font-bold">Digital Download</h2>
              <span>Start selling immediately</span>
            </div>
            <div
              className={`lg:hidden font-semibold ${styles.mobileContainer}`}
            >
              Digital Download
              <span className={`font-medium ${styles.mobileSubTitle}`}>
                Start selling immediately
              </span>
            </div>
          </div>
        </Col>

        <Col xs={24} md={8}>
          <div
            className={`${
              isBasic ? styles.productTypeTabDisabled : styles.productTypeTab
            } ${tab === 2 && styles.active} w-full`}
            key={oneTimeSubMenu[0]?.id ?? 2}
            onClick={() => {
              // if(isTypeEditable && tab !==2){
              //   return
              // }
              if (!isBasic) {
                setSelectedTab(oneTimeSubMenu[0]?.id ?? 2)
                setTab(oneTimeSubMenu[0]?.id ?? 2)
              }
            }}
            onMouseEnter={
              !isBasic
                ? () => {
                    return setIconHover({
                      ...iconHover,
                      tab1: false,
                      tab2: true,
                      tab3: false,
                    })
                  }
                : null
            }
            onMouseLeave={
              !isBasic
                ? () => {
                    return setIconHover({
                      ...iconHover,
                      tab1: false,
                      tab2: false,
                      tab3: false,
                    })
                  }
                : null
            }
          >
            <h3>BUSINESS</h3>
            <span>
              <OneTimeSubscriptionIcon active={tab === 2} onHover={tab2} />
            </span>
            <div className="hidden lg:block">
              <h2 className="text-lg font-bold">One-Time Subscription</h2>
              <span>Pay only once</span>
            </div>
            <div
              className={`lg:hidden font-semibold ${styles.mobileContainer}`}
            >
              One-Time Subscription
              <span className={`font-medium ${styles.mobileSubTitle}`}>
                {' '}
                - Pay only once
              </span>
            </div>
          </div>
        </Col>

        <Col xs={24} md={8}>
          <div
            className={`${
              isBasic ? styles.productTypeTabDisabled : styles.productTypeTab
            } ${tab === 3 && styles.active} w-full`}
            key={membershipMenu[0]?.id ?? 3}
            onClick={() => {
              // if(isTypeEditable && tab !==3){
              //   return
              // }
              if (!isBasic) {
                setSelectedTab(membershipMenu[0]?.id ?? 3)
                setTab(membershipMenu[0]?.id ?? 3)
              }
            }}
            onMouseEnter={() => {
              if (!isBasic) {
                return setIconHover({
                  ...iconHover,
                  tab1: false,
                  tab2: false,
                  tab3: true,
                })
              }
            }}
            onMouseLeave={() => {
              if (!isBasic) {
                return setIconHover({
                  ...iconHover,
                  tab1: false,
                  tab2: false,
                  tab3: false,
                })
              }
            }}
          >
            <h3>BUSINESS</h3>
            <span>
              <MembershipSubscriptionIcon active={tab === 3} onHover={tab3} />
            </span>

            <div className="hidden lg:block">
              <h2 className="text-lg font-bold">Membership</h2>
              <span>Charge on recurring basis</span>
            </div>
            <div
              className={`lg:hidden font-semibold ${styles.mobileContainer}`}
            >
              Membership
              <span className={`font-medium ${styles.mobileSubTitle}`}>
                {' '}
                - Charge on recurring basis
              </span>
            </div>
          </div>
        </Col>
      </Row>
      {/* {(tab === 2 || tab === 3) && } */}
      {tab !== 1 && store?.user?.user_plan !== 'Business' ? (
        <div className={styles.businessPlan}>
          <h2 className="text-base w-full font-normal">
            This action requires a business plan, click{' '}
            <Link href="/account/kreator/settings?activeTab=billing">here</Link>{' '}
            to subscribe
          </h2>
        </div>
      ) : (
        <></>
      )}
      <div className="mt-8 mb-4">
        <div className="divider"></div>
      </div>

      <div>
        {tab === 1 && (
          <CreateProductForm
            productType="digitalDownload"
            productTypeId={tab}
            {...{ productId }}
          />
        )}

        {tab === 2 && (
          <CreateProductForm
            productType="oneTimeSubscription"
            productTypeId={tab}
            {...{ productId }}
          />
        )}

        {tab === 3 && (
          <CreateProductForm
            productType="membership"
            productTypeId={tab}
            {...{ productId }}
          />
        )}
        {isBank && (
          <Modal
            title={null}
            footer={null}
            visible={isBank}
            onCancel={() => {
              setIsBank(false)
              router.push('all')
            }}
            // maskClosable={false}
            closeIcon={<CloseIcon />}
          >
            <div className="mt-4 mx-auto w-full py-5 px-2">
              <h2 className="mb-4 text-lg text-center font-semibold">
                Set Up Bank Details
              </h2>
              <p className="text-base-gray-300 text-center text-sm">In order</p>
              <div className="flex justify-between">
                <div
                  className="border-r-2 border-gray-300"
                  style={{
                    width: '55%',
                    height: '250px',
                    position: 'relative',
                  }}
                >
                  <Image src={KreatorBankSetting} alt="kreator" layout="fill" />
                </div>
                <div
                  style={{
                    width: '40%',
                    height: '220px',
                    position: 'relative',
                  }}
                >
                  <Image
                    src={AffilateBankSetting}
                    alt="affilate"
                    layout="fill"
                  />
                </div>
              </div>
              <div
                className={
                  styles.mdBtn +
                  ' w-1/2 flex items-center justify-center mx-auto mt-3'
                }
              >
                <Link
                  href={{
                    pathname: '/account/sales/payouts/set-up-bank-details',
                  }}
                >
                  Setup Account
                </Link>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  )
}
