import {
  Button,
  AllProductsTableHeader,
  CouponHeader,
  emptyComponent,
} from "components";

import { DownloadIcon } from "utils";
import AuthLayout from "../../../../components/authlayout";
import styles from "../../../../public/css/AllProducts.module.scss";
import Image from "next/image";
import { Table } from "antd";
import { useRouter } from "next/router";
import {
  GetProducts,
  GetProductStatus,
  SetProductID,
  SetProductDefault,
} from "redux/actions";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const router = useRouter();
  const getProducts = GetProducts();
  const getProductStatus = GetProductStatus();
  const setProductId = SetProductID();
  const setProductDefault = SetProductDefault();
  const { products, loading, productPagination, productStatus } = useSelector(
    state => state.product
  );
  const { store } = useSelector(state => state.store);

  const { page, total_records, limit } = productPagination;

  const [productData, setProductData] = useState([]);
  const [productName, setProductName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [productStatusId, setProductStatusId] = useState("");
  const [endDate, setEndDate] = useState("");
  const [domainLink, setDomainLink] = useState("");

  const productStatusOptions = productStatus?.map(item => ({
    value: item.id,
    label: item.status_name,
  }));

  const memoisedProductData = useMemo(
    () =>
      productData
        ?.sort((a, b) =>
          a.product_details?.date_created < b.product_details?.date_created
            ? 1
            : -1
        )
        ?.map((item, i) => ({
          ...item,
          key: i + 1,
          product_image: item?.product_images
            .filter(images => images.file_type !== 4)
            .map(item => {
              const arr = item.filename.split(",");
              return [...arr];
            })[0],
          product_name: item?.product_details?.product_name,
          product_type: item?.product_details?.product_type?.product_type_name,
          date_created: item?.product_details?.date_created,
          status: item?.product_details?.status,
          price: {
            currency: item.default_currency
              ? item.default_currency
              : item.product_currencies[0]?.currency_short_name,
            productPrice: item?.default_price,
          },
          actions: {
            product_details: {
              id: item?.product_details?.id,
              kreasell_product_id: item?.product_details?.kreasell_product_id,
              product_name: item?.product_details?.product_name,
              product_link: `${domainLink}/${item?.product_details?.kreasell_product_id}`,
            },
          },
        })),
    [domainLink, productData]
  );

  useEffect(() => {
    getProducts();
    getProductStatus();
  }, []);

  useEffect(() => {
    setProductData(products);
  }, [products]);

  useEffect(() => {
    if (Object.keys(store).length > 0) {
      const { domain_details } = store.domain_details;
      setDomainLink(domain_details[0].domain_url);
    }
  }, [store]);
  const handleSearchSubmit = () => {
    getProducts(1, productName, startDate, endDate, () => console.log("done"));
    console.log(productName, startDate, endDate);
  };
  const handlePaginationChange = page => getProducts(page);

  const tableLocale = {
    emptyText: emptyComponent("No record yet"),
  };
  return (
    <AuthLayout>
      <div className={styles.allProduct + " pb-10"}>
        <div className="flex justify-between mb-4">
          <h3 className=" font-semibold text-2xl">All Products</h3>
          <Button
            text="+ Add a Product"
            bgColor="blue"
            className={styles.addCouponBtn1 + " pr-2 pl-2"}
            onClick={() => {
              setProductId("");
              setProductDefault();
              console.log("settes");
              router.push("/account/kreator/products/create");
            }}
          />
        </div>
        <CouponHeader
          handleSearchInput={e => setProductName(e.target.value)}
          handleSearchSubmit={() => handleSearchSubmit()}
          handleStartDate={(e, string) => {
            console.log(string);
            setStartDate(string);
          }}
          handleEndDate={(e, string) => setEndDate(string)}
          // productStatusOptions={productStatusOptions}
          // handleProductStatus={(e) => setProductStatusId(e)}
        />

        <div className="flex justify-end items-center pt-3 mr-10">
          <div className="flex justify-end items-center cursor-pointer">
            <div className="text-primary-blue  font-semibold text-xs pr-2">
              Export Data in CSV
            </div>
            <Image alt="" src={DownloadIcon} />
          </div>
        </div>

        <div className="hidden lg:block mt-8">
          <Table
            columns={AllProductsTableHeader}
            locale={tableLocale}
            loading={loading}
            dataSource={memoisedProductData}
            pagination={{
              position: ["none", "bottomLeft"],
              total: total_records,
              defaultCurrent: 1,
              onChange: handlePaginationChange,
              current: page,
              defaultPageSize: limit,
            }}
            size="large"
          />
        </div>
        {productData.length <= 0 && (
          <div className="flex flex-col mt-10 items-center">
            <h2
              className={
                styles.lightGrey + " font-semibold text-center text-base"
              }
            >
              Almost there, now click the button to add your product.
            </h2>
            <Button
              leftIcon="+"
              text="Add a Product"
              bgColor="blue"
              className={styles.addCouponBtn + " mt-2"}
              onClick={() => {
                setProductId("");
                setProductDefault();
                router.push("/account/kreator/products/create");
              }}
            />
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default AllProducts;
