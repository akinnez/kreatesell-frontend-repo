import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Button } from "antd";
import { BsChevronLeft, BsChevronRight, BsFillImageFill } from "react-icons/bs";
import ProductImage from "components/affiliates/ProductImage";
import styles from "./index.module.scss";

const ProductImages = ({ imageFiles, productName }) => {
  const images = useMemo(() => {
    if (imageFiles.length === 0) return null;

    const urls = imageFiles.filter(files => files.file_type !== 4);

    if (!urls[0]?.filename) return null;

    return urls[0].filename.split(",");
  }, [imageFiles]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [src, setSrc] = useState(images[currentIndex]);

  useEffect(() => {
    setSrc(images[currentIndex]);
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
      <div
        key={index}
        onClick={() => handleImage(image, index)}
        className={
          index === currentIndex
            ? `${styles.product__image} ${styles["product__image--active"]}`
            : `${styles.product__image}`
        }
      >
        <Image
          src={image}
          alt={productName}
          width={125}
          height={125}
          objectFit="cover"
        />
      </div>
    ));

  return (
    <>
      <div className={styles.product__image__overview}>
        <ProductImage
          productImage={src}
          productName={productName}
          width={280}
          height={280}
          priority
        >
          <div className={styles.empty__image__Banner}>
            <BsFillImageFill />
          </div>
        </ProductImage>
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
