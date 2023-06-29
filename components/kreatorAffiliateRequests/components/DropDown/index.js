import Image from 'next/image';
import {Dropdown, Button, Menu} from 'antd';
import {BsThreeDots} from 'react-icons/bs';
import ApproveImg from 'public/images/approve_icon.png';
import DeclineImg from 'public/images/decline_icon.png';
import RevokeImg from 'public/images/revoke_icon.png';
import ReportImg from 'public/images/report_icon.png';
import styles from './index.module.scss';
import {RenderIf} from 'utils';

const menu = ({
	status,
	showActionModal,
	showReportModal,
	affiliateId,
	...props
}) => {
	const handler = (requestStatus, title) => {
		showActionModal({status: requestStatus, title, ...props});
	};
	return (
		<Menu className={styles.menu}>
			<RenderIf condition={['Pending', 'Declined'].includes(status)}>
				<Menu.Item
					key={1}
					onClick={() => handler('approve', 'Approve')}
					// disabled={status === 'Approved' || status === 'Revoked'}
					disabled={status === 'Revoked'}
				>
					<span className={styles.image__wrapper}>
						<Image src={ApproveImg} alt="Approve Icon" />
					</span>
					Approve
				</Menu.Item>
			</RenderIf>
			<RenderIf condition={status === 'Pending'}>
				<Menu.Item
					key={2}
					onClick={() => handler('decline', 'Decline')}
					disabled={status === 'Declined' || status === 'Revoked'}
				>
					<span className={styles.image__wrapper}>
						<Image src={DeclineImg} alt="Decline Icon" />
					</span>
					Decline
				</Menu.Item>
			</RenderIf>
			<RenderIf condition={['Approved', 'Declined'].includes(status)}>
				<Menu.Item
					key={3}
					onClick={() => handler('revoke', 'Revoke')}
					disabled={status === 'Revoked'}
				>
					<span className={styles.image__wrapper}>
						<Image src={RevokeImg} alt="Revoke Icon" />
					</span>
					Revoke
				</Menu.Item>
			</RenderIf>
			<RenderIf
				condition={[
					'Approved',
					'Declined',
					'Revoked',
					'Pending',
				].includes(status)}
			>
				<Menu.Item
					key={3}
					onClick={() => showReportModal(affiliateId)}
					// disabled={status === 'Revoked'}
				>
					<span className={styles.image__wrapper}>
						<Image src={ReportImg} alt="Report Icon" />
					</span>
					Report Affiliate
				</Menu.Item>
			</RenderIf>
		</Menu>
	);
};

const DropDown = (props) => (
	<Dropdown
		overlay={menu(props)}
		placement="bottomRight"
		trigger={['click', 'hover']}
		arrow
	>
		<Button
			className={styles.btn}
			type="text"
			shape="circle"
			icon={<BsThreeDots />}
		/>
	</Dropdown>
);

export default DropDown;
