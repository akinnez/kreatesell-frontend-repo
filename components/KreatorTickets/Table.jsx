import {EmptyDataTable} from 'utils';
import styles from './Table.module.scss';
import Image from 'next/image';
import {IoEllipsisHorizontal} from 'react-icons/io5';
import {Popover} from 'antd';
import {useState} from 'react';
import {AiOutlineClose, AiOutlineEye} from 'react-icons/ai';
import {BsReplyFill} from 'react-icons/bs';
import moment from 'moment';

const SuccessDiv = ({text}) => {
	return (
		<div
			style={{
				background: '#4bf71625',
				borderRadius: '5px',
				width: '80px',
				textAlign: 'center',
			}}
		>
			<p style={{color: '#176300'}}>{text}</p>
		</div>
	);
};

const ErrorDiv = ({text}) => {
	return (
		<div
			style={{
				background: '#f7211622',
				borderRadius: '5px',
				width: '80px',
				textAlign: 'center',
			}}
		>
			<p style={{color: '#f5222d'}}>{text}</p>
		</div>
	);
};
const PendingDiv = ({text}) => {
	return (
		<div
			style={{
				background: '#f8cb0028',
				color: '#e9be00',
				borderRadius: '5px',
				width: '80px',
				textAlign: 'center',
			}}
		>
			<p style={{color: '#e9be00'}}>{text}</p>
		</div>
	);
};

const header = [
	{
		title: 'Ticket ID',
		key: 'ticket_id',
	},

	{
		title: 'Subject',
		key: 'subject',
	},
	{
		title: 'Department',
		key: 'department',
	},
	{
		title: 'Date',
		key: 'date_created',
	},

	{
		title: 'Status',
		key: 'status',
	},
	{
		title: 'Actions',
		key: 'actions',
	},
];
export const Table = ({data}) => {
	const [openPopOver, setOpenPopOver] = useState(false);

	const switchStatus = (value) => {
		if (value?.toLowerCase() === 'pending') {
			return <PendingDiv text="Pending" />;
		}
		if (value?.toLowerCase() === 'answered') {
			return <SuccessDiv text="Answered" />;
		}
		if (value?.toLowerCase() === 'closed') {
			return <SuccessDiv text="Closed" />;
		}

		return <ErrorDiv text="Error" />;
	};
	return (
		<div className={styles.tableContainer}>
			<table className={styles.table}>
				<thead>
					<tr>
						{header?.map((item, i) => (
							<th key={i}>{item?.title}</th>
						))}
					</tr>
				</thead>

				{Boolean(data?.length) && (
					<tbody className="t-body">
						{data?.map((item, i) => (
							<tr key={item?.id || i}>
								<td>{item.id}</td>
								<td>{item.heading}</td>
								<td>{item.department}</td>
								<td>
									{moment(item.date).format(
										'YYYY-MM-DD HH:mm:ss'
									)}
								</td>

								<td>{switchStatus(item?.status)}</td>
								<td>
									<Popover
										placement="bottomRight"
										title={null}
										content={
											<ul className={styles.popoverUl}>
												<li
													className={styles.popoverLi}
												>
													<AiOutlineEye
														className={
															styles.popoverIcon
														}
													/>
													<p>View Ticket</p>
												</li>
												<li
													className={styles.popoverLi}
												>
													<BsReplyFill
														className={
															styles.popoverIcon
														}
													/>
													<p>Reply</p>
												</li>
												<li
													className={styles.popoverLi}
												>
													<AiOutlineClose
														className={
															styles.popoverIcon
														}
													/>
													<p>Close</p>
												</li>
											</ul>
										}
										trigger="click"
									>
										{
											<IoEllipsisHorizontal
												className={styles.horizButton}
											/>
										}
									</Popover>
								</td>
							</tr>
						))}
					</tbody>
				)}
			</table>

			{!Boolean(data?.length) && (
				<div className="w-full h-full flex flex-col items-center justify-center p-8">
					<div>
						<Image src={EmptyDataTable} alt="empty data" />
					</div>
				</div>
			)}
		</div>
	);
};
