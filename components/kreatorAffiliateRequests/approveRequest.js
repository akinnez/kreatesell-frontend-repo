import { Modal } from "antd";
import { showToast } from "utils";
import axiosAPI from "utils/axios";

const approveRequest = (record, updateRequest) => {
  const data = {
    request_status: "Approved",
    request_id: record.id,
    product_id: record.product_id,
    affiliate_id: record.affiliate_id,
    // reason_for_rejection: "string",
  };

  Modal.confirm({
    title: `Approve ${record.affiliate}`,
    content: `Are you sure you want to approve ${record.affiliate} to market ${record.product}?`,
    okText: "Approve",
    okType: "primary",
    onOk: () => {
      return axiosAPI.request(
        "post",
        `${process.env.BASE_URL}v1/kreatesell/product/permit/affiliates`,
        res => {
          showToast(res.message, "success");
          updateRequest(record.id, "Approved");
        },
        err => {
          showToast(err.message, "error");
        },
        data
      );
    },
  });
};

export default approveRequest;
