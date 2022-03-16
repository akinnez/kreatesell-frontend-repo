import { Modal } from "antd";
import { showToast } from "utils";
import axiosAPI from "utils/axios";

const revokeRequest = (record, updateRequest) => {
  const data = {
    request_status: "Revoked",
    request_id: record.id,
    product_id: record.product_id,
    affiliate_id: record.affiliate_id,
    // reason_for_rejection: "string",
  };

  Modal.confirm({
    title: `Revoke ${record.affiliate}`,
    content: `Are you sure you want to revoke ${record.affiliate}?`,
    okText: "Revoke",
    okType: "danger",
    okButtonProps: {
      type: primary,
    },
    onOk: () => {
      return axiosAPI.request(
        "post",
        `${process.env.BASE_URL}v1/kreatesell/product/permit/affiliates`,
        res => {
          showToast(res.message, "success");
          updateRequest(record.id, "Revoked");
        },
        err => {
          showToast(err.message, "error");
        },
        data
      );
    },
  });
};

export default revokeRequest;
