import React, { useState, useEffect } from "react";
import AuthLayout from "../../../../../components/authlayout";
import { Card, Row, Col } from "antd";
import style from "../../../../../public/css/OpenTicket.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import { IoMdAdd } from "react-icons/io";
import { Button } from "components/button/Button";
import axios from "axios";

const OpenTicket = ({ department }) => {
  const router = useRouter();

  return (
    <>
      <AuthLayout>
        <div className={style.openTicketTop}>
          <h3 className={style.header}>Open Ticket</h3>
          <p>
            A role provides access to predefined features so that depending on
            the assinged role an administrator can have access to what he needs
          </p>
        </div>
        <div>
          <Row gutter={[5, 5]}>
            {department &&
              department?.length > 0 &&
              department?.map((dept) => (
                <Col
                  xs={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 6 }}
                  xl={{ span: 6 }}
                  key={dept.id}
                >
                  <Card bordered={false} className={style.card}>
                    <h4 className={style.title}>{dept.name}</h4>
                    <Image src="/images/testimg.png" width={250} height={290} />
                    <br />
                    <Button
                      className={style.openTicketBtn}
                      type="button"
                      text="Open Ticket"
                      leftIcon={<IoMdAdd className={style.iconStyle} />}
                      onClick={() =>
                        router.push({
                          pathname:
                            "/account/kreator/help/open-ticket/[department]",
                          query: {
                            department: dept.name,
                          },
                        })
                      }
                    />
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      </AuthLayout>
    </>
  );
};

export default OpenTicket;

export async function getStaticProps() {
  let result = {};
  try {
    result = await axios.get(`${process.env.BASE_URL}admin/DepartmentList`);
  } catch (err) {
    console.log("err", err);
  }

  return {
    props: {
      department: result?.data?.data,
    },
  };
}
