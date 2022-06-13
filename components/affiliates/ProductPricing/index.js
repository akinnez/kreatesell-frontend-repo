import { useMemo } from "react";
import { Typography } from "antd";
import formatNumber from "utils/formatNumber";
import productPriceFn from "utils/productPriceFn";
import styles from "./index.module.scss";

const { Text } = Typography;

const ProductPricing = ({
  productPriceDetails,
  productAffiliateCommission,
}) => {
  const productPrice = useMemo(
    () => productPriceFn(productPriceDetails),
    [productPriceDetails]
  );

  const commission = !productPrice
    ? 0
    : (productAffiliateCommission / 100) * productPrice.price;

  return (
    <div className={styles.product__overview__pricing}>
      <div>
        <p>
          <Text strong>Sales Price:</Text>
        </p>
        <p>
          <Text>
            {productPrice ? (
              <>
                {productPrice.currency}{" "}
                {formatNumber(productPrice.price.toFixed(2))}
              </>
            ) : (
              "0.00"
            )}
          </Text>
        </p>
      </div>
      <div>
        <p>
          <Text strong>Commission:</Text>
        </p>
        <p>
          <Text>
            {productPrice && <>{productPrice.currency} </>}
            {formatNumber(commission.toFixed(2))}
          </Text>
        </p>
      </div>
      <div>
        <p>
          <Text strong>Commission (%):</Text>
        </p>
        <p>
          <Text>{productAffiliateCommission}%</Text>
        </p>
      </div>
    </div>
  );
};

export default ProductPricing;
