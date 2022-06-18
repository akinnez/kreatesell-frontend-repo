import {useRouter} from 'next/router'
import PreviewHeader from 'components/Preview/PreviewHeader';
import {GetProductByID} from 'redux/actions'
import { useEffect, useState } from 'react';
import PreviewContent from 'components/Preview/PreviewContent';
import AuthLayout from "../../../../../components/authlayout";
import {ExternalLink} from 'utils'

export default function PreviewProduct (){
    const router = useRouter()
    const [mainId, setMainId] = useState('')
    const getProductByID = GetProductByID();
    
    useEffect(()=>{
        const {id} = router?.query
        if(id){
            getProductByID(id)
            setMainId(id)
        }
    }, [router])

    return (
        <AuthLayout>
            <div style={{position: "absolute",background:"#e5e5e5", left:0, top: 0, width: "100%", }}>
                <PreviewHeader id={mainId} />
                <PreviewContent />
            
            </div>
        </AuthLayout>
    )
} 
