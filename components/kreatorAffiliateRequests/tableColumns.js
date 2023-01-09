import DropDown from './components/DropDown';
import PopOver from './components/PopOver';
import RequestStatus from './components/RequestStatus';
import RequestNotesButton from './components/RequestNotesButton';
import {dateString} from 'utils/dateFormat';
import formatNumber from 'utils/formatNumber';

const tableColumns = (showReportModal, showActionModal, showNoteModal) => [
	{
		title: 'Affiliate',
		render: (record) => (
			<PopOver
				affiliateReported={record.affiliate_reported}
				affiliateProfileImage={record.affiliate_profile_image}
				affiliateName={record.affiliate_name}
				affiliateUniqueUsername={record.affiliate_unique_username}
				affiliateCountry={record.affiliate_country}
				affiliateId={record.affiliate_id}
				showReportModal={showReportModal}
			/>
		),
	},
	{
		title: 'Product',
		dataIndex: 'product_name',
	},
	{
		title: 'Product Type',
		dataIndex: 'product_type',
	},
	{
		title: 'Request Date',
		dataIndex: 'request_date',
		render: (dateStr) => dateString(dateStr),
	},
	{
		title: 'No of Sales',
		dataIndex: 'number_of_sales',
		render: (sales) => formatNumber(sales),
	},
	{
		title: 'Notes',
		render: (record) => (
			<RequestNotesButton
				notes={record.notes}
				noteFlag={record.note_flag}
				showNoteModal={showNoteModal}
			/>
		),
	},
	{
		title: 'Status',
		dataIndex: 'status',
		render: (status) => <RequestStatus status={status} />,
	},
	{
		title: 'Request Action',
		render: (record) => (
			<DropDown
				status={record.status}
				requestId={record.id}
				affiliate={record.affiliate_name}
				affiliateId={record.affiliate_id}
				product={record.product_name}
				productId={record.product_id}
				showActionModal={showActionModal}
				{...{record}}
			/>
		),
		width: '140px',
	},
];

export default tableColumns;
