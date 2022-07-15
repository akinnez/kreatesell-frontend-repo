import React, {useState} from 'react';
import Head from "next/head";
import Image from "next/image";

import {Card, Row, Col} from "antd";

import {AccordionDown, AccordionRight} from "utils";
import styles from "public/css/PreviewMembership.module.scss";



const PreviewMembership = () => {
    const accordionData = [
        {
          title: 'Section 1',
          subList: [
            {
                question: "what"
            },
            {
                question: "what 2"
            },
          ]
        },
        {
          title: 'Section 2',
          subList: [
            {
                question: "what"
            },
            {
                question: "what 2"
            },
          ]
        },
        {
          title: 'Section 3',
          subList: [
            {
                question: "what"
            },
            {
                question: "what 2"
            },
          ]
        }
      ];
      const Accordion = ({ title, subList }) => {
        const [isActive, setIsActive] = useState(false);
      
        return (
          <div className={styles.accordionItem}>
            <div className={`${styles.accordionTitle} flex  cursor-pointer`} onClick={() => setIsActive(!isActive)}>
              <div className={styles.title} style={{display:"inline-block"}}>{title}</div>
              <div className={styles.icon} style={{display:"inline-block"}}>{isActive ? <Image src={AccordionDown} width={10} height={10} alt=""/> : <Image src={AccordionRight} width={10} height={10} alt=""/>}</div>
            </div>
            {isActive && <div className={styles.accordionContent}>{subList.map(({question}, idx)=>(

                    <div key={idx}>{question}</div>

            ))}</div>}
          </div>
        );
      };
  return (
    <div className={styles.container2}>
        <header>Header</header>
        <section>
        <Row gutter={[16, 16]}>
            <Col span={8} className={styles.left}>
                <Card className={styles.card}>
                    <h1 className={styles.mainTitle}>How to Invest in cryptocurrency</h1>
                    <hr/>
                    <div>
                    <div className={styles.accordion}>
                        {accordionData.map(({ title, subList },idx) => (
                        <Accordion key={idx} title={title} subList={subList} />
                        ))}
                    </div>
                    </div>
                </Card>
            </Col>
            <Col span={16}>
                <Card className={styles.card}>

                </Card>
            </Col>
        </Row>
        </section>
    </div>
  )
}

export default PreviewMembership