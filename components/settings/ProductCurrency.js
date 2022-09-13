import React, { useState } from 'react'
import Image from 'next/image'

import { Checkbox, Row, Col, Spin } from 'antd'

import style from './Index.module.scss'
import { Button } from '../form-input'
import ApiService from '../../utils/axios'
import { UpdateProductCurrencies } from 'redux/actions'

const Index = ({
  list = [],
  countriesCurrency,
  filteredCentral,
  filterdWest,
}) => {
  const updateProductCurrencies = UpdateProductCurrencies()
  const [currencies, setCurrencies] = useState({ currencies_id: [] })
  const [XOFCurrency, setXOFCurrency] = useState({ currencies_id: [] })
  const [XAFCurrency, setXAFCurrency] = useState({ currencies_id: [] })
  const handleSelect = (currency_id) => {
    setCurrencies((prev) => ({
      ...prev,
      currencies_id: currency_id?.map((id) => {
        return {
          currency_id: id,
          status: true,
        }
      }),
    }))
  }

  const handleXOF = (country_id) => {
    if (country_id.length <= 1) {
      const currencies = [...filterdWest, ...filteredCentral]
      const country = country_id
        .map((ctr) => currencies.filter((cur) => cur.id === ctr))
        .map((cur) => cur[0]?.currency_id)

      setXOFCurrency((prev) => ({
        currencies_id: [
          ...country?.map((cur) => {
            return {
              currency_id: cur,
              status: true,
            }
          }),
        ],
      }))
    }
  }

  const handleXAF = (country_id) => {
    if (country_id.length <= 1) {
      const currencies = [...filterdWest, ...filteredCentral]
      const country = country_id
        .map((ctr) => currencies.filter((cur) => cur.id === ctr))
        .map((cur) => cur[0]?.currency_id)

      setXAFCurrency((prev) => ({
        currencies_id: [
          ...country?.map((cur) => {
            return {
              currency_id: cur,
              status: true,
            }
          }),
        ],
      }))
    }
  }

  const formatCurrency = () => {
    const data = {
      currencies_id: [
        ...currencies.currencies_id,
        ...XOFCurrency.currencies_id,
        ...XAFCurrency.currencies_id,
      ],
    }
    return data
  }

  const handleSubmit = () => {
    updateProductCurrencies(
      formatCurrency(),
      () => console.log('successful'),
      () => console.log('error occured'),
    )
  }

  return (
    <div className={style.wrapper}>
      <h3>Store Currency Settings</h3>
      <div className={style.bordered}>
        <h4>Custom Product Currency - Customize your product currency</h4>
        <p>
          As a Kreator, your country&apos;s currency is selected by default. But
          you can decide to turn it off if you prefer. You can select other
          options to set the currency while adding a product through the
          &lsquo;add product&rsquo; section. Any currency that you don&apos;t
          select here will be automatically converted if used by your customer.
        </p>
        <h4>Customize the amount you can set when adding a product</h4>

        <Checkbox.Group
          style={{ width: '100%' }}
          onChange={handleSelect}
          // onChange={e => console.log(e)}
        >
          <Row>
            {countriesCurrency?.map(({ currency, currency_id, flag }, i) => (
              <Col key={i} md={4} sm={8} style={{ marginBlockEnd: '1rem' }}>
                <Checkbox value={currency_id}>
                  <span
                    className={`p-2 flex`}
                    style={{
                      border: '1px solid #D9D9D9',
                      borderRadius: '8px',
                    }}
                  >
                    <div className={style.checFlag + ' mr-2'}>
                      <Image src={flag} alt="flag" layout="fill" />
                    </div>
                    {currency}
                  </span>
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>

        {/* {console.log('filterdWest', filterdWest)} */}
        <h4>West African CFA Franc BCEAO(XOF)</h4>
        <Checkbox.Group
          style={{ width: '100%' }}
          // onChange={e => console.log(e)}
          onChange={handleXOF}
        >
          <Row>
            {filterdWest?.map(({ name, flag, id }, i) => (
              <Col key={i} md={5} sm={8} style={{ marginBlockEnd: '1rem' }}>
                <Checkbox value={id}>
                  <span
                    className={`p-2 flex`}
                    style={{ border: '1px solid #D9D9D9', borderRadius: '8px' }}
                  >
                    <div className={style.checFlag + ' mr-2'}>
                      <Image src={flag} alt="flag" layout="fill" />
                    </div>
                    {name}
                  </span>
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
        <h4>Central African CFA Franc BEAC(XAF)</h4>
        <Checkbox.Group
          style={{ width: '100%' }}
          // onChange={e => console.log(e)}
          onChange={handleXAF}
        >
          <Row>
            {filteredCentral?.map(({ name, flag, id }, i) => (
              <Col key={i} md={4} sm={6} style={{ marginBlockEnd: '1rem' }}>
                <Checkbox value={id}>
                  <span
                    className={`p-2 flex`}
                    style={{ border: '1px solid #D9D9D9', borderRadius: '8px' }}
                  >
                    <div className={style.checFlag + ' mr-2'}>
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
          onClick={handleSubmit}
          type="primary"
          style={{ marginTop: '20px' }}
          label="Update Details"
        />
      </div>
    </div>
  )
}

export default Index
