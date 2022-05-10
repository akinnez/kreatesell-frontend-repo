import { useState, useEffect } from "react";
import { CreateProductForm } from "components";
import styles from "./CreateProduct.module.scss";
import {Row, Col} from 'antd'
import {
  OneTimeSubscriptionIcon,
  MembershipSubscriptionIcon,
  DigitalDownloadIcon,
} from "components/IconPack";
import { useSelector } from "react-redux";
import { GetProductTypes } from "redux/actions";

export const CreateProductTab = ({setTitles,submit, titles, setSelectedTab}) => {
  const getProductTypes = GetProductTypes();

  const [tab, setTab] = useState(1);
  const [iconHover, setIconHover] = useState({
    tab1: tab === 1 || false,
    tab2: tab == 2 || false,
    tab3: tab == 3 || false,
  });

  const { tab1, tab2, tab3 } = iconHover;

  const { productTypes } = useSelector((state) => state.product);

  const filterProductType = (id) =>
    productTypes?.filter((item) => item.id === id);

  const digitalDownloadMenu = filterProductType(1);
  const oneTimeSubMenu = filterProductType(2);
  const membershipMenu = filterProductType(3);

  useEffect(() => {
    getProductTypes();
  }, []);
  useEffect(()=>{
    setSelectedTab(tab)
  }, [tab])
  useEffect(()=>{
    if(tab === 1){
      const newTitles = [titles[0], titles[1]]
      setTitles(newTitles)
      return
    }
    if(tab === 2){
      const newTitles = [titles[0], titles[1], 'One-Time-Subscription']
      setTitles(newTitles)
      return
    }
    if(tab === 3){
      const newTitles = [titles[0], titles[1], 'Membership']
      setTitles(newTitles)
      return
    }
  }, [tab])

  return (
    <div className={`px-0 lg:px-8 ${styles.container}`}>
      <h3 className="text-black-100 font-bold text-2xl">Add a New Product</h3>
      <p className="text-base font-semibold text-black-100 mt-5">Product Type</p>

      <Row gutter={24}>
        <Col span={8}>
          <div
            className={`${styles.productTypeTab} ${
              tab === 1 && styles.active
            } w-full`}
            key={digitalDownloadMenu[0]?.id ?? 1}
            onClick={() => setTab(digitalDownloadMenu[0]?.id) ?? 1}
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
            <div className="lg:hidden font-semibold">
              Digital Download
              <span className={`font-medium ${styles.mobileSubTitle}`}>
                - Start selling immediately
              </span>
            </div>
          </div>
        </Col>

        <Col span={8}>
          <div
            className={`${styles.productTypeTab} ${
              tab === 2 && styles.active
            } w-full`}
            key={oneTimeSubMenu[0]?.id ?? 2}
            onClick={() => setTab(oneTimeSubMenu[0]?.id) ?? 2}
            onMouseEnter={() =>
              setIconHover({
                ...iconHover,
                tab1: false,
                tab2: true,
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
            <h3 >BUSINESS</h3>
            <span>
              <OneTimeSubscriptionIcon active={tab === 2} onHover={tab2} />
            </span>
            <div className="hidden lg:block">
              <h2 className="text-lg font-bold">One-Time Subscription</h2>
              <span>Pay only once</span>
            </div>
            <div className="lg:hidden font-semibold">
              One-Time Subscription
              <span className={`font-medium ${styles.mobileSubTitle}`}>
                {" "}
                - Pay only once
              </span>
            </div>
          </div>
        </Col>

        <Col span={8}>
          <div
            className={`${styles.productTypeTab} ${
              tab === 3 && styles.active
            } w-full`}
            key={membershipMenu[0]?.id ?? 3}
            onClick={() => setTab(membershipMenu[0]?.id) ?? 3}
            onMouseEnter={() =>
              setIconHover({
                ...iconHover,
                tab1: false,
                tab2: false,
                tab3: true,
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
            <h3 >BUSINESS</h3>
            <span>
              <MembershipSubscriptionIcon active={tab === 3} onHover={tab3} />
            </span>

            <div className="hidden lg:block">
              <h2 className="text-lg font-bold">Membership</h2> 
              <span>Charge on recurring basis</span>
            </div>
            <div className="lg:hidden font-semibold">
              Membership
              <span className={`font-medium ${styles.mobileSubTitle}`}>
                {" "}
                - Charge on recurring basis
              </span>
            </div>
          </div>
        </Col>
      </Row>
      {/* {(tab === 2 || tab === 3) && } */}
      {tab !== 1 ?<div className={styles.businessPlan}>
        <h2 className="text-base font-normal">This action requires a business plan, click <a>here</a> to subscribe</h2>
        </div>: <></>}
      <div className="mt-8 mb-4">
        <div className="divider"></div>
      </div>

      <div>
        {tab === 1 && (
          <CreateProductForm
            productType="digitalDownload"
            productTypeId={tab}
            submit={submit}
          />
        )}

        {tab === 2 && (
          <CreateProductForm
            productType="oneTimeSubscription"
            productTypeId={tab}
            submit={submit}
          />
        )}

        {tab === 3 && (
          <CreateProductForm submit={submit} productType="membership" productTypeId={tab} />
        )}
      </div>
    </div>
  );
};
