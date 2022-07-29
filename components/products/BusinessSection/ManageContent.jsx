import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowLeft, ViewSales, Video, Audio,EditPen, FileDelete} from "utils"
import { Button, Switch } from "antd"
import style from './MembershipTab.module.scss'
import ProductEditor from '../ProductEditor'
import ContentUpload from '../ContentUpload'
import { useFormik } from "formik"
import {  GetProductByID, CreateContent} from "redux/actions"
import { useSelector } from "react-redux"
// import ContentEditor from "../ContentEditor"

export default function ManageContent({setIsTabsActive, setMajorPage, content}){
    const [file, setFile] = useState(null)
    const [contents, setContents] = useState('')
    const createContent = CreateContent()
    const getProduct = GetProductByID()
    const [isDownload, setIsDownload] = useState(false)

    const { productID, loading } = useSelector(
        (state) => state.product
      );
    const goBack = ()=>{
        setIsTabsActive(true)
        setMajorPage('index')
    }

    const initialValues = {
        "section_id": '',
        "product_section_name": ``,
        "product_section_description": "",
        "upload_product_file": true,
        "product_visibility_status": 1,
        "is_content_downloadable": true,
        "product_file_details": {
          "product_files": null,
        },
        "action": "e",
        "sub_section_id": 0
      }

      const handleSubmit = (data)=>{
        createContent(data, () => {
            getProduct(productID, ()=>goBack())
        })
      }

      const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        validationSchema:'',
        validateOnChange: false,
      });

      const {setFieldValue} = formik

    useEffect(()=>{
        setFieldValue("product_section_name", content.product_section_name)
        setFieldValue("section_id", content.product_content_id)
        setFieldValue("product_section_description", content.product_section_description)
        setFieldValue("is_content_downloadable", content.is_content_downloadable)
        setFieldValue("sub_section_id", content.id)
        setContents(content.product_section_description)
        setIsDownload(content.is_content_downloadable)
    }, [content])
    // useEffect(()=>{
    //     if(file){
    //         setSections(prev =>{
    //             const main = prev[sectionIndex]
    //             const lec = main.lectures[contentIndex]
    //             const trunc = {...lec, ...file}
    //             main.lectures[contentIndex] = trunc
    //             prev[sectionIndex] = main
    //             return [...prev]
    //         })
    //     }
    // }, [file])

    useEffect(()=>{
      setFieldValue("product_section_description", contents)
      setFieldValue('is_content_downloadable', isDownload)
      if(file){
          setFieldValue('product_file_details.product_files', [file?.url])
      }
      setFieldValue('is_content_downloadable', isDownload)

    }, [contents, isDownload, file])
    return (
        <div className="">
            <div onClick={()=> goBack()} className="inline-flex justify-start cursor-pointer items-center mb-4">
                    <Image alt="" src={ArrowLeft} />
					<h3 className="uppercase text-blue-600 font-semibold text-base mb-0 ml-3">Back</h3>
			</div>
            <div className="flex items-center justify-between mb-7">
                <h1 className={`text-2xl text-blue-600 font-bold ${style.titleMain}`}>How to Invest in Crypocurrency</h1>
            </div>
            <div className={style.contentContainer + " bg-white rounded-lg"}>
                <div className={style.contents}>
                    <h1 className="text-2xl mb-5 font-semibold">{content.product_section_name}</h1>
                    <h2 className="font-normal text-lg ">Content File</h2>
                    <div className="w-4/5">
                        <ContentUpload  file={file} setFile={setFile} />
                        <div className="mt-5 flex justify-between items-start">
                            <div className="flex flex-col">
                                <h2 className="text-lg font-medium">Make Content Downloadable</h2>
                                <p className="text-xs text-gray-500">By checking this box, customers will be able to download the content</p>
                            </div>
                            <div className="flex items-center">
                                <Switch checked={isDownload} onChange={()=>setIsDownload(value => !value)}/>
                                <h2 className="mb-0 ml-3 text-lg">{isDownload ? "ON": "OFF"}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="inline-flex items-center mt-4">
                        <h2 className="text-lg mb-0 font-semibold">Content Description</h2>
                        <p className="text-gray-500 mb-0 text-base ml-2">- Add a short summary of your content</p>
                    </div>
                    <div className="mt-2">
                        <ProductEditor content={contents} setContent={setContents} />
                    </div>
                </div>
                <div className={style.addContentButton}>
                    <Button loading={loading} onClick={()=> formik.handleSubmit()} type="primary">
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}