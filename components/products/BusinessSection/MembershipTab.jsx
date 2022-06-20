import { useState } from "react";
import ManageContent from "./ManageContent";
import ManageSection from "./ManageSection";
import MembershipIndex from "./MembershipIndex";

export default function MembershipTab ({setIsTabsActive}){
    const [majorPage, setMajorPage] = useState('index')
    const [content, setContent] = useState(null)

    const toSection=(section, lecture)=>{
        setContent(lecture)
        setIsTabsActive(false)
        setMajorPage(section)
    }
    switch (majorPage){
        case "index":
            return (
                <MembershipIndex 
                toSection={toSection}
                setMajorPage={setMajorPage}
                setIsTabsActive={setIsTabsActive}
                />
            )
        case "manage-section":
            return (
                <ManageSection
                toSection={toSection}
                setMajorPage={setMajorPage} 
                setIsTabsActive={setIsTabsActive} 
                />
            )
        case "manage-content":
            return (
                <ManageContent 
                content={content}
                setMajorPage={setMajorPage} 
                setIsTabsActive={setIsTabsActive} 
                />
            )
    }
}