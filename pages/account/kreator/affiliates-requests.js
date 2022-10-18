import {useState} from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import AuthLayout from 'components/authlayout';
import SuccessModalBox from 'components/SuccessModalBox';
import AffiliateNote from 'components/kreatorAffiliateRequests/components/AffiliateNote';
import ReportAffiliate from 'components/kreatorAffiliateRequests/components/ReportAffiliate';
import ActionModal from 'components/kreatorAffiliateRequests/components/ActionModal';
import PageLayout from 'components/kreatorAffiliateRequests/components/PageLayout';
import SuccessMessage from 'components/kreatorAffiliateRequests/components/SuccessMessage';
import useFilters from 'components/kreatorAffiliateRequests/useFilters';
import axiosAPI from 'utils/axios';
import dataLoading from 'utils/dataLoading';
import {showToast} from 'utils';

const AffiliateRequests = () => {
	const [loading, setLoading] = useState(false);
	const [requests, setRequests] = useState({data: [], total: 0});
	const [successModal, setSuccessModal] = useState(false);
	const [noteModal, setNoteModal] = useState({visible: false, note: null});
	const [reportModal, setReportModal] = useState({visible: false, id: null});

	const [actionModal, setActionModal] = useState({
		visible: false,
		data: null,
	});

	const {url, filters, setFilters} = useFilters(
		'v1/kreatesell/product/fetch/affiliates/all'
	);

	const {
		data: response,
		error,
		isValidating,
	} = useSWR(url.href, (url) => {
		return axiosAPI.request(
			'get',
			url,
			(res) => {
				setLoading(false);
				setRequests({
					...requests,
					data: res.data.data,
					total: res.data.total_records,
				});
				return res;
			},
			(err) => {
				setLoading(false);
				showToast(err.message, 'error');
				return err;
			}
		);
	});

	const isLoading = dataLoading({
		products: requests.data,
		loading,
		response,
		error,
		isValidating,
	});

	const handleSuccess = (value) => {
		setSuccessModal(value);
	};

	const hideHandler = (setter, field) => () => {
		setter({visible: false, [field]: null});
	};

	const showHandler = (setter, field) => (value) => {
		setter({visible: true, [field]: value});
	};

	const showReportModal = showHandler(setReportModal, 'id');
	const showActionModal = showHandler(setActionModal, 'data');
	const showNoteModal = showHandler(setNoteModal, 'note');

	const updateReported = (id) => {
		const newRequests = requests.data.map((request) => {
			if (request.affiliate_id === id) {
				request.affiliate_reported = 'true';
				return request;
			}

			return request;
		});

		setRequests({...requests, data: newRequests});
	};

	const updateStatus = (id, value) => {
		const newRequests = requests.data.map((request) => {
			if (request.id === id) {
				request.status = value;
				return request;
			}

			return request;
		});

		setRequests({...requests, data: newRequests});
	};

	return (
		<AuthLayout headerTitle="REQUESTS">
			<Head>
				<title>KreateSell | Kreator&#39;s Affiliate Requests</title>
			</Head>
			<PageLayout
				requests={requests}
				isLoading={isLoading}
				setLoading={setLoading}
				filters={filters}
				setFilters={setFilters}
				showReportModal={showReportModal}
				showActionModal={showActionModal}
				showNoteModal={showNoteModal}
			/>
			{successModal && (
				<SuccessModalBox
					modalIsVisible={successModal}
					closeModal={() => handleSuccess(false)}
				>
					<SuccessMessage />
				</SuccessModalBox>
			)}
			{noteModal.visible && (
				<AffiliateNote
					noteIsVisible={noteModal.visible}
					hideNote={hideHandler(setNoteModal, 'note')}
					note={noteModal.note}
				/>
			)}
			{reportModal.visible && (
				<ReportAffiliate
					reportIsVisible={reportModal.visible}
					hideReport={hideHandler(setReportModal, 'id')}
					id={reportModal.id}
					updateReported={updateReported}
					showSuccess={() => handleSuccess(true)}
				/>
			)}
			{actionModal.visible && (
				<ActionModal
					actionIsVisible={actionModal.visible}
					hideAction={hideHandler(setActionModal, 'data')}
					updateStatus={updateStatus}
					{...actionModal.data}
				/>
			)}
		</AuthLayout>
	);
};

export default AffiliateRequests;
