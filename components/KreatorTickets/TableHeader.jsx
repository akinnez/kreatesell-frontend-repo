import {
  MailClipboard,
  _copyToClipboard,
  DeactvateProduct,
  DeleteProduct,
  DuplicateProduct,
  EditProduct,
  ManageProduct,
  ViewSales,
  MobileIcon,
} from "utils";
import styles from "../../public/css/AllProducts.module.scss";
import Image from "next/image";
import { useState } from "react";
import { Modal } from "antd";
import { Button } from "components";
import { useRouter } from "next/router";
import { format, parseISO } from "date-fns";
import {
  DuplicateProductAction,
  GetProducts,
  CreateProduct,
  SetProductID,
  SetProductTab,
} from "redux/actions";
import { useSelector } from "react-redux";

const ModalPrompt = ({ handleCancel, onOk, modalText, productName }) => {
  const { loading } = useSelector((state) => state.product);

  return (
    <div className={`py-4 ${styles.modalPrompt}`}>
      <div className="text-base-gray text-sm">
        Are you sure you want to {modalText} <br />{" "}
        <span className="font-normal text-base text-black">{productName}?</span>
      </div>
      <p className="text-base-gray-200 text-sm py-4">
        You can not undo this action
      </p>

      <div className="">
        <Button
          text="Cancel"
          className={styles.cancelBtn}
          onClick={handleCancel}
        />

        <Button
          text={modalText}
          className={styles.deleteBtn}
          onClick={onOk}
          loading={loading}
        />
      </div>
    </div>
  );
};

const StatusComponent = ({ item }) => {
  const statusList = {
    1: "Draft",
    2: "Live",
    3: "Deactivated",
    4: "Flagged",
    5: "Revoked",
  };

  const statusTextList = {
    1: "You need to complete the editing of this product before it is published.",
    2: "Your product will go live and visible to audience for purchase once you complete creating the sales page.",
    3: " No one can see this product. You may reactivate it anytime you like.",
    4: "Product draws our attention and it's temporarily deactivated; Might be restored if it passes our assessment.",
    5: " Product violated copyright terms and has been removed permanently.",
  };

  const status = statusList[item]?.toLowerCase();
  const statusText = statusTextList[item];

  return (
    <div>
      <div className={`status-${status} ${styles.tooltip}`}>
        {status}
        <span className={styles.tooltiptext}>{statusText}</span>
      </div>
    </div>
  );
};

const ActionComponent = ({ item, showAction }) => {
  const router = useRouter();
  const duplicateProduct = DuplicateProductAction();
  const getProducts = GetProducts();
  const createEditDeleteProduct = CreateProduct();
  const setProductID = SetProductID();
  const setProductTab = SetProductTab();

  const id = item?.product_details?.id;
  const kreasell_product_id = item?.product_details?.kreasell_product_id;
  const productName = item?.product_details?.product_name;

  const [menu, setMenu] = useState(false);

  const [modalVisible, setVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  const showModal = (text) => {
    setVisible(true);
    setModalText(text);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  /**Used to delete and deactivate product */
  const handleModalOk = () => {
    createEditDeleteProduct({ product_id: id, action: "d" }, () => {
      getProducts();
    });
  };

  return (
    <div className="relative" key={id}>
      <div
        className="hidden lg:block cursor-pointer pl-4"
        onClick={() =>
          menu || typeof menu === "undefined" ? setMenu(false) : setMenu(true)
        }
      >
        ...
      </div>

      <div
        className={` ${styles.action} ${
          menu || showAction ? "visible" : "hidden"
        }`}
      >
        <ul>
          <li
            onClick={() => {
              setProductID(kreasell_product_id);
              router.push("/account/kreator/products/create");
              setProductTab(0);
            }}
          >
            <span>
              <Image src={EditProduct} />
            </span>
            <p>Edit</p>
          </li>

          <li>
            <span>
              <Image src={ManageProduct} />
            </span>
            <p>Manage Product</p>
          </li>

          <li>
            <span>
              <Image src={ViewSales} />
            </span>
            <p>View Sales</p>
          </li>

          <li onClick={() => duplicateProduct(id, () => getProducts())}>
            <span>
              <Image src={DuplicateProduct} />
            </span>
            <p>Duplicate</p>
          </li>

          <li onClick={() => showModal("deactivate")}>
            <span>
              <Image src={DeactvateProduct} />
            </span>
            <p>Deactivate (Unpublish)</p>
          </li>

          <li onClick={() => showModal("delete")}>
            <span>
              <Image src={DeleteProduct} />
            </span>
            <p>Delete</p>
          </li>
        </ul>
      </div>

      <Modal
        title=""
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleCancel}
        footer=""
        closable={false}
        className={styles.modalContainer}
        width="312"
      >
        <ModalPrompt
          handleCancel={handleCancel}
          onOk={handleModalOk}
          modalText={modalText}
          productName={productName}
        />
      </Modal>
    </div>
  );
};

export const AllProductsTableHeader = [
  {
    title: "Product Link",
    key: "product_link",
    component: ({ item }) => (
      <div className="">
        <a
          href={item}
          target="_blank"
          rel="noopener noreferrer"
          className="productTooltip"
        >
          {item?.slice(0, 30)}...
          <div className="tooltipText flex justify-between items-center">
            <span className="text-black-100">Go to link: </span>
            <span
              href={item}
              target="_blank"
              className="pl-2 pr-4"
              rel="noopener noreferrer"
            >
              {item}
            </span>
            <span
              className="bg-primary-blue h-10 w-12 flex justify-center rounded-r-lg ml-4 px-1"
              onClick={() => _copyToClipboard(item, "Product Link Copied")}
            >
              <Image src={MailClipboard} />
            </span>
          </div>
        </a>
      </div>
    ),
  },
];
