import { Button, Form, Input, Modal, Select } from "antd";
import Image from "next/image";
import { ProductHeaderLogo, CopyLink } from "utils";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ArrowLeft } from "utils";
import styles from './PreviewHeader.module.scss'
import CloseIcon from "components/affiliates/CloseIcon";

export default function PreviewHeader (){
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState('')
    const { product } = useSelector(
        (state) => state.product
      );
    const {Option} = Select
    useEffect(()=>{
        setTitle( product?.product_details?.product_name)
    }, [product])
    return (
    <header className='flex items-center justify-between bg-white px-10 py-6 '>
        <div className='flex items-center'>
            <div className='flex'>
                <Image src={ProductHeaderLogo} alt="logo" />
            </div>
            <div className="inline-flex ml-8 mr-10 justify-start cursor-pointer items-center">
                    <Image alt="" src={ArrowLeft} />
					<h3 className="uppercase text-blue-600 font-semibold text-base mb-0 ml-3">Back</h3>
			</div>
            <p className="mb-0 capitalize">{title}</p>
        </div>
        <div className={styles.miniSaveButtons +' flex self-end'}>
            <Button type='default' icon={<Image src={CopyLink} alt="copy" />}>Copy Link</Button>
            <Button type='primary'>Exit Preview</Button>
            <Button type='primary' onClick={()=>setIsOpen(true)}>Publish</Button>
        </div>
        {isOpen && <Modal title={null}
            footer={null}
            visible={isOpen}
            onCancel={() => setIsOpen(false)}
            // maskClosable={false}
            closeIcon={<CloseIcon />}
            // className={styles.affiliate__modal}
        >
          <div className={styles.publishModal + " p-5"}>
              <h2 className="mb-4 text-lg font-semibold">Publish</h2>
              <Form layout="vertical">
                    <Form.Item label={<h2 className="font-semibold text-sm mb-0">Product Link</h2>}>
                        <div className={styles.copyInput + " flex"}>
                            <Input bordered className="rounded-lg" placeholder="https://kreatesell.com/land-of-hope.com"/>
                            <span>
                                <Image src={CopyLink} alt="copy" />
                            </span>
                        </div>
                    </Form.Item>
                    <Form.Item label={<h2 className="font-semibold text-sm mb-0">Domain name</h2>}>
                        <Select defaultValue="jh">
                            <Option value="jh" >https://horlard/kreatsell.com</Option>
                        </Select>
                    </Form.Item>
                    <p style={{marginTop: "-15px"}} className="text-xs font-normal">Will you like to customize your domain? You can do that <a href="#">here</a> </p>
                    <div className={styles.submitBtn}>
                        <Button type="primary" htmlType="submit">
                            Publish
                        </Button>
                    </div>
              </Form>
          </div>
        </Modal>}
    </header>
    )
}