import { Pagination } from "antd";

const DataPagination = ({ limit, page, total, onChange }) => {
  return (
    <Pagination
      pageSize={limit}
      current={page}
      total={total}
      responsive={true}
      onChange={onChange}
    />
  );
};

export default DataPagination;
