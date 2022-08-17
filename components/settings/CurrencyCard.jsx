import React, { memo } from 'react'
import Image from 'next/image'

import styles from '../../public/css/UpgradeAccountForm.module.scss'
import { ActiveTick } from 'utils'

const CurrencyCard = ({
  currency,
  currency_id,
  flag,
  activeCurrency,
  handleSelect,
}) => {
  return (
    <>
      <span
        key={currency_id}
        onClick={() => handleSelect({ currency_id, currency })}
      >
        <p
          className={`p-2 flex items-center ${
            activeCurrency?.currency_id === currency_id ? 'activeCard' : 'card'
          }`}
        >
          <div className={styles.checFlag + ' mr-2'}>
            <Image src={flag} alt="flag" layout="fill" />
          </div>{' '}
          {currency}
          {activeCurrency?.currency_id === currency_id && (
            <Image src={ActiveTick} alt="active" width="16" height="16" />
          )}
        </p>
      </span>
      <style jsx>{`
        .activeCard {
          border: 1px solid #2dc071;
          border-radius: 0.5rem;
          cursor: pointer;
          color: #8c8c8c;
          font-size: 12px;
        }

        .card {
          border-radius: 0.5rem;
          border: 1px solid #f0f0f0;
          cursor: pointer;
          color: #8c8c8c;
          font-size: 12px;
        }

        .priceMenu {
          box-shadow: 0px 20px 200px rgba(34, 34, 34, 0.1);
          background: #ffffff;
          color: #262626;
        }
      `}</style>
    </>
  )
}

export default memo(CurrencyCard)
// export default CurrencyCard
