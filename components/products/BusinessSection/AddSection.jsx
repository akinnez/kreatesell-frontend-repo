import { Button, Input, Tooltip } from "antd"
import styles from './MembershipTab.module.scss'
import {DeleteProduct,
	DuplicateProduct} from 'utils'
import Image from "next/image"
import {HandleBar, EditPen, AddLecture} from 'utils'

export default function AddSection ({sections, setSections, toSection}){
    
    const addSection = ()=>{
        const newSection = {
            name: "",
            isControl: false,
            lectures: [{lecture_name: "", type:"", size:"", url: '',description:"",isDownload: false}]
            
        }
        setSections(prev => [...prev, newSection])
    }
    const deleteSection = (item)=>{
        setSections(prev => prev.filter(items=> items !== item))
    }
    const handleChange = (value, index)=>{
       setSections(prev => {
           const change = prev[index]
           change.name = value
           prev[index] = change
           return [...prev]
       })  
    }
    const handleLectureChange = (value, index, lectureIndex)=>{
       setSections(prev => {
           const change = prev[index]
           change.lectures[lectureIndex].lecture_name = value
           prev[index] = change
           return [...prev]
       })  
    }

    const handleClick = (target)=>{
        const {nextElementSibling: element} = target
        target.style.display = "none"
        element.style.display = "block"
    }
    const handleBlur = (target)=>{
        const {previousElementSibling: element} = target
        target.style.display = "none"
        element.style.display = "block"
    }
    const addNewLecture =(index)=>{
        setSections(prev =>{
            const mainSection = prev[index]
            const newLecture = {lecture_name: "", type:"", size:"", url: '',description:"",isDownload: false}
            mainSection.lectures = [...mainSection.lectures, newLecture]
            prev[index] = mainSection
            return [...prev]
        })
    }

    const deleteLecture = (lecture, index)=>{
        setSections(prev =>{
            const section = prev[index]
            section.lectures = section.lectures.filter(item => item !== lecture)
            prev[index] = section
            return [...prev]
        })
    }
    
    return(

        <div className={styles.allSection}>
            {sections.map((item, index)=>(
                <div key={index} className={styles.section}>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Image src={HandleBar} alt="handle" />
                            <h2 onClick={(e)=> handleClick(e.target)} className="text-base mb-0 ml-2 font-medium cursor-pointer">{item.name ? item.name : "Section Name"}</h2>
                            <Input autoFocus={true} style={{display: "none"}} value={item.name} onBlur={(e)=>handleBlur(e.target)} onChange={(e)=> handleChange(e.target.value, index)} placeholder="Introduction" />
                        </div>
                        <div className="flex items-center">
                            <div className={styles.manageButton + " mr-3"}>
                                <Button onClick={()=>toSection('manage-section')} type="primary" style={{color: "#0072ef", border: " 2px solid #0072ef"}}>Manage Section</Button>
                            </div>
                            <Tooltip color="white" overlayInnerStyle={{color: "black"}} placement="top" title="Duplicate">
                                <div className={styles.manageIcon + " mr-3"}>
                                    <Image width={100} height={100} src={DuplicateProduct} alt="duplicate" />
                                </div>
                            </Tooltip>
                            <Tooltip color="white" overlayInnerStyle={{color: "black"}} overlayClassName={styles.toolTip} placement="top" title="Delete">
                                <div onClick={()=>deleteSection(item)} className={styles.manageIcon}>
                                    <Image width={100} height={100} src={DeleteProduct} alt="delete" />
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                    {
                        item.lectures && item.lectures.length > 0 && item.lectures.map((lecture, idx)=>(
                        <div key={idx} className="flex mt-5 ml-5 justify-between items-center">
                            <div className="flex items-center">
                                <Image src={HandleBar} alt="handle" />
                                <h2 onClick={(e)=> handleClick(e.target)} className="text-base mb-0 ml-2 font-medium cursor-pointer">{lecture.lecture_name ? lecture.lecture_name : "Lecture Name"}</h2>
                                <Input autoFocus={true} style={{display: "none"}} value={item.lectures[idx].lecture_name} onBlur={(e)=>handleBlur(e.target)} onChange={(e)=> handleLectureChange(e.target.value, index, idx)} placeholder="Brief" />
                            </div>
                            <div className="flex items-center">
                                <div className={styles.manageButton + " mr-3"}>
                                    <Button onClick={()=> toSection('manage-content', index, idx)} type="primary" style={{color: "#00b140", border: " 2px solid #00b140"}}>Manage Lecture</Button>
                                </div>
                                <Tooltip color="white" overlayInnerStyle={{color: "black"}} overlayStyle={{backgroundColor: "white"}} placement="top" title="Duplicate">
                                    <div className={styles.manageIcon + " mr-3"}>
                                        <Image width={100} height={100} src={DuplicateProduct} alt="duplicate" />
                                    </div>
                                </Tooltip>
                                <Tooltip color="white" overlayInnerStyle={{color: "black"}} overlayStyle={{backgroundColor: "white"}} placement="top" title="Delete">
                                    <div onClick={()=> deleteLecture(lecture, index)} className={styles.manageIcon}>
                                        <Image width={100} height={100} src={DeleteProduct} alt="delete" />
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        ))
                    }
                    <div onClick={()=> addNewLecture(index)} className="inline-flex items-center cursor-pointer mt-5">
                        <Image src={AddLecture} alt="add" />
                        <h2 className="text-base mb-0 ml-2 font-medium">Add a Lecture</h2>
                    </div>
                </div>
                ))
            }
            <div className={styles.miniSaveButton + "flex mt-5"}>
                    <Button onClick={()=> addSection()} type="primary">+ Add New Section</Button>
            </div>
        </div>
    )
}