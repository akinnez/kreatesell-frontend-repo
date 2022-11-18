import React, {useState, useEffect} from 'react';
import AuthLayout from '../../../../../components/authlayout';
import {Card, Row, Col} from 'antd';
import style from '../../../../../public/css/OpenTicket.module.scss';
import Image from 'next/image';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import {IoMdAdd} from 'react-icons/io';
import {Button} from 'components/button/Button';
import axios from 'axios';
import BackButton from 'components/BackButton';

const OpenTicket = ({}) => {
	const department = [
		{
			id: '12',
			name: 'Technical',
			icon: 'technical.svg',
		},
		{
			id: '123',
			name: 'Affiliates',
			icon: 'Affiliates.svg',
		},
		{
			id: '124',
			name: 'Billing',
			icon: 'Billing.svg',
		},
		{
			id: '1254',
			name: 'General',
			icon: 'testimg.png',
		},
	];
	const router = useRouter();

	return (
		<>
			<AuthLayout>
				<div className="mb-10">
					<BackButton />
				</div>
				<div className={style.openTicketTop}>
					<h3 className={style.header}>Open Ticket</h3>
					<p className={`mb-10`}>
						This helps the assigned support team to quickly and
						efficiently attend to you without any mix up.
					</p>
				</div>
				<div>
					<Row gutter={[30, 20]}>
						{department &&
							department?.length > 0 &&
							department?.map((dept) => (
								<Col
									xs={{span: 24}}
									md={{span: 12}}
									lg={{span: 6}}
									xl={{span: 6}}
									key={dept.id}
								>
									<Card
										bordered={false}
										className={`flex justify-center ${style.card}`}
									>
										<h4 className={style.title}>
											{dept.name}
										</h4>
										<Image
											src={`/images/${dept.icon}`}
											alt="departments"
											width={250}
											height={200}
										/>
										<br />
										<Button
											className={style.openTicketBtn}
											type="button"
											text="Open Ticket"
											leftIcon={
												<IoMdAdd
													className={style.iconStyle}
												/>
											}
											onClick={() =>
												router.push({
													pathname:
														'/account/kreator/help/open-ticket/[department]',
													query: {
														department: dept.name,
													},
												})
											}
										/>
									</Card>
								</Col>
							))}
					</Row>
				</div>
			</AuthLayout>
		</>
	);
};

export default OpenTicket;

export async function getStaticProps() {
	let result = {};
	try {
		result = await axios.get(`${process.env.BASE_URL}admin/DepartmentList`);
	} catch (err) {
		console.log('err', err);
	}

	return {
		props: {
			department: result?.data?.data ? result?.data?.data : [],
		},
	};
}
