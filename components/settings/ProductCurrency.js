import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import { useSelector } from 'react-redux'

import { Row, Col, Spin } from 'antd'

import { Checkbox as CustomCheck } from 'components/checkbox/Checkbox'
import style from './Index.module.scss'
import { Button } from '../form-input'
import { UpdateStoreCurrencies, GetStoreCurrencies } from 'redux/actions'

const Index = ({
  countriesCurrency,
  filteredCentral,
  filterdWest,
  loading,
}) => {
  const { storeCurrencies } = useSelector((state) => state.store)
  const updateStoreCurrencies = UpdateStoreCurrencies()
  const getStoreCurrencies = GetStoreCurrencies()
  const [selectedCurrencies, setSelectedCurrencies] = useState([])

  // make request to get currency
  useEffect(() => {
    getStoreCurrencies()
    return () => {}
  }, [])

  // set currencies on mount
  useEffect(() => {
    if (storeCurrencies?.length > 0) {
      getSelected()
    }
    return () => {}
  }, [storeCurrencies?.length])

  const handleSelect = (currency) => {
    if (
      selectedCurrencies.some((cry) => cry.currency_id === currency.currency_id)
    ) {
      // console.log('exist')
      setSelectedCurrencies((prev) => {
        const newList = prev.filter(
          (val) => val.currency_id !== currency?.currency_id,
        )
        // console.log('newList', newList)
        return newList
      })
    } else {
      // console.log('does not exists')
      setSelectedCurrencies((prev) => {
        return [...prev, currency]
      })
    }
  }

  const formatCurrency = () => {
    const data = {
      currencies_id: [
        ...selectedCurrencies.map((cur) => ({
          currency_id: cur?.currency_id,
          status: true,
        })),
      ],
    }
    return data
  }

  const handleSubmit = () => {
    // console.log('formatCurrency', formatCurrency())
    updateStoreCurrencies(
      formatCurrency(),
      () => console.log('successful'),
      () => console.log('error occured'),
    )
  }

  function getSelected() {
    setSelectedCurrencies(storeCurrencies)
  }

  if (loading) return <Spin />

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

        <div style={{ width: '100%' }}>
          <Row>
            {countriesCurrency?.map((cur, i) => (
              <Col key={i} md={4} sm={8} style={{ marginBlockEnd: '1rem' }}>
                <CustomCheck
                  defaultChecked={selectedCurrencies.some(
                    (cry) => cur.currency_id === cry.currency_id,
                  )}
                  onChange={() => handleSelect(cur)}
                  name="countries"
                >
                  <span
                    className={`p-2 flex`}
                    style={{
                      border: '1px solid #D9D9D9',
                      borderRadius: '8px',
                    }}
                  >
                    <div className={style.checFlag + ' mr-2'}>
                      <Image src={cur.flag} alt="flag" layout="fill" />
                    </div>
                    {cur.currency}
                  </span>
                </CustomCheck>
              </Col>
            ))}
          </Row>
        </div>

        <h4>West African CFA Franc BCEAO(XOF)</h4>
        <div style={{ width: '100%' }}>
          <Row>
            {filterdWest?.map((cur, i) => (
              <Col key={i} md={5} sm={8} style={{ marginBlockEnd: '1rem' }}>
                <CustomCheck
                  defaultChecked={selectedCurrencies.some(
                    (cry) => cur.currency_id === cry.currency_id,
                  )}
                  onChange={() => handleSelect(cur)}
                  name="countries"
                >
                  <span
                    className={`p-2 flex`}
                    style={{ border: '1px solid #D9D9D9', borderRadius: '8px' }}
                  >
                    <div className={style.checFlag + ' mr-2'}>
                      <Image src={cur?.flag} alt="flag" layout="fill" />
                    </div>
                    {cur?.name}
                  </span>
                </CustomCheck>
              </Col>
            ))}
          </Row>
        </div>
        <h4>Central African CFA Franc BEAC(XAF)</h4>
        <div style={{ width: '100%' }}>
          <Row>
            {filteredCentral?.map((cur, i) => (
              <Col key={i} md={4} sm={6} style={{ marginBlockEnd: '1rem' }}>
                <CustomCheck
                  defaultChecked={selectedCurrencies.some(
                    (cry) => cur.currency_id === cry.currency_id,
                  )}
                  onChange={() => handleSelect(cur)}
                  name="countries"
                >
                  <span
                    className={`p-2 flex`}
                    style={{ border: '1px solid #D9D9D9', borderRadius: '8px' }}
                  >
                    <div className={style.checFlag + ' mr-2'}>
                      <Image src={cur?.flag} alt="flag" layout="fill" />
                    </div>
                    {cur?.name}
                  </span>
                </CustomCheck>
              </Col>
            ))}
          </Row>
        </div>
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
