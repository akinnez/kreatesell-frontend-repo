import React,{useState,useEffect} from 'react';
import AuthLayout from "../../../../components/authlayout"
import { Row,Spin,Col,Card,Divider,Form,Space,Input as AntInput, } from 'antd';
import {Input,Select,Dropzone,Button} from '../../../../components/form-input'
import style from '../../../../public/css/Store.module.scss'
import ApiService from '../../../../utils/axios'
import { toast } from 'react-toastify';
import {getStore} from '../../../../redux/actions/store.actions'
import { useSelector,useDispatch } from 'react-redux'

const Index = ()=>{
    const [file,setFile] = useState({
        Profile_Picture:"",
        Cover_Picture:""
    })
    const [loading,setLoading] = useState({
        updating:false,
        fetching:true
    })

    const [form] = Form.useForm()


    const handleFinish = (info)=>{
        setLoading({...loading,updating:true})

        const formData = new FormData()
        formData.append("Brand_Name",info.Brand_Name)
        formData.append("Store_Name",info.Store_Name)
        formData.append("Bio_Data",info.Bio_Data)
        formData.append("Country_Id",1)
        formData.append("Cover_Picture",file.Cover_Picture)
        formData.append("Mobile_Number",info.Mobile_Number)
        formData.append("Facebook",info.Facebook)
        formData.append("Instagram",info.Instagram)
        formData.append("LinkedIn",info.Linkedin)
        formData.append("Twitter",info.Twitter)
    
        
           ApiService.request(
            'post',
            'v1/kreatesell/store/onboarding',
            ({data}) => {
                setLoading({...loading,updating:false})
                toast.success("Successful")
            },
            (err) => {
                setLoading({...loading,updating:false})
                toast.error(err)},
            formData
        )
    }


    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.utils) || {}
   

    useEffect(()=>{
        ApiService.request(
            'get',
            'v1/kreatesell/store/me',
            ({data}) => {
                console.log(data?.store_details)
                setLoading({...loading,fetching:false})
                form.setFieldsValue({
                    Brand_Name:data?.store_details?.brand_name,
                    Store_Name:data?.store_details?.store_name, 
                    Bio_Data:data?.store_details?.bio_data,
                    Country_Id:data?.store_details?.country_id, 
                    Mobile_Number:data?.store_details?.mobile_number,
                    Facebook:data?.store_details?.facebook,
                    Twitter:data?.store_details?.twitter,
                    Instagram:data?.store_details?.instagram,
                    Linkedin:data?.store_details?.linked_in})
                    dispatch(getStore({bank_details:data?.bank_details,
                    completed:data?.percentage_completed,
                ...data?.store_details}))
            },
            (err) => {},
        )
    },[])

    return(
        <>
        
        <AuthLayout loading={loading.fetching}>

            <Row>
                <Col span={24}>
                        
                <Card bordered={false} className={style.card}>
                    <h3>Welcome to Kreatesell</h3>
                    <p>Fill out the fields below to complete your profile</p>
               
                    <Form layout="vertical"
                        form={form}
                        onFinish={handleFinish}
                        >
                          <Input
                            name="Brand_Name"
                            label="Name"
                            initialValue={user?.brand_name}
                            extraLabel="- Your unique username or business name"
                            placeholder="Brand name, Business name or Full name"/>
                        <Dropzone
                            onChange={({file:e})=>setFile({...file,Cover_Picture:e})}
                            label="Image"
                            extraLabel="- add image on your cover page"/>
                         <Input
                            name="Bio_Data"
                            CustomInput={AntInput.TextArea}
                            row={5}
                            value={user?.bio_data}
                            label="Description"
                            placeholder="Tell us more about your business. 
                            Buyers are also interested in knowing more about your business uniqueness."/>
                         <Select
                            label="Country"
                            size="large"
                            value={user?.country_id}
                            placeholder="Choose an option"
                            name="Country_Id"/>
                        <Input
                            type="tel"
                            label="Phone Number"
                            placeholder="+234"
                            value={user?.Mobile_Number}
                            name="Mobile_Number"/>
                        <Input
                            label="Facebook"
                            extraLabel="- link to your Facebook account"
                            placeholder="https://facebook.com/"
                            name="Facebook"
                        />
                        <Input
                            label="Instagram"
                            extraLabel="- link to your Instagram account"
                            placeholder="https://instagram.com/"
                            name="Instagram"/>
                        <Input
                            label="LinkedIn"
                            extraLabel="- link to your LinkedIn account"
                            placeholder="https://linkedin.com/"
                            name="Linkedln"/>
                        <Input
                            label="Twitter"
                            extraLabel="- link to your Twitter account"
                            placeholder="https://twitter.com/"
                            name="Twitter"/>

                        <Form.Item>
                            <Button loading={loading?.updating} htmlType="submit" type="primary" label="Save"/>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
            </Row>

        </AuthLayout>
        <style jsx>{`
            .btn-wrapper{
                display:flex;
                gap:15px;
                justify-content:center;
                margin-top:10px;
            }

            .highlight{
                display:flex;
                align-items:center;
                gap:10px;
            }

            #spacer{
                padding:40px 190px 0 190px
            }

            @media screen and (max-width:600px){
                #spacer{
                    padding:0;
                }
            }
        `}</style>
        </>
    )
}

export default Index