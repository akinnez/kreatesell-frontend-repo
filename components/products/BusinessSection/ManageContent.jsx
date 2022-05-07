import Image from "next/image"
import { useState } from "react"
import { ArrowLeft, ViewSales, Video, Audio,EditPen, FileDelete} from "utils"
import { Button, Input, Radio,Popconfirm, Switch } from "antd"
import styles from './MembershipTab.module.scss'
import FileUpload from '../FileUpload'

export default function ManageContent({}){
    const [file, setFile] = useState([])
    const goBack = ()=>{
        setIsTabsActive(true)
        setMajorPage('index')
    }
    return (
        <div className="">
            <div onClick={()=> goBack()} className="inline-flex justify-start cursor-pointer items-center mb-4">
                    <Image alt="" src={ArrowLeft} />
					<h3 className="uppercase text-blue-600 font-semibold text-base mb-0 ml-3">Back</h3>
			</div>
            <div className="flex items-center justify-between mb-7">
                <h1 className="text-2xl text-blue-600 font-bold">How to Invest in Crypocurrency</h1>
            </div>
            <div className="bg-white rounded">
                <h2>Lecture 1</h2>
                <FileUpload file={file} setFile={setFile} />
            </div>
        </div>
    )
}//https://us02web.zoom.us/j/83636965600?pwd=cVhBckgxOHprZU9rRkpES3lkWlE4dz09