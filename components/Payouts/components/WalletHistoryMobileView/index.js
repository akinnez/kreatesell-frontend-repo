import { memo } from 'react'
import NoData from 'components/NoData'
import HistoryTag from '../HistoryTag'
import formatAccountNumber from '../../utils/formatAccountNumber'
import dateFormat from 'utils/dateFormat'
import styles from './index.module.scss'

const WalletHistoryMobileView = ({ histories }) => (
  <>
    {histories.length === 0 ? (
      <NoData />
    ) : (
      <ul className={styles.histories}>
        {histories?.map((history) => (
          <li key={history.id} className={styles.history}>
            <div className={styles.history__header}>
              <HistoryTag status={history.status} />
              <div className={styles['history__withdrawal-date']}>
                <span>Withdrawal Date</span>
                <p>{dateFormat(history.withdrawal_date)}</p>
              </div>
            </div>
            <ol>
              <li className={styles.history__detail}>
                <strong>Amount Withdrawn</strong>
                <span>
                  {history.currency} {history.amount}
                </span>
              </li>
              <li className={styles.history__detail}>
                <strong>Description</strong>
                <span>
                  {history.bank_name}{' '}
                  {`(${formatAccountNumber(history.bank_account)})`}
                </span>
              </li>
            </ol>
          </li>
        ))}
      </ul>
    )}
  </>
)

export default memo(WalletHistoryMobileView)
