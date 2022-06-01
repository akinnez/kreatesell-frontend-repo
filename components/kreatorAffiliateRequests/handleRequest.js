import { Modal } from "antd";
import { showToast } from "utils";
import axiosAPI from "utils/axios";

const handleRequest = (record, updateStatus) => {
  return ({ status, title, content, okButtonProps = {} }) => {
    const data = {
      request_status: status,
      request_id: record.id,
      product_id: record.product_id,
      affiliate_id: record.affiliate_id,
    };

    const statuses = {
      approve: "Approved",
      decline: "Declined",
      revoke: "Revoked",
    };

    Modal.confirm({
      title: `${title} ${record.affiliate_name}`,
      content: content,
      okText: title,
      okType: "primary",
      okButtonProps,
      onOk: () => {
        return axiosAPI.request(
          "post",
          `${process.env.BASE_URL}v1/kreatesell/product/permit/affiliates`,
          res => {
            showToast(res.message, "success");
            updateStatus(record.id, statuses[status]);
          },
          err => {
            showToast(err.message, "error");
          },
          data
        );
      },
    });
  };
};

export default handleRequest;
