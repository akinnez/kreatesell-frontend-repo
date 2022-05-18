import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FAQHero, ArrowDown } from "../utils";
import { Layout, Input, Button } from "../components";
import { BackTop, Tabs } from "antd";
import {MdArrowForward} from "react-icons/md";
import Kreator from "../components/faqTabs/Kreator";
import Affiliate from "../components/faqTabs/Affiliate";
import KreatorAffiliate from "../components/faqTabs/KreatorAffiliate";
import Buyer from "../components/faqTabs/Buyer";
import General from "../components/faqTabs/General";
import styles from "../public/css/Faq2.module.scss";
import axios from "axios";

const FAQ2 = () => {
  const [questions, setQuestions] = useState({});

  const {TabPane} = Tabs;

  const backToTopStyle = {
    // backgroundColor: "#0072ef",
    // color: "#ffffff",
  };

  async function getQuestions(){
    try{
      const res = await axios.get("/api/faqs");
      setQuestions(res?.data.items);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
      getQuestions();
  }, [])

  return (
    <Layout defaultMarginTop={true}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <h3>How can we help you?</h3>
            <p>
              Email us at{" "}
              <a target="blank" href="mailto:hello@kreatesell.com">
                hello@kreatesell.com
              </a>{" "}
              if you don&#39;t find an answer here.
            </p>
          </div>
          <div className={styles.heroImage}>
            <Image src={FAQHero} width="366" height="200" alt="" />
          </div>
        </div>

        <div className={styles.backToTop}>
          <BackTop style={backToTopStyle} />
        </div>
        <div className={styles.faq}>
            <h3>Frequently Asked Questions</h3>
            <Input
              type="search"
              placeholder="Search by keyword"
              className={styles.input}
            />

          </div>
      </div>
        <div className={styles.body}>
         
            <div className={styles.groupQuestions}>
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Kreator" key="kreator">
                  <Kreator questions={questions.Kreator||[]}/>
                </TabPane>
                <TabPane tab="Affiliate" key="affiliate">
                  <Affiliate questions={questions.Affiliate||[]}/>
                </TabPane>
                <TabPane tab="Kreator  & Affiliate" key="kreator_affiliate">
                  <KreatorAffiliate questions={questions.KreatorAffiliate||[]}/>
                </TabPane>
                <TabPane tab="Buyer" key="buyer">
                  <Buyer questions={questions.Buyer||[]}/>
                </TabPane>
                <TabPane tab="General" key="general">
                  <General questions={questions.General||[]}/>
                </TabPane>
            </Tabs>
            </div>     
        </div>
        <div className={styles.enjoyBenefits}>
          <h2 className={styles.heading}>
          Enjoy the benefits of multiple <br/> applications in one place!
          </h2>
          <p className={styles.description}>
          Create, manage and promote your entire business with just one login. Just an account connects you to <br/> multiple features like webinar, automation, email marketing, membership billing & much more.
          </p>

          <div className={styles.getStarted}>
            <Input
                type="input"
                placeholder="Enter your email"
                className={styles.input}
            />
            <Button text="Get Started Free" type="button" loading={false} disabled={false} bgColor="primaryBlue" className={styles.button} icon={<MdArrowForward style={{fontSize: "10px", color:"#fff"}}/>} />
          </div>
        </div>
    </Layout>
  );
};

export default FAQ2;
