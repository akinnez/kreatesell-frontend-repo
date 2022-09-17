import { Button, Select } from "components";
import Logo, { MobileLogo } from "components/authlayout/logo";
import Image from "next/image";
import { ArrowLeft, StoryTellingPNG } from "utils";
import styles from "../../public/css/product-store.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { currencyOptions } from "components/account-dashboard/partials";
import { ProtectedStoreHeader } from "components/store/storeHeader";
import { useSelector } from "react-redux";
import { FetchSingleStoreProduct, SetCheckoutDetails } from "redux/actions";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { Logout } from "redux/actions";

const StorePage = () => {
  const router = useRouter();
  const fetchSingleStoreProduct = FetchSingleStoreProduct();

  const {
    query: { storename },
  } = router;

  // console.log("storename = ", storename);
  const {
    singleStoreDetails,
    singleStoreProducts,
    singleStorePaginationDetails: pagination,
  } = useSelector((state) => state.product);

  const handlePaginationChange = (page) => {
    fetchSingleStoreProduct(storename, page);
  };

  const logout = Logout();
  useEffect(() => {
    if (storename !== undefined) {
      return fetchSingleStoreProduct(storename);
    } else if (storename === "undefined") {
      return;
    } else {
      return;
    }
  }, [storename]);

  // console.log('singleStoreProducts = ', singleStoreProducts)

  return (
    <div className={styles.container}>
      <nav className="bg-white hidden lg:flex items-center px-4 lg:px-40">
        <div className="w-1/5 hidden lg:flex justify-start">
          <Link href="/">
            <a className="">
              <Logo />
            </a>
          </Link>
        </div>

        <div className="w-4/5 flex justify-end">
          <div className="w-20 mr-4">
            <Select options={currencyOptions} border="none" />
          </div>

          <div onClick={() => logout()}>
            <Button text="logout" bgColor="blue" />
          </div>
        </div>
      </nav>

      <nav className="bg-white lg:hidden flex items-center px-4">
        <div className="w-30">
          <Link href="/">
            <a className="">
              <MobileLogo />
            </a>
          </Link>
        </div>

        <div className="w-70 flex justify-end items-center mx-auto">
          <div className={styles.select}>
            <Select options={currencyOptions} border="none" />
          </div>

          <div onClick={() => logout()}>
            <Button text="logout" bgColor="blue" />
          </div>
        </div>
      </nav>

      <div className="px-4 lg:px-40">
        <div className="flex items-center py-10">
          <div className="mr-auto cursor-pointer" onClick={() => router.back()}>
            <Image src={ArrowLeft} alt="go back" />{" "}
            <span className="pl-2 font-semibold text-primary-blue">BACK</span>
          </div>
        </div>

        <div>
          <ProtectedStoreHeader
            publicStore={true}
            publicStoreInfo={singleStoreDetails}
          />

          <div className={styles.bioData}>
            <p className="px-2 md:px-6 lg:px-32 mt-4 md:mt-16 text-base-gray-200 text-sm text-center">
              {singleStoreDetails?.bio_data}
            </p>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8 pb-20 mt-6">
          {singleStoreProducts?.map((productDetails) => {
            {
              /* console.log('productDetails = ', productDetails) */
            }
            const countrySale = productDetails?.check_out_details?.find(
              (item) =>
                item?.currency_name === "NGN" &&
                item?.price_indicator === "Selling"
            );

            const sellingPrice = countrySale?.price;
            const originalSetting = productDetails?.check_out_details?.find(
              (item) =>
                item?.currency_name === "NGN" &&
                item?.price_indicator === "Original"
            );
            // console.log("countrySale = ", countrySale);
            // console.log("sellingPrice = ", sellingPrice);
            const originalPrice = originalSetting?.price;
            return (
              <ProductCard
                productDetails={productDetails}
                key={productDetails?.id}
                sellingPrice={sellingPrice}
                originalPrice={originalPrice}
                {...{ storename }}
              />
            );
          })}
        </div>

        {pagination?.total_records > 12 && (
          <div className="py-8 lg:pt-0">
            <Pagination
              defaultCurrent={1}
              onChange={handlePaginationChange}
              current={pagination?.current_page_number}
              total={pagination?.total_records}
              defaultPageSize={12}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const ProductCard = ({
  productDetails,
  sellingPrice,
  originalPrice,
  storename,
}) => {
  const router = useRouter();
  const setCheckoutDetails = SetCheckoutDetails();

  const [imageShown, setImageShown] = useState("");

  const productImage = (index = 0) => {
    productDetails?.product_images?.[index]?.filename;
    // .replaceAll("...", "");
    // console.log("productDetails=", productDetails);
    // console.log("productImages refactored =", productImage());
  };

  const imageOne = productDetails?.product_images?.[0]?.filename;
  const imageTwo = productDetails?.product_images?.[1]?.filename;

  // console.log("productDetails=", productDetails);
  console.log("imageOne = ", imageOne?.split(",")[0]);
  console.log("contains , === ", imageOne?.includes(","));

  if (imageOne?.includes(",")) {
    setImageShown(imageOne?.split(",")[0]);
  }

  if (imageOne?.includes(",") === false) {
    setImageShown(imageOne);
  }
  // console.log(imageTwo);

  // const isOfAllowedType = (productImageUrl, type) => {
  //   return (
  //     typeof productImageUrl === "string" && productImageUrl.endsWith(type)
  //   );
  // };

  // // // console.log(isOfAllowedType(".rar"));

  // const isOfInvalidFormat = (imgUrl) => {
  //   return (
  //     !isOfAllowedType(imgUrl, ".jpg") ||
  //     !isOfAllowedType(imgUrl, ".gif") ||
  //     !isOfAllowedType(imgUrl, ".png") ||
  //     !isOfAllowedType(imgUrl, ".tiff") ||
  //     !isOfAllowedType(imgUrl, ".psd") ||
  //     !isOfAllowedType(imgUrl, ".svg")
  //   );
  // };

  // function isImage(url) {
  //   return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  // }

  // const getImageShown = (imgOne, imgTwo) => {
  //   let imageUrl = "";
  //   switch ((imgOne, imgTwo)) {
  //     case imgOne === undefined:
  //       imageUrl = imgOne;
  //     default:
  //       imageUrl = StoryTellingPNG;
  //   }
  //   return imageUrl;
  // };

  // console.log("image at index 1 is invalid = ", isOfInvalidFormat(imageOne));

  return (
    <div
      className="bg-white w-full rounded-lg"
      style={{ cursor: "pointer" }}
      // onClick={() =>
      //   router.push(
      //     `/store/${storename}/product/${productDetails?.product_details?.kreasell_product_id}`
      //   )
      // }
    >
      <div>
        <Image
          src={productDetails?.product_images?.[0]?.filename || StoryTellingPNG}
          // * if format of first image is invalide , show second image with index 1, if second image format is also invalid, show default!
          // src={StoryTellingPNG}
          // src={imageShown}
          width="320"
          height="300"
          className="rounded-t-lg"
          alt=""
        />
      </div>

      <div className="w-full px-2 md:px-4">
        <p className="pt-2 text-sm md:text-base">
          {productDetails?.product_details?.product_name}
        </p>

        <div
          className={`flex justify-between items-center pb-4 column ${styles.main}`}
        >
          <p
            className={`text-base-gray pt-2 text-sm md:text-base ${styles.sellingPrice}`}
          >
            {productDetails?.default_currency}
            {new Intl.NumberFormat().format(sellingPrice) ?? "0.00"}
          </p>
          <p
            className={`text-base-gray  text-sm md:text-base originalPrice ${styles.originalPrice}`}
          >
            {productDetails?.default_currency}
            {new Intl.NumberFormat().format(
              originalPrice ?? productDetails?.default_price
            ) ?? "0.00"}
          </p>

          <Button
            text={productDetails?.product_details?.cta_button ?? "Buy Now"}
            className={styles.productCardBtn}
            onClick={() => {
              // router.push('/checkout')
              console.log("CTA Clicked!");
              router.push(
                `/checkout/${productDetails?.product_details?.kreasell_product_id}`
              );
              setCheckoutDetails(productDetails);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StorePage;
