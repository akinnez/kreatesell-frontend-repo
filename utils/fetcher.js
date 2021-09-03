import ApiService from './axios'
import axios from 'axios'


const fetcher = (url)=>{
 
   return ApiService.request('get',url,(res)=>{return res})
 
}

export default fetcher