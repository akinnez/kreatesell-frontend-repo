import React from 'react'
import {Collapse} from "antd";
import styles from "./Index.module.scss";


const Affiliate = ({questions}) => {
    const {Panel} = Collapse;
    return (
      <div className={styles.tabContainer}>
          <h3 className={styles.title}>
              Affiliate
          </h3>
          <Collapse expandIconPosition="right" bordered={false} defaultActiveKey={['0']}>
            {questions.map(({question, answer}, idx)=>(
                <Panel className={styles.panelHeader} header={question} key={idx}>
                    <div className={styles.answer} >{answer}</div>
                </Panel>
            ))}
          </Collapse>
      </div>
      )
}

export default Affiliate