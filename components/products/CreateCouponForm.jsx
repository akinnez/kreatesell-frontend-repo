import { useFormik } from "formik";
import styles from "./CreateCouponForm.module.scss";
import style from '../../public/css/AllProducts.module.scss'
import {TextInput,
    CustomSelect,
    DatePicker,
    Switch,
    Button
} from '../../components/inputPack'
import { Radio } from 'antd';
import {useState} from 'react'
// import DateTimePicker from 'react-datetime-picker';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'

export const CreateCouponForm = () =>{
    const [isPercentage, setIsPercentage] = useState(true)
    const [isAmount, setIsAmount] = useState(false)
    const [isLimited, setIsLimited] = useState(true)
    const [isUnLimited, setIsUnLimited] = useState(false)
    const [isUsage, setIsUsage] = useState(true)
    const [isUsageUnlimited, setIsUsageUnlimited] = useState(false)
    const [isAllProduct, setIsAllProduct] = useState(true)
    const [dateAndTime, setDateAndTime] = useState(new Date())
    const [toDateAndTime, setToDateAndTime] = useState(new Date())
    const initialValues = {
        "coupon_settings": {
            "coupon_code": "",
            "is_coupon": true,
            "start_date": "",
            "end_date": "",
            "fixed_amount_value": 0,
            "percentage_value": 0,
            "is_percentage": true,
            "is_apply_to_recurring": true,
            "is_fixed_amount": true,
            "is_coupon_limited": true,
            "no_of_frequency": 0,
            "is_usage_limited": true,
            "no_of_usage": 0,
            "is_for_all_product": true,
            "product_id": 0
          },
          "action": "string",
          "coupon_id": 0
    }
    const handleSubmit = (values)=>{
        console.log(values)
    }

    const handleChangeField = (a, b)=>{
        a(true)
        b(false)
    }
    const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		// validationSchema: "",
		validateOnChange: false,
	})
    return(
        <div className={`px-0 lg:px-8 ${styles.container}`}>
            <div className="flex flex-col">
                <h1 className="font-bold text-center text-2xl">Create New Coupon</h1>
                <h3 className={style.lightGrey +" font-semibold text-center text-base"}>Generate a new coupon that drives more sales to your product(s).</h3>
            </div>
            <form className={styles.formContent + " flex flex-col"}>
                <div className="">
                    <TextInput
                        type="text"
                        label="Coupon Code"
                        labelExtra=" Letters and Numbers only!."
                        style={{ width: "100%" }}
                        placeholder="EX: EMBER100"
                    />
                </div>
                <div className="flex flex-col mt-8">
                    <h2 className="font-semibold text-base">Apply Coupon to</h2>
                    <div className="flex items-center">
                        <Radio.Group onChange={(e)=>setIsAllProduct(e.target.value)} >
                            <Radio className={styles.radioContent} value={true} checked={isAllProduct ? true : false}>All Products</Radio>
                            <Radio className={styles.radioContent} value={false} checked={!isAllProduct ? true : false}>Choose Speific Product</Radio>
                        </Radio.Group>
                    </div>
                    <CustomSelect
                        disabled={isAllProduct ? true : false}
                        list={[{value:"Land of Hope and Opportunities", label: "Land of Hope and Opportunities"}, {value:"Multiple wins", label:"Multiple wins"}]}
                    />
                </div>

                <div className="flex flex-col mt-5">
                    <h2 className="font-semibold text-base">Coupon Type</h2>
                    <div className="flex">
                        <div className="col-3">
                            <Radio className={styles.radioContent} onClick={()=>handleChangeField(setIsPercentage, setIsAmount)} checked={isPercentage ? true : false} value={'1'}>Percentage Off</Radio>
                            <TextInput 
                                type="number"
                                placeholder="0"
                                disabled={!isPercentage ? true : false} />
                        </div>
                        <div className="col-3 ml-8">
                            <Radio className={styles.radioContent} onClick={()=>handleChangeField(setIsAmount, setIsPercentage)} checked={isAmount ? true : false}>Amount Off</Radio>
                            <TextInput 
                                type="number"
                                placeholder="0"
                                disabled={!isAmount ? true : false} />
                        </div>
                     </div>
                </div>

                <div className="flex items-center mt-8 mb-3">
                    <div className={`pt-1 w-full flex items-center`}>
                        <h2 className={styles.label + " text-lg mb-0 font-normal"}>From</h2>
                        <div className={styles.inputGroup +" w-full"}>
                            <DateTimePicker className="w-3/4" onChange={setDateAndTime} value={dateAndTime} />
                        </div>
                    </div>
                    <div className={`pt-1 w-full flex items-center`}>
                        <h2 className={styles.label + " text-lg mb-0 font-normal"}>To</h2>
                        <div className={styles.inputGroup +" w-full"}>
                            
                            <DateTimePicker className="w-3/4" onChange={setToDateAndTime} value={toDateAndTime} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-8">
                    <h2 className="font-semib5old text-base">Limit the Frequency of the Coupon</h2>
                    <div className="flex items-center mt-2 mb-4">
                        <div>
                            <Radio className={styles.radioContent} onClick={()=>handleChangeField(setIsUnLimited, setIsLimited)} checked={isUnLimited ? true : false} value={'1'}>Unlimited</Radio>
                        </div>
                        <div className="ml-5">
                            <Radio className={styles.radioContent} onClick={()=>handleChangeField(setIsLimited, setIsUnLimited)} checked={isLimited ? true : false} value={'1'}>Limited</Radio>
                        </div>
                    </div>
                    <TextInput
                        type="number"
                        label="Number of Times"
                        style={{ width: "100%" }}
                        placeholder="1"
                        disabled={isUnLimited ? true : false}
                    />
                </div>
                <div className="flex flex-col mt-8">
                    <h2 className="font-semibold text-base">Limit the Usage per Customer</h2>
                    <div className="flex items-center mb-4">
                        <div>
                            <Radio className={styles.radioContent} onClick={()=>handleChangeField(setIsUsageUnlimited, setIsUsage)} checked={isUsageUnlimited ? true : false} value={'1'}>Unlimited use per Customer</Radio>
                            {/* <Radio value={"not checked"} label="" /> */}
                        </div>
                        <div className="ml-5">
                            <Radio className={styles.radioContent} onClick={()=>handleChangeField(setIsUsage, setIsUsageUnlimited)} checked={isUsage ? true : false} value={'1'}>Coupon can be used how many times by a customer</Radio>
                            {/* <Radio label="" /> */}
                        </div>
                    </div>
                    <TextInput
                        type="number"
                        label="Number of times coupon can be used per customer"
                        style={{ width: "100%" }}
                        placeholder="1"
                        disabled={isUsage ? false : true}
                    />
                </div>
                <div >
                    <Switch className={styles.switchContent} label="Allow Discount to be Applied for Recurring Purchases" />
                </div>
                <Button 
                    className="justify-self-center w-1/3 self-center mt-4"
                    label="Save"
                    
                    />
            </form>
        </div>
    )
}

