import Tags from 'components/Tags';

const HistoryTag = ({status}) => (
	<>
		{status === 'Successful' ? (
			<Tags color="green">{status}</Tags>
		) : status === 'Pending' ? (
			<Tags color="orange">{status}</Tags>
		) : status === 'Failed' ? (
			<Tags color="red">{status}</Tags>
		) : (
			<Tags>{status}</Tags>
		)}
	</>
);

export default HistoryTag;
