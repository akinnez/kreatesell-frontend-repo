import { FaRegUser } from "react-icons/fa";
import KreatorInfo from "components/affiliates/KreatorInfo";
import KreatorAvatar from "components/affiliates/KreatorAvatar";
import styles from "./index.module.scss";

const ProductKreator = ({ kreatorImage, kreatorName, storeName }) => {
  return (
    <div className={styles.product__kreator}>
      {kreatorImage ? (
        <div className={styles.product__kreator__avatar}>
          <KreatorAvatar image={kreatorImage} name={kreatorName} />
        </div>
      ) : (
        <div className={styles.empty__avatar}>
          <FaRegUser />
        </div>
      )}
      <div className={styles.product__kreator__info}>
        <KreatorInfo href={storeName}>
          <p>{kreatorName}</p>
        </KreatorInfo>
      </div>
    </div>
  );
};

export default ProductKreator;
