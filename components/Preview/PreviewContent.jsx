import styles from './PreviewHeader.module.scss'
import {useSelector} from 'react-redux'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {Button} from 'antd'
import { RightPreviewArrow, LeftPreviewArrow, ExternalLink } from 'utils';

export default function PreviewContent (){
    const [details, setDetails] = useState({})
    const [images, setImages] = useState([])
    const [mainImage, setMainImage] = useState('')
    const [activeImage, setActiveImage] = useState(0)
    const [checkout, setCheckout]= useState(null)
    const { product } = useSelector(
        (state) => state.product
      );

      const increase = ()=>{
          if(activeImage === images.length -1){
              return setActiveImage(0)
          }
          return setActiveImage(activeImage + 1)
      }
      const decrease = ()=>{
          if(activeImage === 0){
              return setActiveImage(images.length -1)
          }
          return setActiveImage(activeImage - 1)
      }
    useEffect(()=>{
        if(Object.keys(product).length > 0){
            console.log('from preview',product)
            setDetails(product?.product_details)
            setImages(...product?.product_images.filter(images => images.file_type !== 4).map(item => {
                const arr = item.filename.split(',')
                const truc = arr.map(item => {
                  return {
                    filename: item
                  }
                })
                return truc
              }))
            setCheckout(product?.check_out_details)
        }        
    }, [product])
    useEffect(()=>{
        if(images !== undefined && images.length > 0 ){
            setMainImage(images[activeImage].filename)
        }
    }, [images, activeImage])
  
    return(
        <div className={styles.contentContainer + " flex flex-col bg-white rounded-lg"}>
            <div className="flex">
                <div className={styles.imageGallery}>
                    <div className={styles.mainImage}>
                        {mainImage && <Image src={mainImage}layout='fill' objectFit="cover" alt="cover_image" />}
                    </div>
                    <div className={styles.subImages}>
                        {
                            images !== undefined && images.length > 0 && images.map((item, index)=>(
                                <div className={`cursor-pointer ${activeImage === index && styles.active}`} onClick={()=>setActiveImage(index)} key={index} style={{backgroundImage: `url("${item.filename}")`}}></div>
                            ))
                        }
                        {images !== undefined && images.length > 1 && <div className={styles.imageControl}>
                            <span onClick={()=>decrease()}> <Image src={RightPreviewArrow} alt="arrow"/> </span>
                            <span onClick={()=>increase()}> <Image src={LeftPreviewArrow} alt="arrow"/></span>
                            </div>}
                    </div>
                </div>
                <div className={styles.description}>
                    <div className='flex flex-col mb-5 '>
                        {details !== undefined && Object.keys(details).length > 0 && <h2 className='mb-0 text-left text-3xl text-base-black-100 font-bold capitalize'>{details.product_name}</h2>}
                    </div>
                    <div className={'flex items-center '+ styles.padBottom}>
                        <div className={styles.dp}>
                        {/* {details !== undefined && Object.keys(details).length > 0 && <Image src={`/${details.user.business_logo}`} width="100" height={100} objectFit="cover" alt="cover_image" />} */}
                        </div>
                        <div className='flex  ml-6 flex-col'>
                            {/* {details !== undefined && Object.keys(details).length > 0 && <h2 className='text-lg mb-0 font-semibold capitalize'>{details.user.full_name}</h2>} */}
                            <div className={styles.visitLink}>
                                <h2 className='mb-0 font-medium'>Visit Store</h2>
                                <Image src={ExternalLink} alt="link" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.desc}>
                        <h2 className='mb-5 font-semibold text-lg'>Product Description:</h2>
                        {details !== undefined && Object.keys(details).length > 0 && <p className='text-left'>{details.product_description}</p>}
                    </div>
                    <div className={styles.priceSection}>
                        <div className="flex flex-col">
                            {checkout && checkout.length > 0 && <h1 className='text-3xl font-bold'>{checkout && `${checkout[0].currency_name}  ${checkout[0].price}`}</h1> }
                        </div>
                        <Button type='primary' >{details !== undefined && details.cta_button ? details.cta_button : 'Buy Now'}</Button>
                    </div>
                </div>
            </div>
            <div className='mt-6 flex flex-col'>
                <h2 className='mb-5 font-semibold text-lg'>More Details:</h2>
                {details !== undefined && Object.keys(details).length > 0 && <div dangerouslySetInnerHTML={{__html: details.product_details}}></div>}
            </div>
        </div>
    )
}