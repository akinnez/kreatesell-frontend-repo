import React,{useState,useEffect} from 'react'
import style from './Index.module.scss'
import {Modal, DatePicker,Space,Form,Input as AntInput} from 'antd'
import {Button,Input,Select} from '../form-input'
import { useSelector,useDispatch } from 'react-redux'
import {getBanks} from '../../redux/actions/utilityActions'
import ApiService from '../../utils/axios'
import {toast} from 'react-toastify'


const BankModal = ({open,onClose=()=>{}})=>{
    const [loading, setLoading] = useState({
        banks:false,
        countries:false,
        save:false
    })
    const {countries,banks,bank_details} = useSelector(state=>state.utils) || {}
    const dispatch = useDispatch()
    

    const [form] = Form.useForm()

    const handleBank = (id)=>{
        setLoading({...loading, banks:true})
        form.setFieldsValue({bank_id:""})
        dispatch(getBanks([]))
        ApiService.request(
            "get",
            `v1/kreatesell/utils/get-banks/${id}`,
            (res)=>{
                setLoading({...loading, banks:false})
                const banks = res?.data?.list_of_banks?.map(({id,name})=>({label:name,value:id}))
                dispatch(getBanks(banks))
            },
            (error)=>{
                setLoading({...loading, banks:false})
            }
        )
    }

    const handleSubmit = (info)=>{
        setLoading({...loading, save:true})
        ApiService.request(
            'post',
            'v1/kreatesell/payment/bank-details',
            (res)=>{
                toast.success("Account info saved successfully")
                setLoading({...loading, save:false})
               onClose(false)
            },
            (error)=>{
                setLoading({...loading, save:false})
                toast.error(error?.message)
            },
            info
        )
    }

    useEffect(()=>{
        form.setFieldsValue({
            bank_id:bank_details?.bank_id,
            country_id:bank_details?.country_id,
            account_number:bank_details?.account_number,
            account_name:bank_details?.account_name,
        })
    },[])

    return(
        <>
               
<Modal
    title="" 
    footer={null} 
    width={600} 
    className={style.modal} 
    closable={false} 
    visible={open}
    onCancel={()=>onClose()}
    bodyStyle={{padding:"30px 60px"}}>
        
        <h3 className={style.title}>Provide your Bank details</h3>
        <p className={style.sub_title}>We pay your funds to this account</p>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Select size="large" 
                    label="Select Country"
                    list={countries}
                    onChange={(e)=>handleBank(e)}
                    placeholder="Select country"
                    name="country_id"
                    rules={[{required:true, message:"Country is important"}]}/>
                   

            
                <Select size="large" 
                    label="Select Bank"
                    loading={loading?.banks}
                    list={banks}
                    name="bank_id"
                    placeholder="Select bank"
                    rules={[{required:true, message:"Bank is important"}]}
                   />
                   
         

            
                <Input size="large"
                    label="Account Number" 
                    placeholder="Enter account number"
                    type="number"
                    name="account_number"
                    rules={[{required:true, message:"Account Number is important"}]}/> 

                <Input size="large"
                    label="Account Name" 
                    placeholder="Enter account name"
                    name="account_name"
                    rules={[{required:true, message:"Account Name is important"}]}/> 
            
            <div className={style.alert}>
                
               <p>
                   <b>Be careful</b><br />Make sure your account details are correct before proceeding. 
We will not be held liable for failed transactions resulting from incorrect bank details.</p>
            </div>
            <Input size="large"
                    label="Enter Current password" 
                    placeholder="********"
                    type="password"
                    name="password"
                    rules={[{required:true, message:"Password is important"}]}/>

                    <Form.Item>
                        <div  className={style.btn_wrapper}>
                            <p>Finished adding your account details?</p>
                            <Button htmlType="submit" loading={loading?.save} label="Save Bank Info" type="primary"/>
                        </div>
                    </Form.Item>
        </Form>
      </Modal>
   
        
        </>
    )
}

export default BankModal