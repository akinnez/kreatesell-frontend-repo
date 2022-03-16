import { Modal } from "antd";
import { showToast } from "utils";
import axiosAPI from "utils/axios";

const declineRequest = (record, updateRequest) => {
  const data = {
    request_status: "Declined",
    request_id: record.id,
    product_id: record.product_id,
    affiliate_id: record.affiliate_id,
    // reason_for_rejection: "string",
  };

  Modal.confirm({
    title: `Decline ${record.affiliate}`,
    content: `Are you sure you want to decline ${record.affiliate_name} from marketing ${record.product_name}?`,
    okText: "Decline",
    okType: "primary",
    okButtonProps: {
      type: "danger",
    },
    onOk: () => {
      return axiosAPI.request(
        "post",
        `${process.env.BASE_URL}v1/kreatesell/product/permit/affiliates`,
        res => {
          showToast(res.message, "success");
          updateRequest(record.id, "Declined");
        },
        err => {
          showToast(err.message, "error");
        },
        data
      );
    },
  });
};

export default declineRequest;
