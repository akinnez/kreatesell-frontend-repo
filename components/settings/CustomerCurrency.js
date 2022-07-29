import React, { useState, useEffect } from "react";

import Image from "next/image";

import style from "./Index.module.scss";
import { Checkbox, Row, Col, Spin } from "antd";
import { Button } from "../form-input";

const Index = ({ list = [], countriesCurrency, filteredCentral, filterdWest}) => {
  // console.log("filterdWest", filterdWest);
  return (
    <div className={style.wrapper}>
      <div className={style.bordered}>
        <h4>Customer&#39;s Currency Options</h4>
        <p>
          {" "}
          These are the currencies that your customers get to see and select
          when they want to buy a product. Although your payouts can only be in
          your local currency, your store currency can be any that are listed
          here. Customers can pay in their local currency.
        </p>

        <Checkbox.Group
          style={{ width: "100%" }}
          // onChange={e => console.log(e)}
        >
          <Row>
            {countriesCurrency?.map(({ currency, currency_id, flag }, i) => (
              <Col key={i} md={4} sm={8} style={{marginBlockEnd:"1rem"}}>
                <Checkbox value={currency_id}>
                  <span className={`p-2 flex`} style={{border:"1px solid #D9D9D9", borderRadius:"8px"}}>
                  <div className={style.checFlag+" mr-2"}>
                    <Image src={flag} alt="flag" layout="fill" />
                  </div>
                    {currency}
                  </span>
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>

        <h4>West African CFA Franc BCEAO</h4>
        <Checkbox.Group
          style={{ width: "100%" }}
          // onChange={e => console.log(e)}
        >
          <Row>
            {filterdWest?.map(({ name, currency_id, flag }, i) => (
              <Col key={i} md={5} sm={8} style={{marginBlockEnd:"1rem"}}>
                <Checkbox value={currency_id}>
                  <span className={`p-2 flex`} style={{border:"1px solid #D9D9D9", borderRadius:"8px"}}>
                  <div className={style.checFlag+" mr-2"}>
                    <Image src={flag} alt="flag" layout="fill" />
                  </div>
                    {name}
                  </span>
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
        <h4>Central African CFA Franc BEAC</h4>
        <Checkbox.Group
          style={{ width: "100%" }}
          // onChange={e => console.log(e)}
        >
          <Row>
            {filteredCentral?.map(({ name, currency_id, flag }, i) => (
              <Col key={i} md={4} sm={6} style={{marginBlockEnd:"1rem"}}>
                <Checkbox value={currency_id}>
                  <span className={`p-2 flex`} style={{border:"1px solid #D9D9D9", borderRadius:"8px"}}>
                  <div className={style.checFlag+" mr-2"}>
                    <Image src={flag} alt="flag" layout="fill" />
                  </div>
                    {name}
                  </span>
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
        <Button
          type="primary"
          style={{ marginTop: "20px" }}
          label="Update Details"
        />
      </div>
    </div>
  );
};

export default Index;
