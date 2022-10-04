import styles from './PreviewHeader.module.scss'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import { RightPreviewArrow, LeftPreviewArrow, ExternalLink } from 'utils'

export default function PreviewContent({ activeCurrency }) {
  const [details, setDetails] = useState({})
  const [images, setImages] = useState([])
  const [mainImage, setMainImage] = useState('')
  const [activeImage, setActiveImage] = useState(0)
  const [checkout, setCheckout] = useState(null)
  const [sellingPrice, setSellingPrice] = useState([])
  const [originalPrice, setOriginalPrice] = useState([])
  const [domainLink, setDomainLink] = useState('')

  const router = useRouter()
  const { store } = useSelector((state) => state?.store)

  const { product } = useSelector((state) => state?.product)
  const { convertedCurrency, loading: currencyConverterLoading } = useSelector(
    (state) => state.currencyConverter,
  )

  const productId = product?.product_details?.kreasell_product_id

  const { user } = useSelector((state) => state?.auth)

  const formatPrice = (amount, decimalPlaces = 2) =>
    Number(amount).toFixed(decimalPlaces)
  const increase = () => {
    if (activeImage === images?.length - 1) {
      return setActiveImage(0)
    }
    return setActiveImage(activeImage + 1)
  }
  const decrease = () => {
    if (activeImage === 0) {
      return setActiveImage(images?.length - 1)
    }
    return setActiveImage(activeImage - 1)
  }
  useEffect(() => {
    if (Object.keys(product).length > 0) {
      // console.log('from preview',product)
      setDetails(product?.product_details)
      setImages(
        ...product?.product_images
          ?.filter((images) => images?.file_type !== 4)
          ?.map((item) => {
            const arr = item?.filename?.split(',')
            const truc = arr?.map((item) => {
              return {
                filename: item,
              }
            })
            return truc
          }),
      )
      setCheckout(product?.check_out_details)
    }
    if (checkout && checkout?.length > 0) {
      const defaultPrice = product?.default_currency
      const prices = checkout?.filter(
        (item) => item?.currency_name === defaultPrice,
      )
      setSellingPrice(
        prices?.filter((item) => item?.price_indicator === 'Selling'),
      )
      // console.log('product?', product)
      setOriginalPrice(
        prices?.filter((item) => item?.price_indicator === 'Original'),
      )
    }
  }, [product, checkout?.length])
  useEffect(() => {
    if (images !== undefined && images?.length > 0) {
      setMainImage(images[activeImage]?.filename)
    }
  }, [images, activeImage])
  useEffect(() => {
    if (Object.keys(store)?.length > 0) {
      const { domain_details } = store?.domain_details
      setDomainLink(domain_details[0]?.domain_url)
    }
  }, [store])

  // console.log('product', product)
  return (
    <div
      className={styles.contentContainer + ' flex flex-col bg-white rounded-lg'}
    >
      <div className={`flex ${styles.previewContainer}`}>
        <div className={styles.imageGallery}>
          <div className={styles.mainImage}>
            {mainImage && (
              <Image
                src={mainImage}
                layout="fill"
                objectFit="cover"
                alt="cover_image"
              />
            )}
          </div>
          <div className={styles.subImages}>
            {images !== undefined &&
              images.length > 0 &&
              images.map((item, index) => (
                <div
                  className={`cursor-pointer ${
                    activeImage === index && styles.active
                  }`}
                  onClick={() => setActiveImage(index)}
                  key={index}
                  style={{ backgroundImage: `url("${item.filename}")` }}
                ></div>
              ))}
            {images !== undefined && images.length > 1 && (
              <div className={styles.imageControl}>
                <span onClick={() => decrease()}>
                  {' '}
                  <Image src={RightPreviewArrow} alt="arrow" />{' '}
                </span>
                <span onClick={() => increase()}>
                  {' '}
                  <Image src={LeftPreviewArrow} alt="arrow" />
                </span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.description}>
          <div className="flex flex-col mb-5 ">
            {details !== undefined && Object.keys(details).length > 0 && (
              <h2 className="mb-0 text-left text-3xl text-base-black-100 font-bold capitalize">
                {details?.product_name}
              </h2>
            )}
          </div>
          <div className={'flex items-center ' + styles.padBottom}>
            <div className={styles.dp}>
              {product?.store_dto?.store_image && (
                <Image
                  src={product?.store_dto?.store_image}
                  width="100"
                  height={100}
                  objectFit="cover"
                  alt="cover_image"
                />
              )}
            </div>
            <div className="flex  ml-6 flex-col">
              {Object.keys(user).length > 0 && (
                <h2 className="text-lg mb-0 font-semibold capitalize">
                  {user?.full_name}
                </h2>
              )}
              <div className={styles.visitLink}>
                {/* <Link href={domainLink ? domainLink.split('.com')[1] :"/"} className='mb-0 font-medium'><a>Visit Store&nbsp;<Image src={ExternalLink} alt="link" /></a></Link> */}
                <Link href={domainLink} className="mb-0 font-medium">
                  <a>
                    Visit Store&nbsp;
                    <Image src={ExternalLink} alt="link" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.desc}>
            <h2 className="mb-5 font-semibold text-lg">Product Description:</h2>
            {details !== undefined && Object.keys(details).length > 0 && (
              <p className="text-left">{details.product_description}</p>
            )}
          </div>

          {/* TODO: make the date dynamic */}
          {product?.product_details?.enable_preorder && (
            <div className={styles.preorderInfo}>
              Please note that this product is to be preordered and the expected
              release date is Mar 31, 2022 9:00 AM
            </div>
          )}

          <div className={styles.padBottom1}></div>
          <div className={styles.priceSection}>
            <div className="flex flex-col">
              {/*  */}
              {/* {sellingPrice?.length > 0 && sellingPrice?.map((item, i) => <h1 key={i} className='text-3xl font-bold'>{`${item?.currency_name}  ${item?.price}`}</h1>)} */}
              {sellingPrice?.length > 0 && (
                <h1 className="text-3xl font-bold">{`${
                  convertedCurrency?.to_currency_name ||
                  sellingPrice[0]?.currency_name
                }  ${
                  convertedCurrency?.buy_rate
                    ? formatPrice(
                        convertedCurrency?.buy_rate * sellingPrice[0]?.price,
                      )
                    : formatPrice(sellingPrice[0]?.price)
                }`}</h1>
              )}
              {originalPrice?.length > 0 && (
                <h2 className="text-xl line-through font-medium">{`${
                  convertedCurrency?.to_currency_name ||
                  originalPrice[0]?.currency_name
                }  ${
                  convertedCurrency?.buy_rate
                    ? formatPrice(
                        convertedCurrency?.buy_rate * originalPrice[0]?.price,
                      )
                    : originalPrice[0]?.price
                }`}</h2>
              )}
            </div>

            <Button
              onClick={() => {
                console.log('clicked')
                router.push(
                  {
                    pathname: `/checkout/${productId}`,
                    query: { selectedCurrecy: 'activeCurrency' },
                  },
                  `/checkout/${productId}`,
                )
              }}
              type="primary"
            >
              {details !== undefined && details?.cta_button
                ? details?.cta_button
                : 'Buy Now'}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col">
        <h2 className="mb-7 pt-5 font-semibold text-lg">More Details:</h2>
        {details !== undefined && Object.keys(details)?.length > 0 && (
          <div
            dangerouslySetInnerHTML={{ __html: details?.product_details }}
          ></div>
        )}
      </div>
    </div>
  )
}
