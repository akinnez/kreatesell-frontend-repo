import Tags from "components/Tags";

const RequestStatus = ({ status }) => (
  <>
    {status === "Approved" ? (
      <Tags color="green">{status}</Tags>
    ) : status === "Declined" ? (
      <Tags color="red">{status}</Tags>
    ) : status === "Pending" ? (
      <Tags color="orange">{status}</Tags>
    ) : (
      <Tags>{status}</Tags>
    )}
  </>
);

export default RequestStatus;
