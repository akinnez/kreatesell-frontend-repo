import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Button } from "antd";
import { BsChevronLeft, BsChevronRight, BsFillImageFill } from "react-icons/bs";
import productImageFn from "utils/productImageFn";
import styles from "./index.module.scss";

const ProductImages = ({ productFiles, productName }) => {
  const images = useMemo(() => productImageFn(productFiles), [productFiles]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [src, setSrc] = useState(() => (images ? images[currentIndex] : ""));

  useEffect(() => {
    if (images) {
      setSrc(images[currentIndex]);
    }
  }, [images, currentIndex]);

  const handleImage = (img, idx) => {
    setCurrentIndex(idx);
    setSrc(img);
  };

  const handleLeft = () => {
    setCurrentIndex(state => (state - 1 < 0 ? images.length - 1 : state - 1));
  };

  const handleRight = () => {
    setCurrentIndex(state => (state + 1 === images.length ? 0 : state + 1));
  };

  const renderImages =
    images &&
    images.map((image, index) => (
      <button
        key={index}
        onClick={() => handleImage(image, index)}
        className={
          index === currentIndex
            ? `${styles.product__image} ${styles["product__image--active"]}`
            : `${styles.product__image}`
        }
      >
        <Image src={image} alt={productName} layout="fill" objectFit="cover" />
      </button>
    ));

  return (
    <>
      <div className={images && styles.product__image__overview}>
        {src ? (
          <div className={styles.product__img}>
            <Image
              src={src}
              alt={productName}
              layout="responsive"
              width={600}
              height={600}
              objectFit="cover"
              priority
            />
          </div>
        ) : (
          <div className={styles.empty__image__Banner}>
            <BsFillImageFill />
          </div>
        )}
      </div>
      {images && (
        <div className={styles.product__images__controls}>
          <div className={styles.product__images}>{renderImages}</div>
          <div className={styles.product__images__btns}>
            <Button
              onClick={handleLeft}
              size="large"
              type="default"
              icon={<BsChevronLeft />}
            />
            <Button
              onClick={handleRight}
              size="large"
              type="default"
              icon={<BsChevronRight />}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImages;
