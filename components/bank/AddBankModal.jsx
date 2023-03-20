import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';

import {Modal} from 'antd';

import CloseIcon from 'components/affiliates/CloseIcon';
import {AffilateBankSetting, KreatorBankSetting} from 'utils';
import styles from './AddBankModal.module.scss';

const AddBankModal = ({isBank, setIsBank = () => {}, closable = true}) => {
	const router = useRouter();
	return (
		<>
			<Modal
				title={null}
				footer={null}
				visible={isBank}
				onCancel={() => {
					if (closable) {
						setIsBank(false);
						router.push('all');
					}
				}}
				closable={closable}
				// maskClosable={false}
				closeIcon={<CloseIcon />}
			>
				<div className="mt-4 mx-auto w-full py-5 px-2">
					<h2 className="mb-4 text-lg text-center font-semibold">
						Set Up Bank Details
					</h2>
					<p className="text-base-gray-300 text-center text-sm">
						In order to start accepting payments from your sales as
						a Kreator or/and commissions as an Affiliate, kindly
						setup your bank account, mobile money wallet or PayPal
						address.
					</p>
					<div className="flex justify-between">
						<div
							className="border-r-2 border-gray-300"
							style={{
								width: '55%',
								height: '250px',
								position: 'relative',
							}}
						>
							<Image
								src={KreatorBankSetting}
								alt="kreator"
								layout="fill"
							/>
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
								pathname:
									'/account/sales/payouts/set-up-bank-details',
							}}
						>
							Setup Account
						</Link>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default AddBankModal;
