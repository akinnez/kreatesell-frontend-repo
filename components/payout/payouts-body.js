import React from 'react'
import { Table } from 'antd'
import { Button } from '../form-input';
import style from './Index.module.scss'

const columns = [
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customer_name',
    },
    {
      title: 'Customer Email',
      dataIndex: 'customer_email',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
      },
      {
        title: 'Transaction date',
        dataIndex: 'transaction_date',
      },
      {
        title: 'Payment date',
        dataIndex: 'payment_date',
      }
  ];

  const data = [
    {
      key: '1',
      product: 'John Brown',
      customer_name: 'John Brown',
      customer_email: 'mail@mail.com',
      amount: '￥300,000.00',
      transaction_date: '12-12-2021',
      payment_date: '12-12-2021',
    },
    {
        key: '2',
        product: 'John Brown',
        customer_name: 'John Brown',
        customer_email: 'mail@mail.com',
        amount: '￥300,000.00',
        transaction_date: '12-12-2021',
        payment_date: '12-12-2021',
    },
    
  ];

const Index = ()=>{

    return(
      <>
      <div style={{display:"flex",justifyContent:"flex-end",marginTop:"30px"}}>
        <Button type="link" label="Export to CSV"/>
      </div>
        <Table className={style.table}
            columns={columns}
            dataSource={data}
            
        />
      </>
      
    )
}

export default Index