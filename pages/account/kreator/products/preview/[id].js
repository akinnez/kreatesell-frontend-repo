import {useRouter} from 'next/router'
import PreviewHeader from 'components/Preview/PreviewHeader';
import {GetProductByID} from 'redux/actions'
import { useEffect } from 'react';
import PreviewContent from 'components/Preview/PreviewContent';
import AuthLayout from "../../../../../components/authlayout";
import {ExternalLink} from 'utils'

export default function PreviewProduct ({id}){
    const router = useRouter()
    const getProductByID = GetProductByID();
    
    useEffect(()=>{
        getProductByID(id)
    }, [id])
    return (
        <AuthLayout>
            <div style={{position: "absolute",background:"#e5e5e5", left:0, top: 0, width: "100%", }}>
                <PreviewHeader id={id} />
                <PreviewContent />
            
            </div>
        </AuthLayout>
    )
} 

export async function getServerSideProps({query: {id}}){
    return {
        props: {
            id
        }
    }
}