import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import NumberFormat from "react-number-format";
import { Row, Col, Card } from "antd";
import styles from "./ChargeBackCenter.module.scss";
import { Button } from "components/button/Button";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineEye,
} from "react-icons/ai";
import RecentChargeBackTable from "./RecentChargeBackTable";
import { useRouter } from "next/router";
import axios from "axios";
import {
  checkExpiredAdminToken,
  getUserToken,
  showToast,
  downloadFile,
} from "utils";
import Loader from "components/loader";

export const SuccessDiv = ({ text = "Won" }) => {
  return <div className={styles.successDiv}>{text}</div>;
};

export const ErrorDiv = ({ text = "Lost" }) => {
  return <div className={styles.errorDiv}>{text}</div>;
};

export const PendingDiv = ({ text = "Pending" }) => {
  return <div className={styles.pendingDiv}>{text}</div>;
};

// const url = `${process.env.BASE_URL}admin/ChargeBack/GetStatus`;
const ChargeBackCenter = ({ chargebacks, handleOpenChargebackDialog }) => {
  const [current, setCurrent] = useState(0);
  const [chargebackList, setChargebackList] = useState([]);
  const router = useRouter();

  const handleNextClick = () => {
    if (current === chargebacks?.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  };

  const handlePrevClick = () => {
    if (current === 0) {
      setCurrent(chargebacks?.length - 1);
    } else {
      setCurrent(current - 1);
    }
  };
  // const getPendingChargebacks = () => {
  //   checkExpiredAdminToken();
  //   const token = getUserToken();
  //   return axios
  //     .get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log("sssssssssssssssssssssssssssssssssssssss", res.data);
  //     })
  //     .catch((err) => {
  //       console.log("sssss", err);
  //       return err;
  //     });
  // };

  useEffect(() => {
    // getPendingChargebacks();
  }, []);

  return (
    <div>
      <Row>
        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 14, offset: 0 }}>
          <Card>
            <div className={styles.chargeBackCarouselContainer}>
              <div
                className={styles.leftIconDiv}
                onClick={() => handlePrevClick()}
              >
                <AiOutlineArrowLeft className={styles.leftIcon} />
              </div>

              <div className={styles.chargeBackWrapper}>
                <section className={styles.cashbackTopSection}>
                  <h4 className={styles.chargeBackHeading}>
                    Chargeback Requests
                  </h4>
                  <div className={styles.chargePendingDiv}> Pending</div>
                </section>
                <section className={styles.cashbackReasonSection}>
                  <h4 className={styles.chargeBackReasonHeading}>
                    Chargeback Reason
                  </h4>
                  <p>{chargebacks && chargebacks[current]?.reason}</p>
                </section>
                <section className={styles.logDateSection}>
                  <Row>
                    <Col
                      xs={{ span: 24, offset: 0 }}
                      sm={{ span: 8, offset: 0 }}
                    >
                      <div className={styles.logDateDiv}>
                        <p>Chargeback Log Date:</p>
                        <h4>
                          {dayjs(
                            chargebacks && chargebacks[current]?.log_date
                          ).format("MMM, DD YYYY hh:mm A")}
                        </h4>
                      </div>
                    </Col>
                    <Col
                      xs={{ span: 24, offset: 0 }}
                      sm={{ span: 8, offset: 0 }}
                    >
                      <div className={styles.logDateDiv}>
                        <p>Chargeback Due Date:</p>
                        <h4>
                          {dayjs(
                            chargebacks && chargebacks[current]?.due_date
                          ).format("MMM, DD YYYY hh:mm A")}
                        </h4>
                      </div>
                    </Col>
                    <Col
                      xs={{ span: 24, offset: 0 }}
                      sm={{ span: 8, offset: 0 }}
                    >
                      <div className={styles.logDateDiv}>
                        <p>Transaction Date:</p>
                        <h4>
                          {dayjs(
                            chargebacks && chargebacks[current]?.ransaction_date
                          ).format("MMM, DD YYYY hh:mm A")}
                        </h4>
                      </div>
                    </Col>
                  </Row>
                </section>
                <section className={styles.logDateSection}>
                  <Row gutter={[16, 16]}>
                    <Col
                      xs={{ span: 24, offset: 0 }}
                      sm={{ span: 8, offset: 0 }}
                    >
                      <div className={styles.logDateDiv}>
                        <p>Chargeback Amount:</p>
                        <NumberFormat
                          value={chargebacks && chargebacks[current]?.amount}
                          className={styles.chargebackAmonunt}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"NGN"}
                          renderText={(value, props) => (
                            <h4 {...props}>{value}</h4>
                          )}
                        />
                      </div>
                    </Col>
                    <Col
                      xs={{ span: 24, offset: 0 }}
                      sm={{ span: 8, offset: 0 }}
                    >
                      <div className={styles.logDateDiv}>
                        <p>Customer:</p>
                        <h4>
                          {chargebacks && chargebacks[current]?.customer_name}
                        </h4>
                      </div>
                    </Col>
                    <Col
                      xs={{ span: 24, offset: 0 }}
                      sm={{ span: 8, offset: 0 }}
                    >
                      <div className={styles.logDateDiv}>
                        <p>Customer Email:</p>
                        <h4>
                          {chargebacks && chargebacks[current]?.customer_email}
                        </h4>
                      </div>
                    </Col>
                  </Row>
                  <p className={styles.warning}>
                    You have just 10hrs to accept or decline this chargeback or
                    it will be processed automatically
                  </p>
                </section>
                <section className={styles.buttonSection}>
                  <Button
                    type="button"
                    text="Accept Chargeback"
                    className={`${styles.aceptBtn}`}
                    onClick={() =>
                      handleOpenChargebackDialog(chargebacks[current])
                    }
                  />
                  <Button
                    type="button"
                    text="Decline Chargeback"
                    className={`${styles.accessBtn}`}
                    onClick={() =>
                      console.log(chargebacks[current]?.evidence_path)
                    }
                  />
                  <Button
                    disabled={true}
                    type="button"
                    text="View Trail"
                    className={`${styles.viewKreatorBtn}`}
                    leftIcon={<AiOutlineEye className={styles.viewIcon} />}
                    onClick={() => console.log("View Trail")}
                  />
                </section>
              </div>
              <div
                className={styles.rightIconDiv}
                onClick={() => handleNextClick()}
              >
                <AiOutlineArrowRight className={styles.rightIcon} />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 9, offset: 1 }}>
          <Card>
            <RecentChargeBackTable chargebacks={chargebacks} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChargeBackCenter;
