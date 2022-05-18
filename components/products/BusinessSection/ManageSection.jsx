import Image from "next/image"
import { useState } from "react"
import { ArrowLeft, ViewSales, Video, Audio,EditPen, FileDelete, FileZip} from "utils"
import { Button, Input, Radio,Popconfirm, Switch } from "antd"
import styles from './MembershipTab.module.scss'
import PlayMedia from "./PlayMedia"

export default function ManageSection ({setIsTabsActive, setMajorPage, sections, setSections, toSection}) {
    const [play, setPlay]= useState(false)
    const goBack = ()=>{
        setIsTabsActive(true)
        setMajorPage('index')
    }
    const displayMedia = (type, source, fn)=>{
        return (
            <PlayMedia source={source} type={type} open={play} closePlay={fn} />
        )
    }
    return(
        <div className="">
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
                sections.map((items, index)=>(
                    <div key={index} className="flex flex-col mt-5">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <h1 className="text-2xl font-semibold">{items.name ? items.name : "Section Name"}</h1>
                            </div>
                            <div className="flex item-center">
                                <Switch checked={items.isControl ? true : false} onChange={()=>setSections(prev => {
                                    const sec = prev[index]
                                    sec.isControl = !sec.isControl
                                    prev[index] =sec
                                    return [...prev]
                                })}/>
                                <h2 className="text-base ml-3 font-semibold">{items.isControl ? "ON" : "OFF"}</h2>
                            </div>
                        </div>
                        {
                            items.isControl && <div className="mb-5">
                                 <div className="inline-flex">
                                    <h2 className="text-base font-medium mr-2">Access Control</h2>
                                    <p className="text-sm mb-0">- Set the subscribers who access this module</p>
                                </div>
                                <div className="mt-3">
                                    <Radio.Group>
                                        <Radio className=" text-xl font-semibold items-center">Available to all Subscribers</Radio>
                                        <Radio className=" text-xl font-semibold items-center">Only available to subscribers who has made payment up to:</Radio>
                                    </Radio.Group>
                                </div>
                                <div className="flex flex-col w-1/3 mt-4">
                                    <label className="text-lg font-medium mb-3">Number of Times</label>
                                    <Input placeholder="1"/>
                                </div>
                            </div>
                        }
                        {
                            items.lectures && items.lectures.length > 0 && items.lectures.map((item, indx)=>(
                                <div key={indx} className={styles.managedContent + " bg-white flex justify-between items-center rounded-lg mb-3"}>
                                    <div className="flex items-center">
                                        <div className={styles.fileImage}>
                                            {item.type && <Image width={20} height={20} src={item.type === "audio" ? Audio: item.type === "video"? Video :FileZip} alt="file" />}
                                        </div>
                                        <div className="flex flex-col">
                                            <h1 className="text-xl font-semibold">{item.lecture_name ? item.lecture_name : `Lecture ${indx + 1}`}</h1>
                                            {item.size && <h2 className="text-base font-medium">{`${(item.size/ (1024 * 1024)).toFixed()}MB`}</h2>}
                                        </div>
                                    </div>
                                    <div className={styles.managedControls}>
                                        <div onClick={()=>{
                                            console.log('media', item)
                                            // setPlay(value => !value)
                                            // displayMedia('audio', item.url)
                                            }} className="p-4">
                                                {/* {play && displayMedia('audio', item.url, setPlay)} */}
                                            <Image  width={15} height={15} src={ViewSales} alt="icon" />
                                        </div>
                                        <div onClick={()=>toSection("manage-content", index, indx)} className="p-4">
                                            <Image  width={15} height={15} src={EditPen} alt="icon" />
                                        </div>
                                        <div >
                                            <Popconfirm 
                                            placement="bottomRight"
                                            okText="Delete" cancelText="Cancel"
                                            cancelButtonProps={{type: "default", size: "large" }}
                                            okButtonProps={{type: "danger", size: "large" }}
                                            overlayInnerStyle={{textAlign: "center"}}
                                            overlayStyle={{width: "350px", padding: "20px"}}
                                            icon={<></>}
                                            title={
                                                <p className="text-sm font-normal inline-flex">Are you sure you want to delete this <strong>File</strong>?</p>
                                            } >
                                                <Image  width={15} height={15} src={FileDelete} alt="icon" />
                                            </Popconfirm>   
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                ))
            }
        </div>
    )

}