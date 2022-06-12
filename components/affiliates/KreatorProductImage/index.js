import Image from "next/image";
import { BsFillImageFill } from "react-icons/bs";
import styles from "./index.module.scss";

const KreatorProductImage = ({ productImage, productName, width, height }) => (
  <>
    {productImage ? (
      <div className={styles.product__image}>
        <Image
          src={productImage}
          alt={productName}
          layout="responsive"
          width={width}
          height={height}
          objectFit="cover"
          priority
        />
      </div>
    ) : (
      <div className={styles.empty__image__Banner}>
        <BsFillImageFill />
      </div>
    )}
  </>
);

export default KreatorProductImage;
