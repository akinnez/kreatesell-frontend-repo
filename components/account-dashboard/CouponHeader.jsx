import Image from "next/image";
import { dayOptions, currencyOptions } from "./partials";
import styles from "../../public/css/Dashboard.module.scss";
import { Form, Button, DatePicker, Select, Row, Col, Input } from "antd";
import {useState} from 'react'
import ResetFilters from "components/ResetFilters";

export const CouponHeader = ({
	handleSearchInput,
	handleProductStatus,
	handleStartDate,
	handleEndDate,
	handleSearchSubmit,
  handleCurrencyChange,
	productStatusOptions,
  resetFilters
}) => {
	const [form] = Form.useForm();
	const [isFiltered, setIsFiltered] = useState(false);
  //   Email: salvoprograms@gmail.com
  // Pass: Salvo$123
  const format = 'YYYY-MM-DD'
	return (
		<div>
          <Form
            onFinish={()=>handleSearchSubmit(()=>setIsFiltered(true))}
            size="large"
			      layout="vertical"
            form={form}
          >
            <Row gutter={4} align="bottom" justify="space-between">
              <Col xs={24} lg={5}>
                <Form.Item label="Search" name="search">
                  <Input onChange={handleSearchInput} placeholder="Click here to Search"/>
                </Form.Item>
              </Col>
              <Col xs={12} lg={4}>
                <Form.Item label="Show" name="show">
                  <Select
                    options={dayOptions}
                    className={styles.selectRadius}
                    placeholder="Today"
                    // onChange={handleSelect("show")}
                  />
                </Form.Item>
              </Col>
              <Col xs={12} lg={4}>
                <Form.Item label="Currency" name="currency">
                  <Select
                    options={currencyOptions}
                    className={styles.selectRadius}
                    placeholder="NGN"
                    onChange={(e)=>handleCurrencyChange(e)}
                  />
                </Form.Item>
              </Col>
              <Col xs={10} lg={3}>
                <Form.Item label="From" name="from">
                  <DatePicker
                    placeholder="2021-07-22"
                    onChange={handleStartDate}
                    format={format}
                    style={{width:"100%"}}
                  />
                </Form.Item>
              </Col>
              <Col xs={10} lg={3}>
                <Form.Item label="To" name="to">
                  <DatePicker
                    placeholder="2021-07-22"
                    onChange={handleEndDate}
                    format={format}
                    style={{width:"100%"}}
                  />
                </Form.Item>
              </Col>
              <Col xs={4} lg={2} className={styles.filter__btn}>
                <Form.Item>
                  <Button type="primary" style={{borderRadius: "8px"}} htmlType="submit">
                    <Image
                      src="/images/FilterIcon.png"
                      alt="Filter icon"
                      width={19}
                      height={16}
                    />
                    &nbsp; Filter
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          {isFiltered && <ResetFilters resetFilters={()=>{
            resetFilters()
            setIsFiltered(false)  
          }} />}
        </div>
	);
};
