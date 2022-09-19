import { Button, Form, Input, Modal, Select } from "antd";
import Image from "next/image";
import {
  ProductHeaderLogo,
  CopyLink,
  _copyToClipboard,
  transformToFormData,
} from "utils";

import { Button as CButton, Select as CSelect } from "components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  PublishProduct,
  UnPublishProduct,
  LinkCopy,
  MobileBackArrow,
} from "utils";
import styles from "./PreviewHeader.module.scss";
import CloseIcon from "components/affiliates/CloseIcon";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { PublishProducts, Logout } from "redux/actions";
import Link from "next/link";
import useCurrency from "hooks/useCurrency";

import * as ROUTES from "routes";

export default function PreviewHeader({ id, showNavLinks = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isResponse, setIsResponse] = useState(false);
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const { product, loading } = useSelector((state) => state.product);
  const [domainLink, setDomainLink] = useState("");
  const { store } = useSelector((state) => state.store);
  const { Option } = Select;
  const router = useRouter();
  const publishProduct = PublishProducts();

  const storeName = store?.store_details?.store_name;

  const { allowedCurrencies: currencyOptions, loading: currencyLoading } =
    useCurrency();

  const logout = Logout();
  const handleSubmit = (data) => {
    publishProduct(
      data,
      () => {
        setIsOpen(false);
        setIsResponse(true);
      },
      () => {
        setIsOpen(false);
        setIsError(true);
      }
    );
  };

  const initialValues = {
    product_id: "",
    publish: "live",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validateOnChange: false,
  });

  const { setFieldValue, values } = formik;
  const productId = product?.product_details?.kreasell_product_id;
  console.log("product = ", product);
  //   console.log("product", product);
  useEffect(() => {
    setTitle(product?.product_details?.product_name);
    // setLink(`http://dev.kreatesell.com/checkout/${productId}`)
    // setLink(`http://dev.kreatesell.com/store/${productId}`);
    // * try this

    setLink(
      `http://dev.kreatesell.com/store/${storeName}/product/${productId}`
    );
  }, [product, productId, storeName]);

  useEffect(() => {
    if (Object.keys(product).length > 0) {
      setFieldValue("product_id", product?.product_details?.id);
    }
  }, [product]);

  useEffect(() => {
    if (Object.keys(store).length > 0) {
      const { domain_details } = store.domain_details;
      setDomainLink(domain_details[0].domain_url);
    }
  }, [store]);

  return (
    <header className="flex items-center justify-between bg-white px-10 py-6 ">
      <div className={`${styles.lgLeft} flex items-center`}>
        <div className="flex">
          <Image src={ProductHeaderLogo} alt="logo" />
        </div>
        <div
          onClick={() => router.back()}
          className="inline-flex ml-8 mr-10 justify-start cursor-pointer items-center"
        >
          <Image alt="" src={ArrowLeft} />
          <h3 className="uppercase text-blue-600 font-semibold text-base mb-0 ml-3">
            Back
          </h3>
        </div>
        <p className="mb-0 capitalize">{title}</p>
      </div>

      {/* // * Mobile  */}
      <div className={styles.mobileLeft}>
        <Image
          src={MobileBackArrow}
          alt="back arrow"
          onClick={() => router.back()}
        />
        <p className="mb-0 capitalize">{title}</p>
        <div className={styles.btns}>
          <Button
            className={styles.btnOne}
            type="default"
            icon={<Image src={CopyLink} alt="copy" />}
            onClick={() => _copyToClipboard(link, "Product Link Copied")}
          />
          <Button type="primary" onClick={() => setIsOpen(true)}>
            Publish
          </Button>
        </div>
      </div>
      {showNavLinks ? (
        <div className={styles.miniSaveButtons + " flex self-end"}>
          <Button
            type="default"
            icon={<Image src={CopyLink} alt="copy" />}
            onClick={() => _copyToClipboard(link, "Product Link Copied")}
          >
            Copy Link
          </Button>
          <Button
            onClick={() => router.push(ROUTES.ALL_PRODUCTS)}
            type="primary"
          >
            Exit Preview
          </Button>
          <Button type="primary" onClick={() => setIsOpen(true)}>
            Publish
          </Button>
        </div>
      ) : (
        <div className="flex justify-end">
          <div className="w-20  mr-4">
            <CSelect
              options={[
                // ...[{ label: 'Select currency', value: '' }],
                ...currencyOptions,
              ]}
              border="none"
              loading={currencyLoading}
              defaultValue={"NGN"}
            />
          </div>
          <div onClick={() => logout()}>
            <CButton text="logout" bgColor="blue" />
          </div>
        </div>
      )}
      {isOpen && (
        <Modal
          title={null}
          footer={null}
          visible={isOpen}
          onCancel={() => setIsOpen(false)}
          // maskClosable={false}
          closeIcon={<CloseIcon />}
          // className={styles.affiliate__modal}
        >
          <div className={styles.publishModal + " p-5"}>
            <h2 className="mb-4 text-lg font-semibold">Publish</h2>
            <Form layout="vertical" onFinish={formik.handleSubmit}>
              <Form.Item
                label={
                  <h2 className="font-semibold text-sm mb-0">Product Link</h2>
                }
              >
                <div className={styles.copyInput + " flex"}>
                  <Input
                    readOnly
                    bordered
                    className="rounded-lg"
                    placeholder={`${domainLink}/${id}`}
                  />
                  <span
                    onClick={() =>
                      _copyToClipboard(
                        `${domainLink}/${values.product_id}`,
                        "Product Link Copied"
                      )
                    }
                    className="cursor-pointer"
                  >
                    <Image src={LinkCopy} alt="copy" />
                  </span>
                </div>
              </Form.Item>
              <Form.Item
                label={
                  <h2 className="font-semibold text-sm mb-0">Domain name</h2>
                }
              >
                <Select defaultValue={domainLink}>
                  <Option value={domainLink}>{domainLink}</Option>
                </Select>
              </Form.Item>
              <p style={{ marginTop: "-10px" }} className="text-xs font-normal">
                Will you like to customize your domain? You can do that{" "}
                <Link href="/account/kreator/settings">here</Link>{" "}
              </p>
              <div className={styles.submitBtn}>
                <Button loading={loading} type="primary" htmlType="submit">
                  Publish
                </Button>
              </div>
            </Form>
          </div>
        </Modal>
      )}
      {isResponse && (
        <Modal
          title={null}
          footer={null}
          visible={isResponse}
          onCancel={() => {
            setIsResponse(false);
            router.push("/account/kreator/products/all");
          }}
          closable={false}
        >
          <div className={styles.publishModal + " p-5"}>
            <div className="flex flex-col">
              <div className={styles.publishImage + " mx-auto"}>
                <Image layout="fill" src={PublishProduct} alt="publish" />
              </div>
              <h1 className="text-2xl text-center my-3 font-bold">
                {"You've Successfully Published a Product"}
              </h1>
              <p className="text-sm text-center my-2 font-normal">
                {
                  "Congratulations! Your digital product is now live. You can now start earning massively from it."
                }
              </p>
              <div className={styles.submitBtn}>
                <Button
                  onClick={() => router.push("/account/kreator/products/all")}
                  className="text-lg h-12"
                  type={"primary"}
                >
                  {"See Product Listing"}
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {isError && (
        <Modal
          title={null}
          footer={null}
          visible={isError}
          onCancel={() => setIsError(false)}
          closable={false}
        >
          <div className={styles.publishModal + " p-5"}>
            <div className="flex flex-col">
              <div className={styles.publishImage + " mx-auto"}>
                <Image layout="fill" src={UnPublishProduct} alt="publish" />
              </div>
              <h1 className="text-2xl text-center my-3 font-bold">
                {"Publishing Failed"}
              </h1>
              <p className="text-sm text-center my-2 font-normal">
                {
                  "Oops! We encountered a problem while publishing your product. Please, try again."
                }
              </p>
              <div className={styles.failedBtn}>
                <Button
                  loading={loading}
                  onClick={() => formik.handleSubmit()}
                  className="text-lg h-12"
                  type={"danger"}
                >
                  {"Try Again"}
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </header>
  );
}
