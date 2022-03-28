// import { Select, Input } from "components";
import { SVGFilter } from "../../utils";
import Image from "next/image";
import { dayOptions, currencyOptions } from "./partials";
import styles from "../../public/css/Dashboard.module.scss";
import { Form, Button, DatePicker, Select, Row, Col, Input } from "antd";
import {useState} from 'react'

export const CouponHeader = ({
	handleSearchInput,
	handleProductStatus,
	handleStartDate,
	handleEndDate,
	handleSearchSubmit,
	productStatusOptions,
}) => {
	const [form] = Form.useForm();
	const [isFiltered, setIsFiltered] = useState(false);

	return (
		<div>
          <Form
            // onFinish={handleSubmitFilter}
            size="large"
			layout="vertical"
            form={form}
          >
            <Row gutter={8} align="bottom" justify="space-between">
				<Col 
				>
					<Form.Item label="Search" name="search">
						<Input placeholder="Click here to Search"/>
					</Form.Item>
				</Col>
              <Col
				span={3}
              >
                <Form.Item label="Show" name="show">
                  <Select
                    // options={showOptions}
                    placeholder="Today"
                    // onChange={handleSelect("show")}
                  />
                </Form.Item>
              </Col>
              <Col
				span={3}
              >
                <Form.Item label="Currency" name="currency">
                  <Select
                    // options={currencyOptions}
                    placeholder="NGN"
                    // onChange={handleSelect("currency")}
                  />
                </Form.Item>
              </Col>
              <Col
              >
                <Form.Item label="From" name="from">
                  <DatePicker
                    placeholder="2021-07-22"
                    // onChange={handleDatePicker("from")}
                    allowClear={false}
                  />
                </Form.Item>
              </Col>
              <Col

              >
                <Form.Item label="To" name="to">
                  <DatePicker
                    placeholder="2021-07-22"
                    // onChange={handleDatePicker("to")}
                    allowClear={false}
                  />
                </Form.Item>
              </Col>
              <Col
			  	span={3}
                className={styles.filter__btn}
              >
                <Form.Item>
                  <Button type="primary" htmlType="submit">
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
        </div>
	);
};
