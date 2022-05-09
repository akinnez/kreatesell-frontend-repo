import { useState } from "react";
import ManageContent from "./ManageContent";
import ManageSection from "./ManageSection";
import MembershipIndex from "./MembershipIndex";

export default function MembershipTab ({setIsTabsActive}){
    const [majorPage, setMajorPage] = useState('index')
    
    switch (majorPage){
        case "index":
            return (
                <MembershipIndex setMajorPage={setMajorPage} setIsTabsActive={setIsTabsActive} />
            )
        case "manage-section":
            return (
                <ManageSection setMajorPage={setMajorPage} setIsTabsActive={setIsTabsActive} />
            )
        case "manage-content":
            return (
                <ManageContent setMajorPage={setMajorPage} setIsTabsActive={setIsTabsActive} />
            )
    }
}