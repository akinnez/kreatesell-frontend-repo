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

  const data = [];

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