import Link from "next/link";
import Image from "next/image";
import { Pagination } from "antd";
import { BsFillImageFill } from "react-icons/bs";
import PaginationHelper from "components/PaginationHelpers";
import KreatorProductDetails from "../KreatorProductDetails";
import productImageFn from "utils/productImageFn";
import styles from "./index.module.scss";

const KreatorProducts = ({ products, totalProducts, filters, setFilters }) => {
  const handlePageChange = page => {
    setFilters({ ...filters, page });
  };

  const productsList = products.map(product => {
    const productImages = productImageFn(product.product_images);

    return (
      <li key={product.product_details.id} className={styles.product}>
        <Link
          href={`/account/affiliate/preview/product/${product.product_details.id}`}
        >
          <a>
            {productImages ? (
              <div className={styles.product__image}>
                <Image
                  src={productImages[0]}
                  alt={product.product_details.product_name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ) : (
              <div className={styles.empty__image__Banner}>
                <BsFillImageFill />
              </div>
            )}
            <KreatorProductDetails
              stock={product.status}
              sold={product.number_sold}
              productName={product.product_details.product_name}
              checkoutDetails={product.check_out_details}
            />
          </a>
        </Link>
      </li>
    );
  });

  return (
    <>
      <PaginationHelper
        dataSize={totalProducts}
        filters={filters}
        setFilters={setFilters}
      />
      <ol className={styles.products__list}>{productsList}</ol>
      <Pagination
        pageSize={filters.limit}
        current={filters.page}
        total={totalProducts}
        responsive={true}
        onChange={handlePageChange}
      />
    </>
  );
};

export default KreatorProducts;
