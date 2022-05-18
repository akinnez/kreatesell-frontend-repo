import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowLeft, ViewSales, Video, Audio,EditPen, FileDelete} from "utils"
import { Button, Switch } from "antd"
import style from './MembershipTab.module.scss'
import ProductEditor from '../ProductEditor'
import ContentUpload from '../ContentUpload'

export default function ManageContent({setIsTabsActive, setMajorPage, sections, contentIndex,sectionIndex, setSections}){
    const [file, setFile] = useState(null)
    const [contents, setContents] = useState('')
    const goBack = ()=>{
        setIsTabsActive(true)
        setMajorPage('index')
    }
    useEffect(()=>{
        setSections(prev =>{
            const main = prev[sectionIndex]
            main.lectures[contentIndex].description = contents
            prev[sectionIndex] = main
            return [...prev]
        })
    }, [contents])

    useEffect(()=>{
        if(file){
            setSections(prev =>{
                const main = prev[sectionIndex]
                const lec = main.lectures[contentIndex]
                const trunc = {...lec, ...file}
                main.lectures[contentIndex] = trunc
                prev[sectionIndex] = main
                return [...prev]
            })
        }
    }, [file])

    const handleChange = ()=>{
        setSections(prev =>{
            const main = prev[sectionIndex]
            main.lectures[contentIndex].isDownload = !main.lectures[contentIndex].isDownload
            prev[sectionIndex] = main
            return [...prev]
        })
    }
    useEffect(()=>{
        const mainContent = sections.filter((item, index)=>index === sectionIndex)[0].lectures.filter((lec, idx)=> idx === contentIndex)
        console.log(mainContent)
        // setContents(mainContent[0].description)
    }, [contentIndex, sectionIndex, sections])
    return (
        <div className="">
            <div onClick={()=> goBack()} className="inline-flex justify-start cursor-pointer items-center mb-4">
                    <Image alt="" src={ArrowLeft} />
					<h3 className="uppercase text-blue-600 font-semibold text-base mb-0 ml-3">Back</h3>
			</div>
            <div className="flex items-center justify-between mb-7">
                <h1 className="text-2xl text-blue-600 font-bold">How to Invest in Crypocurrency</h1>
            </div>
            <div className={style.contentContainer + " bg-white rounded-lg"}>
                <div className={style.contents}>
                    <h1 className="text-2xl mb-5 font-semibold">Lecture 1</h1>
                    <h2 className="font-normal text-lg ">Content File</h2>
                    <div className="w-4/5">
                        <ContentUpload  file={file} setFile={setFile} />
                        <div className="mt-5 flex justify-between items-start">
                            <div className="flex flex-col">
                                <h2 className="text-lg font-medium">Make Content Downloadable</h2>
                                <p className="text-xs text-gray-500">By checking this box, customers will be able to download the content</p>
                            </div>
                            <div className="flex items-center">
                                <Switch onChange={()=>handleChange()}/>
                                <h2 className="mb-0 ml-3 text-lg">OFF</h2>
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
                    <Button type="primary">
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}