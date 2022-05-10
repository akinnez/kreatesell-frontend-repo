import { Button, Form, Input, Modal, Select } from "antd";
import Image from "next/image";
import { ProductHeaderLogo, CopyLink, _copyToClipboard, transformToFormData } from "utils";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ArrowLeft, PublishProduct,
	UnPublishProduct,
    LinkCopy
} from "utils";
import styles from './PreviewHeader.module.scss'
import CloseIcon from "components/affiliates/CloseIcon";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { CreateProduct } from "redux/actions";

export default function PreviewHeader (){
    const [isOpen, setIsOpen] = useState(false)
    const [isResponse, setIsResponse] = useState(false)
    const [isError, setIsError] = useState(false)
    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')
    const [fixedSellingPrice, setFixedSellingPrice]= useState([])
    const { product, loading } = useSelector(
        (state) => state.product
      );
    const {Option} = Select
    const router = useRouter()
    const createProduct = CreateProduct()
    const handleSubmit = (data) => {
        console.log(data)
        const result = transformToFormData(data)
        createProduct(result, ()=>{
            setIsOpen(false)
            setIsResponse(true)
        }, ()=> {
            setIsOpen(false)
            setIsError(true)
        });
      };
        
    const initialValues = {
        "action": "e",
        "minimum_price": 0,
        "is_minimum_price": false,
        "is_show_compare_price": false,
        "pricing_type_id": 1,
        "is_strike_original_price": true,
        "billing_frequency": 0,
        "set_price": true,
        "cta_button": "",
        "number_of_limited_product": 0,
        "who_bear_fee": true,
        "product_settings": {
          "allow_affiliates": false,
          "affiliate_percentage_on_sales": 0,
          "is_limited_sales": false,
          "show_number_of_sales": false
        },
        publish: "live"
      }
      
      const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        validateOnChange: false,
      });
      const populatePricingObject = (currency, price)=>{
        const prices = {
          currency_value: price,
          currency_name: currency
        }
        return prices
      }
    
      const populatePricing = (array)=>{
        for (let values of array){
          switch(values.price_indicator){
            case "Selling":
              const registeredPrice = populatePricingObject(values.currency_name, values.price)
              setFixedSellingPrice(prev => [...prev, registeredPrice])
              break
            default:
              return
          }
        }
      }
      const {setFieldValue, values} = formik
      useEffect(()=>{
          setFieldValue('selling_prices', [...fixedSellingPrice])
      }, [fixedSellingPrice])

    useEffect(()=>{
        setTitle( product?.product_details?.product_name)
        setLink( product?.product_details?.id)
    }, [product])
    
    useEffect(() => {
        if(Object.keys(product).length > 0){
          setFieldValue("product_name", product?.product_details?.product_name);
          setFieldValue('product_details', product?.product_details?.product_details)
          setFieldValue(
            "product_description",
            product?.product_details?.product_description
          );
          setFieldValue("enable_preorder", product?.product_details?.enable_preorder);
          setFieldValue("upload_content", product?.product_details?.upload_content);
          setFieldValue(
            "product_visibility_status",
            product?.product_details?.product_visibility
          );
          setFieldValue("upload_preview", product?.product_details?.is_preview_only);
          setFieldValue(
            "kreatesell_id",
            product?.product_details?.kreasell_product_id
          );
          setFieldValue("product_type_id", product?.product_details?.product_type_id);
          setFieldValue("product_id", product?.product_details?.id);
          setFieldValue(
            "product_listing_status_id",
            product?.product_details?.product_listing_status
          );
          setFieldValue("upload_content", product.product_details.upload_content ? product.product_details.upload_content : false)
          setFieldValue("cta_button", product.product_details.cta_button ? product.product_details.cta_button : "Buy Now")
          if(product.check_out_details && product.check_out_details.length > 0){
            populatePricing(product?.check_out_details)
          }
        //   if(product.product_details.is_allow_affiliate === true){
        //     setAllowAffiliateMarket(true)
        //     setAfiliatePercentage(product?.product_details?.affiliate_percentage_on_sales)
        //   }
        //   if(product.product_details.is_limited_sales === true){
        //     setLimitProductSale(true)
        //   }
        }
      }, [product])


    return (
    <header className='flex items-center justify-between bg-white px-10 py-6 '>
        <div className='flex items-center'>
            <div className='flex'>
                <Image src={ProductHeaderLogo} alt="logo" />
            </div>
            <div onClick={()=>router.back()} className="inline-flex ml-8 mr-10 justify-start cursor-pointer items-center">
                    <Image alt="" src={ArrowLeft} />
					<h3 className="uppercase text-blue-600 font-semibold text-base mb-0 ml-3">Back</h3>
			</div>
            <p className="mb-0 capitalize">{title}</p>
        </div>
        <div className={styles.miniSaveButtons +' flex self-end'}>
            <Button type='default' icon={<Image src={CopyLink} alt="copy" />}  onClick={() => _copyToClipboard(link, "Product Link Copied")}>Copy Link</Button>
            <Button onClick={()=>router.back()} type='primary'>Exit Preview</Button>
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
              <Form layout="vertical" onFinish={formik.handleSubmit}>
                    <Form.Item label={<h2 className="font-semibold text-sm mb-0">Product Link</h2>}>
                        <div className={styles.copyInput + " flex"}>
                            <Input readOnly bordered className="rounded-lg" placeholder={`https://kreatesell.com/${values.kreatesell_id ? values.kreatesell_id: ''}`}/>
                            <span onClick={() => _copyToClipboard(link, "Product Link Copied")} className="cursor-pointer">
                                <Image src={LinkCopy} alt="copy" />
                            </span>
                        </div>
                    </Form.Item>
                    <Form.Item label={<h2 className="font-semibold text-sm mb-0">Domain name</h2>}>
                        <Select defaultValue="jh">
                            <Option value="jh" >{`https://${values.product_name ? values.product_name : ""}/kreatsell.com`}</Option>
                        </Select>
                    </Form.Item>
                    <p style={{marginTop: "-15px"}} className="text-xs font-normal">Will you like to customize your domain? You can do that <a href="#">here</a> </p>
                    <div className={styles.submitBtn}>
                        <Button loading={loading} type="primary" htmlType="submit">
                            Publish
                        </Button>
                    </div>
              </Form>
          </div>
        </Modal>}
        {isResponse && <Modal title={null}
                footer={null}
                visible={isResponse}
                afterClose={()=>console.log('close mo')}
                onCancel={() => setIsResponse(false)}
                closable={false}
            >
            <div className={styles.publishModal + " p-5"}>
                <div className="flex flex-col">
                    <div className={styles.publishImage + " mx-auto"}>
                        <Image layout="fill" src={PublishProduct} alt="publish" />
                    </div>
                    <h1 className="text-2xl text-center my-3 font-bold">{"You've Successfully Published a Product"}</h1>
                    <p className="text-sm text-center my-2 font-normal">{"Congratulations! Your digital product is now live. You can now start earning massively from it."}</p>
                    <div className={styles.submitBtn}>
                        <Button onClick={()=>router.push("/account/kreator/products/all")} className="text-lg h-12" type={"primary"}>
                            { "See Product Listing"}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
        }
        {isError && <Modal title={null}
                footer={null}
                visible={isError}
                onCancel={() => setIsError(false)}
                closable={false}
            >
            <div className={styles.publishModal + " p-5"}>
                <div className="flex flex-col">
                    <div className={styles.publishImage + " mx-auto"}>
                        <Image layout="fill" src={UnPublishProduct} alt="publish" />
                    </div>
                    <h1 className="text-2xl text-center my-3 font-bold">{"Publishing Failed"}</h1>
                    <p className="text-sm text-center my-2 font-normal">{"Oops! We encountered a problem while publishing your product. Please, try again."}</p>
                    <div className={styles.failedBtn}>
                        <Button loading={loading} onClick={()=> formik.handleSubmit()} className="text-lg h-12" type={"danger"}>
                            { "Try Again"}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
        }
    </header>
    )
}