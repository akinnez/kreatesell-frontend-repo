import useSWR, {mutate} from 'swr';
import {ChargeBackTable} from 'components/ChargebackComponents/ChargeBackTable';
import {ChargeBackHeader} from 'components/ChargebackComponents/ChargeBackHeader';
import AcceptChargebackDialog from 'components/ChargebackComponents/AcceptChargebackDialog';
import {checkExpiredUserToken, getUserToken, showToast} from 'utils';
import AuthLayout from 'components/authlayout';
import styles from 'public/css/Chargebacks.module.scss';
import {Pagination} from 'antd';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ChargeBackCard} from 'components/ChargebackComponents/ChargeBackCard';
import axios from 'axios';
import {setNavbarTitle} from '../../../../redux/actions';
import CustomLoader from 'components/loader';
import CustomErrorPage from 'components/CustomErrorPage/CustomErrorPage';
import ChargeBackCenter from 'components/ChargebackComponents/ChargeBackCenter';
import ChargeBackTabs from 'components/ChargebackComponents/ChargeBackTabs';
import {AiOutlineDownload} from 'react-icons/ai';
import Loader from 'components/loader';

const ChargeBacks = (props) => {
	const dispatch = useDispatch();

	const [chargebacksList, setChargebacksList] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [hasFiltered, setHasFiltered] = useState(false);
	const [filterdList, setFilterdList] = useState([]);
	const [page, setPage] = useState(1);
	const [productName, setProductName] = useState('');
	const [startDate, setStartDate] = useState('');
	const [productStatusId, setProductStatusId] = useState('');
	const [endDate, setEndDate] = useState('');
	const [active, setActive] = useState('all');
	const [visible, setVisible] = useState(false);
	const [submittingDeactivate, setSubmittingDeactivate] = useState(false);
	const [status, setStatus] = useState('');
	const [selectedChargeback, setSelectedChargeback] = useState('');

	//   useEffect(() => {
	//     dispatch(setNavbarTitle("CHARGEBACKS"));
	//   }, [dispatch]);

	const url = `${process.env.BASE_URL}v1/kreatesell/store/fetch/chargebacks/all?page=${page}`;
	const pendingURL = `${process.env.BASE_URL}v1/kreatesell/store/fetch/chargebacks/all?status=pending`;

	//   const filterURL = `${
	//     process.env.BASE_URL
	//   }admin/ChargeBack/GetStatus?page=${page}${status && `&status=${status}`}`;

	const acceptURL = `${process.env.BASE_URL}v1/kreatesell/store/chargeback/accept-deny`;

	const fetcher = () => {
		checkExpiredUserToken();
		const token = getUserToken();
		return axios
			.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log('rrrrrrrrrrrrr', res?.data);
				setChargebacksList(res?.data?.data);
				return res?.data?.data;
			})
			.catch((err) => {
				console.log('err', err);
				showToast(err?.message, 'error');
				return err;
			});
	};

	//   useEffect(() => {
	//     fetcher();
	//   }, []);

	const handleAcceptChargeback = () => {
		checkExpiredUserToken();
		const token = getUserToken();
		console.log('clicked');
		setVisible(false);
		// setSubmittingDeactivate(true);

		// const formData = new FormData();

		// formData.append("chargeBackId", selectedChargeback?.id);
		// return axios
		//   .post(acceptURL, formData, {
		//     headers: {
		//       Authorization: `Bearer ${token}`,
		//     },
		//   })
		//   .then((res) => {
		//     showToast("Chargeback have been Accepted", "success");
		//     setVisible(false);
		//     setSelectedChargeback("");
		//     setSubmittingDeactivate(false);
		//   })
		//   .catch((err) => {
		//     console.log("err", err);
		//     setSubmittingDeactivate(false);
		//     showToast(err?.message, "error");
		//     return err;
		//   });
	};

	const handleFiterSubmit = (value) => {
		console.log(value);
	};

	const fetchStats = () => {
		const token = getUserToken();
		return axios
			.get(`${process.env.BASE_URL}admin/ChargeBack/Statistics`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => res.data)
			.catch((err) => {
				console.log('err', err);
				return err;
			});
	};

	const fetchPendingChargebacks = () => {
		checkExpiredUserToken();
		const token = getUserToken();
		return axios
			.get(pendingURL, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => res.data?.data)
			.catch((err) => {
				console.log('err', err);
				return err;
			});
	};

	const handleOpenChargebackDialog = (selected) => {
		setSelectedChargeback(selected);
		setVisible(true);
	};

	const handleDownloadCSV = () => {
		if (process.browser && chargebacksList?.length > 0) {
			let augUserList = [
				[
					'id',
					'Payment Reference',
					"Customer's Email",
					'Product',
					'Amount',
					'Transaction Date',
					'Chargeback Due Date',
					'Status',
				],
				...chargebacksList.map((item) => [
					item?.id,
					item?.payment_reference,
					item?.customer_email,
					item?.product,
					item?.amount,
					item?.transaction_date,
					item?.due_date,
					item?.status,
				]),
			];
			let csvContent =
				'data:text/csv;charset=utf-8,' +
				augUserList.map((e) => e.join(',')).join('\n');
			let encodedUri = encodeURI(csvContent);
			window.open(encodedUri);
		}
	};
	const handleFailure = () => setVisible(false);

	const {data: pendingData, error: pendingDataError} = useSWR(
		pendingURL,
		fetchPendingChargebacks
	);

	const {data, error} = useSWR(url, fetcher);

	const handlePaginationChange = (newPage) => {
		setPage(newPage);
	};
	if (error)
		return <CustomErrorPage message={error?.response?.data?.message} />;

	if (!data) return <CustomLoader />;
	//   console.log("ddd", data?.data);
	return (
		<AuthLayout>
			<AcceptChargebackDialog
				visible={visible}
				handleSuccess={handleAcceptChargeback}
				handleFailure={handleFailure}
				submittingDeactivate={submittingDeactivate}
			/>
			<div className={styles.allProduct}>
				<ChargeBackHeader
					handleSearchInput={(e) => setProductName(e.target.value)}
					handleSearchSubmit={() => handleSearchSubmit()}
					handleStartDate={(e) => setStartDate(e.target.value)}
					handleEndDate={(e) => setEndDate(e.target.value)}
					productStatusOptions={true}
					handleProductStatus={(e) => setProductStatusId(e)}
				/>
				{/* {statsData?.data && (
          <ChargeBackCard
            pending={statsData?.data?.pending}
            won={statsData?.data?.won}
            lost={statsData?.data?.lost}
            declined={statsData?.data?.declined}
          />
        )} */}

				<ChargeBackCard pending={20} won={14} lost={5} declined={9} />

				<br />
				<ChargeBackCenter
					chargebacks={pendingData}
					handleOpenChargebackDialog={handleOpenChargebackDialog}
					handleCloseChangebackDialog={handleFailure}
				/>
				<br />
				<ChargeBackTabs
					status={status}
					active={active}
					setActive={setStatus}
					handleFiterSubmit={handleFiterSubmit}
				/>
				<div className={styles.dataTop}>
					<div
						className={styles.downloadDIv}
						onClick={() => handleDownloadCSV()}
					>
						Export Data in CSV
						<AiOutlineDownload className={styles.downloadIcon} />
					</div>
				</div>
				{<ChargeBackTable data={data} isFetching={isFetching} />}
				<br />
				{data?.length > 0 && (
					<div className="py-8 lg:pt-0">
						<Pagination
							defaultCurrent={1}
							onChange={handlePaginationChange}
							current={page}
							total={data?.total_records}
							defaultPageSize={10}
						/>
					</div>
				)}
			</div>
		</AuthLayout>
	);
};

export default ChargeBacks;
