import { Button } from "antd";
import Image from "next/image";
import { ProductHeaderLogo, CopyLink } from "utils";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ArrowLeft } from "utils";
import styles from './PreviewHeader.module.scss'

export default function PreviewHeader (){
    const [title, setTitle] = useState('')
    const { product } = useSelector(
        (state) => state.product
      );

    useEffect(()=>{
        setTitle( product?.product_details?.product_name)
    }, [product])
    return (
    <header className='flex items-center justify-between bg-white px-10 py-6 '>
        <div className='flex items-center'>
            <div className='flex'>
                <Image src={ProductHeaderLogo} alt="logo" />
            </div>
            <div className="inline-flex ml-8 mr-10 justify-start cursor-pointer items-center">
                    <Image alt="" src={ArrowLeft} />
					<h3 className="uppercase text-blue-600 font-semibold text-base mb-0 ml-3">Back</h3>
			</div>
            <p className="mb-0 capitalize">{title}</p>
        </div>
        <div className={styles.miniSaveButtons +' flex self-end'}>
            <Button type='default' icon={<Image src={CopyLink} alt="copy" />}>Copy Link</Button>
            <Button type='primary'>Exit Preview</Button>
            <Button type='primary'>Publish</Button>
        </div>
    </header>
    )
}