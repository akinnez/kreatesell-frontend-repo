import React, {useState} from 'react'

import { Row,Col,Form,Input as AntInput } from 'antd';

import {Input,Button} from "../form-input"
import {Checkbox} from "../"
import {DropzoneV2} from "../form-input/UploadV2";
import styles from "../../public/css/CareersForm.module.scss";
import { number } from 'yup/lib/locale';


export const CareersForm = ({submitCB, loading}) => {
  const [form] = Form.useForm();
  const [allowConsent, setAllowConsent] = useState(false);

  const [errors, setErrors] = useState({});
  const [file,setFile] = useState({
    fit:"",
    resume:""
})


  const handleSubmit = (values) =>{

    if(!file.resume){
      setErrors((prev)=>({...prev, resume:"Resume is required"}))
      return;
    }else{
      submitCB && submitCB(values, file)
    }
  }
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Apply for this Job</h3>
      <Form 
        layout="vertical"
        onFinish={(values)=>handleSubmit(values)}
        form={form}  
      >
        <Input
          name="first_name"
          label="First Name"
          placeholder="Enter your first name"
          rules={[
            {required:true, message:"First name required"},
            {
              pattern: new RegExp(/^[A-Za-z]+$/),
              message: "Only letters are accepted"
            }]}
        />
        <Input
          name="last_name"
          label="Last Name"
          placeholder="Enter your last name"
          rules={[
            {required:true, message:"Last name required"},
            {
              pattern: new RegExp(/^[A-Za-z]+$/),
              message: "Only letters are accepted"
            }
          ]}
        />
        <Input
          name="email"
          label="Email"
          placeholder="Enter your first name"
          rules={[
            {
              type: "email",
              message: 'The input is not valid E-mail!'
            },
            {
              required:true,
              message:"Email required"
            },
          ]}
        />
        <Input
          name="phone"
          label="Phone"
          placeholder="Enter your phone number"
          // type="tel"
          // rules={[{type: "number"}]}
        />
        <DropzoneV2 
          variant={3} 
          label={"Resume/CV"}
          onChange={(e)=>setFile({...file, resume: e})}
          name="resume"
          value={file.resume}
          required={true}
          accept="pdf"
          errors={errors}
          extraLabel="*"
        />

        <Row gutter={{ xs: 0, sm: 0, md: 8}}>
          <Col xs={24} md={8}>
            <Input
              name="linkedin"
              label="LinkedIn Profile"
              placeholder=""
              rules={[
                    {required:true, message:"LinkedIn is required"},
                    {pattern: new RegExp(/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm),
                      message:"Please enter a valid link"
                    }
                  ]}
            />
          </Col>
          <Col xs={24} md={8}>
            <Input
              name="facebook"
              label="Facebook Profile"
              placeholder=""
            />
          </Col>
          <Col xs={24} md={8}>
            <Input
              name="instagram"
              label="Instagram Profile"
              placeholder=""
            />
          </Col>
        </Row>

        <Input
          name="location"
          label="Where are you currently based?"
          placeholder=""
          rules={[{ required: true, message:"Location is required"}]}
        />

        <Input
          name="personality"
          CustomInput={AntInput.TextArea}
          row={5}
          label="Clearly, state who you are with respect to personality gems."
          subText="There are 4 personality gems — Sapphire, Pearl, Emerald, and Ruby. Google it to learn more and describe yourself in 3 or more sentences. Not more than 500 words. "
          rules={[{ required: true, message:"Please list your achievements"}]}
        />
        <Input
          name="achievement"
          CustomInput={AntInput.TextArea}
          row={5}
          label="What's one thing you are extremely proud of or what's your greatest achievement?"
          subText="Maybe a cause you stood for, alone or while working with other people. Not more than 500 words."
          rules={[{ required: true, message:"Please list your achievements"}]}
        />
        <Input
          name="experience"
          CustomInput={AntInput.TextArea}
          row={5}
          label="Clearly state why you're a right fit for this job selling yourself with reference to your past work experience."
          subText="Not more than 500 words."
        />
        <Input
          name="portfolio"
          CustomInput={AntInput.TextArea}
          row={5}
          label="Share links to your past and current portfolios."
        />

        <DropzoneV2 
          variant={2}
          onChange={(e)=>setFile({...file, fit: e})}
          name="fit"
          value={file.fit}
          // accept=""
          label={"Optional: Upload a 1-minute audio or video describing why you think you will be a good fit for this role!"}
        />
    
        {/* checkbox */}
        <div className={styles.checkbox}>
            <Checkbox name="rememberMe" onChange={()=>setAllowConsent(prev=> !prev)} />
            <p className={styles.checkboxText}>
            KreateSell has my consent to collect, store, and process my data for the purpose of considering me for employment
            </p>
          </div>
        
        <Button 
          className={styles.greyedBtn} 
          loading={loading?.submitting}
          disabled={!allowConsent}
          htmlType="submit" 
          label="Submit Application"
        />
      </Form>
    </div>
  )
}

