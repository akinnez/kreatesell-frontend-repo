import { useMemo } from "react";
import { Typography } from "antd";
import formatNumber from "utils/formatNumber";
import styles from "./index.module.scss";

const { Text } = Typography;

const ProductPricing = ({
  productPriceDetails,
  productAffiliateCommission,
}) => {
  const productPrice = useMemo(() => {
    if (productPriceDetails.length === 0) return null;

    const details = productPriceDetails[0];

    return {
      currency: details.currency_name,
      price: details.price,
      commission: (productAffiliateCommission / 100) * details.price,
    };
  }, [productPriceDetails, productAffiliateCommission]);

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
            {productPrice ? (
              <>
                {productPrice.currency}{" "}
                {formatNumber(productPrice.commission.toFixed(2))}
              </>
            ) : (
              "0.00"
            )}
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
