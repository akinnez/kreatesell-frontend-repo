import {Row, Col, Input, Select, Button} from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import styles from './CustomCheckout.module.scss'


export default function CustomCheckoutSelect({title, field, setField}){
    
  const { countries } = useSelector((state) => state.utils);
    const {Option} = Select
    const removeCurrency = (item)=>{
        const filtered = field.filter(i=> i!== item)
        setField(filtered)
    }
    const [newCurrency, setNewCurrency] = useState({
        amount: '',
        currency: ''
    })
    const countriesCurrency = useMemo(()=> countries?.filter(country=> country.currency_id !== null), [countries])
    const addCurrency = ()=>{
        const {amount, currency} = newCurrency
        if(!amount || !currency){
            return
        }
        const newField = [...field, {amount, currency}]
        setField(newField)
        setNewCurrency({
            amount: '',
            currency: ''
        })
    }

    return(
        <div className="">
            <p className="text-base mb-3 font-medium">{title}</p>
            <div className="w-4/5 flex">
                <Select onChange={(e)=>setNewCurrency({...newCurrency, currency: e})} defaultValue="NGN" className={styles.selectButton} >
                    {countriesCurrency.map((country, index)=>(
                        <Option key={index} value={country.currency}>{country.currency}</Option>
                    ))}
                </Select>
                <div className={styles.inputButton}>
                    <Input value={newCurrency.amount} onChange={(e)=>setNewCurrency({...newCurrency, amount: e.target.value})} className='w-24' placeholder='0'/>
                </div>
                <Button onClick={addCurrency} className={styles.addCurrency} type='primary'>+ Add Currency</Button>
            </div>
            <h2 className='text-lg font-medium text-base-gray-200 mt-3 mb-3'>Selected Currencies</h2>
            <div className={styles.currencyField }>
                <Row gutter={[24, 16]}>
                    {field.length > 0 ? field.map((f, i)=>(
                        <div className='mr-3 mb-3' key={i} span={5}>
                            <div className={styles.currencyButtons}>
                                <h2 className='text-gray-500 mb-0 mr-1'>{f.amount}</h2>
                               <h2 className='text-gray-500 mb-0'>{ f.currency}</h2> 
                               <p onClick={()=>removeCurrency(f)} className='text-base mb-1 ml-2'>x</p>
                            </div>
                        </div> 
                    )): <></>}
                </Row>
            </div>
        </div>
    )
}