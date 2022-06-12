import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import KreatorInfo from "components/affiliates/KreatorInfo";
import styles from "./index.module.scss";

const ProductKreator = ({ kreatorImage, kreatorName, storeName }) => {
  return (
    <div className={styles.product__kreator}>
      {kreatorImage ? (
        <div className={styles.product__kreator__avatar}>
          <Image
            src={kreatorImage}
            alt={kreatorName}
            layout="fill"
            objectFit="cover"
          />
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
