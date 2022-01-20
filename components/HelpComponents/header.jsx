import React, { useState } from "react";
import style from "./Header.module.scss";
import { DatePicker, Select, Space, Form, Input as AntInput } from "antd";
import { Button } from "../form-input";
import { FilterIcon } from "../IconPack";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";

const HelpHeader = ({ department }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const fetcher = () =>
    axios
      .get(`${process.env.BASE_URL}admin/DepartmentList`)
      .then((res) => res?.data?.data)
      .catch((err) => {
        setErrorMessage(err.message);
      });

  const { data: departments, error } = useSWR(
    `${process.env.BASE_URL}admin/DepartmentList`,
    fetcher
  );

  return (
    <>
      <div className={style.header_container}>
        <h3>Report an Issue</h3>
        <Button
          onClick={() => router.push(`/account/kreator/help/open-ticket`)}
          type="primary"
          style={{ width: "120px" }}
          label="Open Ticket"
        />
      </div>

      <Form
        layout="vertical"
        style={{ paddingLeft: "10px", marginTop: "20px" }}
      >
        <Space size={18} wrap>
          <Form.Item label="Search" style={{ marginTop: "5px" }}>
            <AntInput
              placeholder="Search"
              size="large"
              className={style.input}
              extraLabel="Search"
            />
          </Form.Item>

          <Select
            placeholder="Department"
            label="Department"
            defaultValue="Department"
            style={{ width: "180px", color: "#8c8c8c" }}
            size="large"
          >
            {departments &&
              departments?.length > 0 &&
              departments?.map((dept) => (
                <Select.Option key={dept.id} value={dept.name}>
                  {dept.name}
                </Select.Option>
              ))}
          </Select>
          <Select
            placeholder="All Ticket"
            label="All Ticket"
            defaultValue=""
            style={{ width: "180px", color: "#8c8c8c" }}
            size="large"
          >
            <Select.Option value="">All Tickets</Select.Option>
            <Select.Option value="Open Ticket">Open Ticket</Select.Option>
            <Select.Option value="Closed Tickets">Closed Tickets</Select.Option>
          </Select>

          <Form.Item label="Show From">
            <DatePicker size="large" className={style.input} />
          </Form.Item>
          <Form.Item label="To">
            <DatePicker size="large" className={style.input} />
          </Form.Item>
          <Form.Item label=" ">
            <Button type="primary" icon={<FilterIcon />} label="Filter" />
          </Form.Item>
        </Space>
      </Form>
    </>
  );
};

export default HelpHeader;
