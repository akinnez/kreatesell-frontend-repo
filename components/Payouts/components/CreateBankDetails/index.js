import { useSelector } from 'react-redux'
import { Modal, Typography } from 'antd'
import CloseIcon from 'components/affiliates/CloseIcon'
import Spinner from 'components/Spinner'
import PayoutsForm from '../PayoutsForm'
import styles from './index.module.scss'
import useCurrency from 'hooks/useCurrency'

const { Text, Title } = Typography

const CreateBankDetails = ({
  createModal,
  hideCreateModal,
  showSuccessModal,
}) => {
  const { countries, banksByCountryId, loading } = useSelector(
    (state) => state.utils,
  )

  const { countriesCurrency, loading: countriesLoading } = useCurrency()

  if (countriesLoading) return <Spinner />
  return (
    <Modal
      title={null}
      footer={null}
      visible={createModal}
      onCancel={hideCreateModal}
      closeIcon={<CloseIcon />}
      className={styles.modal}
      width={765}
    >
      <header className={styles.header}>
        <Title level={2}>Provide your Bank details</Title>
        <p>
          <Text>We pay your money into this account</Text>
        </p>
      </header>
      {loading || countriesLoading ? (
        <Spinner />
      ) : countries.length === 0 ? (
        <div>
          <Text>Something has gone wrong. Please Try again later</Text>
        </div>
      ) : (
        <section>
          <PayoutsForm
            hideModal={hideCreateModal}
            showSuccessModal={showSuccessModal}
            countries={countriesCurrency}
            banksByCountryId={banksByCountryId}
          />
        </section>
      )}
    </Modal>
  )
}

export default CreateBankDetails
