import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addItem} from '../redux/slices'


export const useQuery = ({path,variables={}, method ="GET"})=>{

    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    const dispatch = useDispatch()
    const store = useSelector(state=>state.store.data)


    const handleQuery = ()=>{
        if(path){
            setLoading(true)
            axios({
                url:process.env.BASE_URL+''+path,
                method,
                data:variables
            }).then(({data,status})=>{
                if(status == 200){
                    const d= {[path]:data}
                    dispatch(addItem(d))
                }
            }).catch((error)=>setError(error))
        }
        }
        

    const hadleRefetch = ()=>{
        if(path){
            axios({
                url:path,
                method,
                data:variables
            }).then(({data,status})=>{
                if(status == 200){
                    const d= {[path]:data}
                    dispatch(addItem(d))
                }
            }).catch((error)=>setError(error))
        }
    }

    const checkStore = ()=>{
        store?.forEach((item)=>{
            if(item.[path]){
            setLoading(false)
            setData(item.[path])
            }
        })
    }
        
    useEffect(()=>{
        checkStore()
    },[store,loading])

    useEffect(()=>{
        handleQuery()
    },[])

 

    return {data,loading,error,refetch:hadleRefetch}
}