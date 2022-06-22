import Image from "next/image"
import { useState, useEffect } from "react"
import { ArrowLeft, ViewSales, Video, Audio,EditPen, FileDelete, FileZip} from "utils"
import { Button, Input, Radio,Popconfirm, Switch } from "antd"
import styles from './MembershipTab.module.scss'
import PlayMedia from "./PlayMedia"
import { useSelector } from "react-redux"
import { useFormik } from "formik"
import { CreateSection, GetProductByID, CreateContent} from "redux/actions"

export default function ManageSection ({setIsTabsActive, setMajorPage, toSection}) {
    const [mediaContent, setMediaContent] = useState(null)
    const [productSection, setProductSection] = useState(null)
    const { product, productID } = useSelector(
        (state) => state.product
      );
        const getProduct = GetProductByID()
        const createContent = CreateContent()
    const [play, setPlay]= useState(false)
    const goBack = ()=>{
        setIsTabsActive(true)
        setMajorPage('index')
    }
    const openMedia = (media)=>{
        setMediaContent(media)
        setPlay(true)
    }

    const initialValues = {
        "product_id": 0,
        "kreatesell_id": "",
        "product_content_name": "",
        "action": "e",
        frequency_of_availability: 1,
        is_access_control_set: false,
        is_available_to_all_subscriber: true
      }

      const handleSubmit = (data)=>{
      }
    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        validationSchema:'',
        validateOnChange: false,
      });

      const {setFieldValue} = formik
    useEffect(()=>{
        if(Object.keys(product).length > 0){
            const {product_content} = product
            setProductSection(product_content)
        }
    }, [product])

    const handleChange = (item, e)=>{
        setFieldValue("product_content_name", item.section_name)
        setFieldValue("content_id", item.id)
        setFieldValue("kreatesell_id", item.kreate_sell_product_id)
        setFieldValue("product_id", item.product_id)
        setFieldValue("is_access_control_set", true)
        setFieldValue("is_available_to_all_subscriber", e.target.value)
    }
    const deleteLecture = (lecture)=>{
        createContent({
        "section_id": lecture.product_content_id,
        "action": 'r',
        "sub_section_id": lecture.id,
        "product_section_name": lecture.product_section_name,
        "product_section_description": lecture. product_section_description,
        "product_file_details": lecture.product_file_details ?? {
            "product_files": null
        }
        }, () => {
            getProduct(productID)
        })
    }
    return(
        <div className="">
            { play && <PlayMedia source={mediaContent} open={play} closePlay={setPlay} />}
            <div onClick={()=> goBack()} className="inline-flex justify-start cursor-pointer items-center mb-4">
                    <Image alt="" src={ArrowLeft} />
					<h3 className="uppercase text-blue-600 font-semibold text-base mb-0 ml-3">Back</h3>
			</div>
            <div className="flex items-center justify-between mb-7">
                <h1 className="text-2xl text-blue-600 font-bold">How to Invest in Crypocurrency</h1>
               
                <div className={styles.miniSaveButtons + " flex"}>
                    <Button type="primary" style={{color: "#0072ef"}}>+ Add Section</Button>
                    <Button type="primary" icon={<Image color="white" src={ViewSales} alt="empty"/>}>  Preview Membership</Button>
                </div>
            </div>
           
            {
                productSection !== null && productSection.length > 0 && productSection.map((items, index)=>(
                    <div key={index} className="flex flex-col mt-7">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <h1 className="text-2xl font-semibold">{items.section_name}</h1>
                            </div>
                            <div className="flex item-center">
                                <Switch onChange={()=>setProductSection(prev=> {
                                    prev[index].is_access_control_set = !prev[index].is_access_control_set
                                    return [...prev]
                                })} checked={items.is_access_control_set ? true : false}/>
                                <h2 className="text-base ml-3 font-semibold">{items.is_access_control_set ? "ON" : "OFF"}</h2>
                            </div>
                        </div>
                        {
                            items?.is_access_control_set && <div className="mb-5">
                                 <div className="inline-flex">
                                    <h2 className="text-base mb-0 font-medium mr-2">Access Control</h2>
                                    <p className="text-sm mb-0">- Set the subscribers who access this module</p>
                                </div>
                                <div className="mt-3">
                                    <Radio.Group className={styles.rad}  onChange={(e)=>handleChange(items, e)} defaultValue={true}>
                                        <Radio className=" text-xl font-semibold items-center" value={true}>Available to all Subscribers</Radio>
                                        <Radio className=" text-xl font-semibold items-center" value={false}>Only available to subscribers who has made payment up to:</Radio>
                                    </Radio.Group>
                                </div>
                                {!formik.values.is_available_to_all_subscriber && <div className={styles.in +" flex flex-col w-1/3 mt-4"}>
                                    <label className="text-lg font-medium mb-3">Number of Times</label>
                                    <Input onChange={(e)=>setFieldValue("frequency_of_availability", e.target.value)} placeholder="1"/>
                                </div>}
                            </div>
                        }
                        {
                           items?.product_subsection?.length > 0 ? items?.product_subsection?.map((item, indx)=>(
                                <div key={indx} className={styles.managedContent + " bg-white flex justify-between mt-5 items-center rounded-lg mb-1"}>
                                    <div className="flex items-center">
                                        <div className={styles.fileImage}>
                                            {<Image width={20} height={20} src={ Audio} alt="file" />}
                                        </div>
                                        <div className="flex flex-col">
                                            <h1 className="text-xl font-semibold">{item.product_section_name}</h1>
                                            {<h2 className="text-base font-medium">{`20MB`}</h2>}
                                        </div>
                                    </div>
                                    <div className={styles.managedControls}>
                                        <div className="p-4" onClick={()=>openMedia(item.product_section_name)}>
                                            <Image  width={15} height={15} src={ViewSales} alt="icon" />
                                        </div>
                                        <div onClick={()=>toSection("manage-content", item)} className="p-4">
                                            <Image  width={15} height={15} src={EditPen} alt="icon" />
                                        </div>
                                        <div >
                                            <Popconfirm 
                                            placement="bottom"
                                            overlayClassName={styles.popConfirm}
                                            onConfirm={()=>deleteLecture(item)}
                                            okText="Delete" cancelText="Cancel"
                                            cancelButtonProps={{type: "default", size: "large" }}
                                            okButtonProps={{type: "danger", size: "large" }}
                                            overlayInnerStyle={{textAlign: "center"}}
                                            overlayStyle={{width: "350px", padding: "20px"}}
                                            icon={<></>}
                                            title={
                                                `Are you sure you want to delete this File?`
                                            } >
                                                <Image  width={15} height={15} src={FileDelete} alt="icon" />
                                            </Popconfirm>   
                                        </div>
                                    </div>
                                </div>
                            ))
                            : 
                            <div className="w-full bg-white py-10 rounded-lg flex items-center justify-center">
                                <h2 className="text-2xl font-semibold text-gray-300">No Contents Available</h2>
                            </div>
                        }
                        
                    </div>
                ))
            }
        </div>
    )

}