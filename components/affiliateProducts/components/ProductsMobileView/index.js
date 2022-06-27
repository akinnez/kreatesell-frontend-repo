import { memo } from "react";
import Image from "next/image";
import RequestAccessLink from "../RequestAccessLink";
import ProductDetails from "../ProductDetails";
import dateFormat from "utils/dateFormat";
import Basket from "public/images/basket-grayed.png";
import Clipboard from "public/images/clipboards.png";
import styles from "./index.module.scss";

const ProductsMobileView = ({ products }) => (
  <>
    {products.length === 0 ? (
      <div className={styles.no__data}>
        <Image src={Clipboard} alt="Clipboard" width={200} height={200} />
        <p>No record yet</p>
      </div>
    ) : (
      <ul className={styles.products}>
        {products.map(product => (
          <li key={product.id} className={styles.product}>
            <div className={styles.product__header}>
              <div>
                {product.launch_date && (
                  <div className={styles["product__launch-date"]}>
                    {dateFormat(product.launch_date)}
                  </div>
                )}
                <div className={styles.product__name}>
                  <span>
                    <Image
                      alt="product icon"
                      src={Basket}
                      width={14}
                      height={14}
                    />
                  </span>
                  &nbsp;
                  <strong>{product.product_name}</strong>
                </div>
              </div>
              <RequestAccessLink
                id={product.id}
                hasRequested={product.has_requested_access}
              />
            </div>
            <ProductDetails
              kreatorName={product.kreator_name}
              productType={product.product_type_name}
              currency="NGN"
              price="4,000"
              sold={product.total_sold}
              visits={product.total_product_visits}
              commission={product.affiliate_percentage_on_sales}
            />
          </li>
        ))}
      </ul>
    )}
  </>
);

export default memo(ProductsMobileView);
