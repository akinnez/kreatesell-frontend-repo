import React, { useState, useEffect } from 'react'

import Image from 'next/image'

import { useSelector } from 'react-redux'

import style from './Index.module.scss'
import { Row, Col, Spin } from 'antd'
import { Button } from '../form-input'
import { Checkbox as CustomCheck } from 'components/checkbox/Checkbox'
import {
  UpdateStoreCheckoutCurrencies,
  GetStoreCheckoutCurrencies,
} from 'redux/actions'

const Index = ({
  countriesCurrency,
  filteredCentral,
  filterdWest,
  loading,
}) => {
  const {
    storeCheckoutCurrencies,
    store: { store_details },
  } = useSelector((state) => state.store)
  const updateStoreCheckoutCurrencies = UpdateStoreCheckoutCurrencies()
  const getStoreCheckoutCurrencies = GetStoreCheckoutCurrencies()
  const [selectedCurrencies, setSelectedCurrencies] = useState([])

  // make request to get currency
  useEffect(() => {
    if (!!store_details?.store_id) {
      getStoreCheckoutCurrencies(store_details.store_id)
    }
    return () => {}
  }, [store_details?.store_id])

  // set currencies on mount
  useEffect(() => {
    if (storeCheckoutCurrencies?.length > 0) {
      getSelected()
    }
    return () => {}
  }, [storeCheckoutCurrencies?.length])

  const handleSelect = (currency) => {
    if (
      selectedCurrencies.some((cry) => cry.currency_id === currency.currency_id)
    ) {
      console.log('exist')
      setSelectedCurrencies((prev) => {
        const newList = prev.filter(
          (val) => val.currency_id !== currency?.currency_id,
        )
        // console.log('newList', newList)
        return newList
      })
    } else {
      console.log('does not exists')
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
    updateStoreCheckoutCurrencies(
      formatCurrency(),
      () => console.log('successful'),
      () => console.log('error occured'),
    )
  }
  // console.log('checkout selected currencies', selectedCurrencies)
  // console.log('countriesCurrency', countriesCurrency)

  function getSelected() {
    setSelectedCurrencies(storeCheckoutCurrencies)
  }

  if (loading) return <Spin />
  return (
    <div className={style.wrapper}>
      <div className={style.bordered}>
        <h4>Customer&#39;s Currency Options</h4>
        <p>
          {' '}
          These are the currencies that your customers get to see and select
          when they want to buy a product. Although your payouts can only be in
          your local currency, your store currency can be any that are listed
          here. Customers can pay in their local currency.
        </p>

        {/* {console.log('countriesCurrency', countriesCurrency)}
        {console.log('selectedCurrencies', selectedCurrencies)} */}
        <div style={{ width: '100%' }}>
          <Row>
            {countriesCurrency?.map((cur, i) => (
              <Col key={i} md={4} sm={8} style={{ marginBlockEnd: '1rem' }}>
                {/* {console.log(
                  '',
                  selectedCurrencies.some(
                    (cry) => cur.currency_id === cry.currency_id,
                  ),
                )} */}
                <CustomCheck
                  defaultChecked={selectedCurrencies.some(
                    (cry) => cur.currency_id === cry.currency_id,
                  )}
                  onChange={() => handleSelect(cur)}
                  name="countries-2"
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

        <h4>West African CFA Franc BCEAO</h4>
        <div style={{ width: '100%' }}>
          <Row>
            {filterdWest?.map((cur, i) => (
              <Col key={i} md={5} sm={8} style={{ marginBlockEnd: '1rem' }}>
                <CustomCheck
                  defaultChecked={selectedCurrencies.some(
                    (cry) => cur.currency_id === cry.currency_id,
                  )}
                  onChange={() => handleSelect(cur)}
                  name="countries-2"
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
        <h4>Central African CFA Franc BEAC</h4>
        <div style={{ width: '100%' }}>
          <Row>
            {filteredCentral?.map((cur, i) => (
              <Col key={i} md={4} sm={6} style={{ marginBlockEnd: '1rem' }}>
                <CustomCheck
                  defaultChecked={selectedCurrencies.some(
                    (cry) => cur.currency_id === cry.currency_id,
                  )}
                  onChange={() => handleSelect(cur)}
                  name="countries-2"
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
