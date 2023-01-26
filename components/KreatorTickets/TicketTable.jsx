import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';

import {Table, Popover, Tooltip, Card, Modal} from 'antd';

import styles from './TicketsTable.module.scss';
import {
	MessageIcon,
	OpenTicketIcon,
	CloseIcon,
	CollapseArrowRight,
	CollapseArrowDown,
	Folder,
	formatDateAndTime,
} from 'utils';
import {Button} from 'components/button/Button';

const statusComponent = (item) => {
	const statusTextList = {
		open: {
			type: 'open',
			styles: {
				background: '#F1FCF8',
				borderRadius: '.5rem',
				color: ' #2DC071',
				fontSize: '14px',
			},
			contents: '',
		},
		Closed: {
			type: 'closed',
			styles: {
				background: 'rgba(255, 77, 79, 0.1)',
				borderRadius: '.5rem',
				color: ' #F90005',
				fontSize: '14px',
			},
			contents: '',
		},
		pending: {
			type: 'pending',
			styles: {
				background: '#F1FCF8',
				borderRadius: '.5rem',
				color: ' #2DC071',
				fontSize: '14px',
			},
			contents: '',
		},
	};
	let tagStyles = statusTextList[item].styles;
	let tooltipContent = statusTextList[item].contents;
	let mainType = statusTextList[item].type;
	return (
		<>
			{tooltipContent ? (
				<Tooltip
					overlayInnerStyle={{fontSize: '10px', textAlign: 'center'}}
					overlayStyle={{
						width: '150px',
						borderRadius: '10px',
						padding: '20px 8px',
					}}
					className="text-xs"
					placement="top"
					title={tooltipContent}
				>
					<div className={styles.tags} style={tagStyles}>
						{mainType.charAt(0).toUpperCase() + mainType.slice(1)}
					</div>
				</Tooltip>
			) : (
				<>
					<div className={styles.tags} style={tagStyles}>
						{mainType.charAt(0).toUpperCase() + mainType.slice(1)}
					</div>
				</>
			)}
		</>
	);
};

const ActionComponent = (_, all) => {
	const router = useRouter();

	const handleReopenTicket = () => {
		console.log('Handle Repopen', all);
	};
	let content = (
		<ul>
			<li
				onClick={() =>
					router.push(`/account/kreator/help/responses/${all.id}`)
				}
				className="flex gap-1.5"
			>
				<Image alt="icon" src={MessageIcon} /> View Response
			</li>
			<li onClick={() => handleReopenTicket()} className="flex gap-1.5">
				<Image alt="icon" src={OpenTicketIcon} /> Reopen Ticket
			</li>
		</ul>
	);

	return (
		<Popover
			overlayStyle={{width: '150px', padding: '0'}}
			placement="bottomLeft"
			overlayClassName={styles.action2}
			content={content}
			title=""
			trigger="click"
		>
			<h2 className="font-semibold cursor-pointer text-lg">...</h2>
		</Popover>
	);
};

const tableHeader = [
	{
		title: 'Ticket ID',
		dataIndex: 'id',
		width: 100,
		fixed: 'left',
		render: (item) => <p className={styles.tableData}>{item}</p>,
	},

	{
		title: 'Subject',
		dataIndex: 'heading',
		render: (item) => <p className={styles.tableData}>{item}</p>,
	},
	{
		title: 'Department',
		dataIndex: 'department',
		render: (item) => <p className={styles.tableData}>{item}</p>,
	},
	{
		title: 'Date',
		dataIndex: 'created_at',
		width: 300,
		render: (item) => (
			<p className={styles.tableData}>{formatDateAndTime(item)}</p>
		),
	},

	{
		title: 'Status',
		dataIndex: 'status',
		render: (item) => statusComponent(item),
	},
	{
		title: 'Actions',
		dataIndex: 'actions',
		render: (item, all) => ActionComponent(item, all),
		width: 100,
		fixed: 'right',
	},
];

const CardComponent = ({data}) => {
	const [showResponseModal, setShowResponseModal] = useState(false);

	const hideResponseModal = () => setShowResponseModal(false);
	const showResponseModalFn = () => setShowResponseModal(true);
	useEffect(() => {
		return () => {
			hideResponseModal();
		};
	}, []);

	return (
		<div className={styles.cardContainer}>
			<Card className={styles.card}>
				<div
					className={`flex  items-center justify-between ${styles.statusBtnContainer}`}
				>
					<div className={styles.status}>
						{statusComponent(data.status)}
					</div>
					<div className={`flex gap-5 ${styles.actionBtns}`}>
						<div className={`flex flex-col items-center`}>
							<button className={`${styles.btn}`}>
								<Image alt="icon" src={OpenTicketIcon} />
							</button>
							<p className={`mb-0 mt-2`}>Reopen Ticket</p>
						</div>
						<div
							className={`flex flex-col items-center`}
							onClick={() => setShowResponseModal(true)}
						>
							<button className={`${styles.btn}`}>
								<Image alt="icon" src={MessageIcon} />
							</button>
							<p className={`mb-0 mt-2`}>View Response</p>
						</div>
					</div>
				</div>
				<p className={`mb-0 ${styles.date}`}>Jun 12th 2021, 3:50 PM</p>
				<ul className={styles.ticketDetails}>
					<li className={styles.ticketDetail}>
						<h1 className={`${styles.key} mb-0`}>Department</h1>
						<p className={`${styles.value} mb-0`}>
							{data.department}
						</p>
					</li>
					<li className={styles.ticketDetail}>
						<h1 className={`${styles.key} mb-0`}>Ticket ID</h1>
						<p className={`${styles.value} mb-0`}>
							#{data.ticket_id}
						</p>
					</li>
				</ul>
				<div className={`${styles.ticketSubjectContainer}`}>
					<h2 className={`${styles.ticketTitle}`}>Ticket Subject</h2>
					<div className={`${styles.ticketReason}`}>
						Login Difficulties
					</div>
				</div>
			</Card>
			{showResponseModal && (
				<SuccessModal {...{showResponseModal, hideResponseModal}} />
			)}
		</div>
	);
};

const SuccessModal = ({showResponseModal, hideResponseModal}) => {
	const [showIssue, setShowIssue] = useState(false);
	return (
		<Modal
			title={null}
			footer={null}
			visible={showResponseModal}
			onCancel={hideResponseModal}
			closeIcon={<Image alt="" src={CloseIcon} />}
			width={'90%'}
			style={{top: 180}}
		>
			<div className={`flex flex-col items-center p-10 ${styles.body}`}>
				<div className={`mb-10 ${styles.complainContainer}`}>
					<div className={`flex flex-col gap-3 items-start`}>
						<h2 className={`${styles.complain} mb-0`}>
							Login Difficulties
						</h2>
						<Button
							text="Show Message"
							icon={
								!showIssue ? (
									<Image
										src={CollapseArrowRight}
										alt="icon"
									/>
								) : (
									<Image src={CollapseArrowDown} alt="icon" />
								)
							}
							className="p-4"
							onClick={() => setShowIssue((prev) => !prev)}
						/>
					</div>
					<section
						className={`${styles.complainDescription} ${
							showIssue ? styles.block : styles.hidden
						}`}
					>
						<p className={`mt-5 ${styles.description}`}>
							I can&apos;t seem to log into my account and i can
							not share my link with customers. I would love if
							this is resolved as soon as possible.
						</p>
						<div className={`${styles.attachments} flex flex-col`}>
							Attachments (1)
							{/* files */}
							<div className={`flex gap-2 ${styles.files}`}>
								<Image src={Folder} alt="icon" />
								<p className={`mb-0 ${styles.fileName}`}>
									Yesyoucan.png
								</p>
							</div>
						</div>
					</section>
				</div>
				<div className={styles.adminResponse}>
					<h2 className={styles.title}>Admin Response</h2>
					<p className={styles.response}>
						This would be resolved shortly. My apologies for the
						inconveniences.
					</p>
					{/* border bottom here */}
					<div className={`${styles.attachments} flex flex-col`}>
						Attachments (1)
						{/* files */}
						<div className={`flex gap-4 ${styles.files}`}>
							<Image src={Folder} alt="icon" />
							<p className={`mb-0 ${styles.fileName}`}>
								Yesyoucan.png
							</p>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

const TicketTable = ({tickets, isLoading}) => {
	const router = useRouter();

	return (
		<div className={styles.ticketsContainer}>
			<div className={styles.dataSection}>
				<div className={styles.mobile__wrapper}>
					{tickets?.data?.map((ticket) => (
						<CardComponent key={ticket.id} data={ticket} />
					))}
				</div>
				<div className={styles.table__wrapper}>
					<Table
						columns={tableHeader}
						loading={isLoading}
						dataSource={tickets?.data}
						scroll={{x: 1000}}
						size="large"
						pagination={{position: ['bottomLeft']}}
					/>
				</div>
			</div>
		</div>
	);
};

export default TicketTable;
