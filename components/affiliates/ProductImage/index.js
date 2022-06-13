import Image from "next/image";
import styles from "./index.module.scss";

const ProductImage = ({
  children,
  productImage,
  productName,
  width,
  height,
  priority = false,
}) => (
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
          priority={priority}
        />
      </div>
    ) : (
      <>{children}</>
    )}
  </>
);

export default ProductImage;
