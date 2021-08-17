import React from 'react';
import AuthLayout from "../../../../components/authlayout"
import {TextInput,Button, TextArea, CustomSelect, FileInput, Uploader} from '../../../../components/inputPack'
import {Formik, Form} from 'formik'
import { Row,Col,Card,Divider } from 'antd';



const Index = ()=>{

    return(
        <>
        
        <AuthLayout>
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