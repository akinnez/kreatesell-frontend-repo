import { Button } from "antd";
import Image from "next/image";
import { useState } from "react";
import {EmptyDataTable, Subscribers} from 'utils'
import productStyles from '../../../public/css/AllProducts.module.scss'
import AddSection from "./AddSection";
import styles from './MembershipTab.module.scss'

export default function MembershipIndex({setIsTabsActive, setMajorPage}) {
    const [fields, setFields] = useState('adding section')
    const toManageSection = ()=>{
        setIsTabsActive(false)
        setMajorPage('manage-section')
    }
  return (
    <div className="flex flex-col mt-7">
            <div className="flex items-center justify-between mb-7">
                <h1 className="text-2xl text-blue-600 font-bold">How to Invest in Crypocurrency</h1>
                {fields === 'empty' && <div className={styles.miniSaveButton}>
                    <Button onClick={()=> setFields('adding section')} type="primary">+ Add Content</Button>
                </div>}
                {fields === 'adding section' && <div className={styles.miniSaveButtons + " flex"}>
                    <Button type="default" icon={<Image src={Subscribers} alt="empty"/>}>  View Subscribers</Button>
                    <Button type="primary" onClick={()=> toManageSection()} style={{color: "#0072ef"}}>Manage All Sections</Button>
                    <Button type="primary">Preview Membership</Button>
                </div>}
            </div>
           {fields === 'empty' && <> <div className={productStyles.emptyTable +" bg-white flex flex-col"}>
                <Image src={EmptyDataTable} alt="empty"/>
                <h2 className={productStyles.lightGrey +" mt-5 font-semibold text-lg"}>No Content has been added yet</h2>
            </div>
            <div className="flex flex-col mt-7 pb-8 items-center">
                <h2 className={productStyles.lightGrey +" font-semibold text-center text-base"}>Almost there, now click the button to start your membership setup.</h2>
                <div className={styles.saveButton}>
                    <Button
                        onClick={()=> setFields('adding section')}
                        type="primary"
                    >+ Add Content</Button>
                </div>
			</div>
            </>}
            {fields === 'adding section' && <AddSection setMajorPage={setMajorPage} setIsTabsActive={setIsTabsActive}/>}
        </div>
  )
}