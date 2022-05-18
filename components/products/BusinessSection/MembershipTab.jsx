import { useState } from "react";
import ManageContent from "./ManageContent";
import ManageSection from "./ManageSection";
import MembershipIndex from "./MembershipIndex";

export default function MembershipTab ({setIsTabsActive}){
    const [majorPage, setMajorPage] = useState('index')
    const [contentIndex, setContentIndex] = useState(null)
    const [sectionIndex, setSectionIndex] = useState(null)
    const [sections, setSections] = useState([{
        name: "",
        isControl: false,
        lectures: [{lecture_name: "", type:"", size:"", url: '',description:"",isDownload: false}]
        
    }])
    const toSection=(section, sectionIndex, contentIndex)=>{
        setIsTabsActive(false)
        console.log(sectionIndex, contentIndex)
        setMajorPage(section)
        setSectionIndex(sectionIndex)
        setContentIndex(contentIndex)
    }
    switch (majorPage){
        case "index":
            return (
                <MembershipIndex 
                sections={sections}
                toSection={toSection}
                setSections={setSections}
                setMajorPage={setMajorPage}
                setIsTabsActive={setIsTabsActive}
                />
            )
        case "manage-section":
            return (
                <ManageSection
                sections={sections}
                toSection={toSection}
                setSections={setSections} 
                setMajorPage={setMajorPage} 
                setIsTabsActive={setIsTabsActive} 
                />
            )
        case "manage-content":
            return (
                <ManageContent 
                sections={sections}
                contentIndex={contentIndex}
                sectionIndex={sectionIndex}
                setSections={setSections}
                setMajorPage={setMajorPage} 
                setIsTabsActive={setIsTabsActive} 
                />
            )
    }
}