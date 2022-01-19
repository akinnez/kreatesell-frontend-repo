import ApiService from './axios'
import axios from 'axios'


const fetcher = (url)=>{
 
   return ApiService.request('get',url,({data})=>{return data})
 
}

export default fetcher