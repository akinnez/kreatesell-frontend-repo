import React,{useMemo, useState} from 'react'
import Image from "next/image";
import Link from "next/link"

import {Col, Row} from "antd";
import useSWR from "swr";
import axios from "axios"

import People from "../../public/images/People.png";
import {Card, PositionHeader, PositionsCard} from "../../components/careers";
import {
    Layout,
} from "../../components";


import styles from "../../public/css/Careers.module.scss";
import {
  Accommodation,
  Bag,
  Box,
  Building,
  FlexibleOffice,
  House
} from "../../utils";

const Benefits = [
  {
    
    Icon: <Image src={House} alt="" width="60"/>,
    title: "Bonuses",
    description:"We provide bonuses including team eat outs, birthday celebrations, end of the year hangouts, give aways and other team bonding activities."
  },
  {
    Icon: <Image src={Box} alt="" width="60"/>,
    title: "Quality Health Insurance",
    description:"\"Health is wealth.\" We care about the health of the team as good health leads to better overall performance."
  },
  {
    Icon: <Image src={Bag} alt="" width="60"/>,
    title: "Access to Certification Training Materials",
    description:"We are growth oriented and make sure that skill gaps within the team are closed. We ensure that the team members are up to date in their area of expertise."
  },
  {
    Icon: <Image src={Building} alt="" width="60"/>,
    title: "Conducive Work Environment",
    description:"We provide a work environment that is friendly, boosts creativity, promotes individuality, strengthens team work and increases overall productivity."
  },
  {
    Icon: <Image src={FlexibleOffice} alt="" width="60"/>,
    title: "Flexible Office <br/> Time",
    description:"We provide work-life balance to ensure that the team is more productive and are not lacking behind in any area of life."
  },
  {
    Icon: <Image src={Accommodation} alt="" width="60"/>,
    title: "Suitable Accommodation",
    description:"We ensure that team members are well taken care of and have a convenient place to rest and recharge after a day of great work."
  },
]

const Careers = () => {
  const [sortedJobs, setSortedJobs] = useState([]);
  const fetcher = ()=> axios.get(`${process.env.BASE_URL}admin/Open`)
                       .then((res)=> res?.data?.data)
                       .catch((err)=>{
                         console.log(err)
                       })
  const {data: jobs, error} = useSWR(
    `${process.env.BASE_URL}admin/Open`,
    fetcher
  );


  function organizeOpenPositions(){
    let allJobs = [];
    if(Array.isArray(jobs) && jobs?.length > 0){
      let oneDepartmentObj = {}
      jobs?.forEach((job)=>{
        let found = [...allJobs].some(jb=> {
          if(job.category){
            return jb.category?.trim() === job.category?.trim();
          }
        });
        if(found){
          let index = allJobs.findIndex((jobIdx)=> jobIdx.category.trim() === job.category.trim());
          allJobs[index].jobs.push(job);
        }else if(!found){
          oneDepartmentObj.category = job.category;
          oneDepartmentObj.jobs = [job];
          allJobs.push({...oneDepartmentObj});
        }
      })
    } 
    setSortedJobs(allJobs);
  }


  useMemo(()=>organizeOpenPositions(), [jobs]);

  return (
    <Layout subFooter={false} defaultMarginTop={true}>
        <div className={styles.container}>
            <div className={styles.body}>
                <div className={styles.header}>
                    <h1>
                    Jobs At Kreatesell
                    </h1>
                    <p className={styles.subHeader}>
                    Join us at Kreatesell, and contribute your quota in helping Kreators (Content Creators and <br/> digital Entrepreneurs) sell to a global audience hassle-free! 
                    </p>
                    <p className={styles.mobileSubHeader}>
                    Upload your Ebooks, Online Courses, Video Courses, Subscription
                    plans, and Memberships in an online all-in-one platform for free
                    and accept payment from anywhere in the world.
                    </p>
                    <Link href={"#departments"}>
                      <a className={styles.jobOpeningsBtn}>See Job Openings</a>
                    </Link>
                </div>
                <section className={styles.benefits}>
                    <h3 className={styles.benefitsTitle}>
                        Benefits
                    </h3>
                    <p className={styles.benefitsSubtitle}>
                    In addition to a competitive salary, here&apos;re a few resources we offer to<br/> help our team excel.
                    </p>
                    <div className={styles.cardContainer}>
                    <Row gutter={[16, 16]}>
                    {/* xs={6} is equivalent to xs={{span: 6}} */}
                    {Benefits.map((ben, idx)=>(
                        <Col key={idx} xs={24} md={8}>
                          <Card Icon={ben.Icon} title={ben.title} description={ben.description}/>
                        </Col>
                    ))}
                        
                    </Row>
                    </div>
                </section>
              
              </div>
                <section className={styles.peopleImageContainer}>
                    {/* image of people comes here */}
                    <div className={styles.peopleImage}>
                      <Image objectFit='contain' src={People} width={700} height={400} alt="people"/>
                    </div>

                </section>

              
              <div className={styles.body2} id="departments">
                <section className={styles.openPositions} >
                    <h3 className={styles.openPositionsTitle}>
                        Open Positions
                    </h3>
                    <p className={styles.openPositionsSubtitle}>
                    Come join our team
                    </p>
                    <div className={styles.departments}>
                    {sortedJobs.length>0 && sortedJobs.map((sJb,idx)=>(
                      <div key={idx} className={styles.department}>
                          <div className={styles.nameActionSection}>
                          <PositionHeader title={sJb.category} roles={`${sJb.jobs.length} open roles`} />
                          </div>
                          {Array.isArray(sJb.jobs) && sJb.jobs.map((job,idx2)=>(
                            <PositionsCard
                              key={job?.id}
                              title={job?.title||""}
                              description={job?.description1}
                              roles={Array.isArray(job.role) ? job?.role :[]}
                              path={`/careers/${job?.id}`}
                            />
                          ))}
                      </div>
                    ))}
                      {/* <div className={styles.department}>
                          <div className={styles.nameActionSection}>
                          <PositionHeader title="Marketing" roles="2 open roles" />
                          </div>
                          <PositionsCard
                            title="Growth Marketer"
                            description="As a Growth Marketer with Kreatesell, you'll be the driving force behind
                             our digital marketing campaigns. You'll develop, implement, track and optimise digital
                              outreaches across several platforms. You'll take charge of all our marketing channels
                               and measure their success. Also, you'll be in charge of coming up with a digital
                                marketing strategy that supports Kreatesell's business goal.<br/><br/> 
                            Your job includes acquiring, retaining, gaining customers' loyalty, and getting them to Sign Up 
                            on the platform. You'll work closely with the content team to craft beautiful and compelling stories
                            for Kreatesell's campaigns. Ultimately, your job is to make sure our message reaches the right audience
                              so that Kreatesell can experience rapid growth."
                            roles={["Management", "Full time", "Nigeria"]}
                            path={"/careers/Career1"}
                          />
                          <PositionsCard
                            title="Traffic/Media Buyer"
                            description="As a Traffic/Media Buyer, your job would be to negotiate and buy advertising space to get users on Kreatesell. You will ensure that our adverts reach the right target audiences through high-quality media channels at the lowest prices possible. You should be a critical thinker and an effective negotiator to do well in this role. You should be able to establish trust and build rapport with clients and media professionals. 
                            <br/><br/>
                            If you have a vast knowledge of popular media channels and advertising options, we would like to meet you. Your goal would be to make the best use of advert exposure and outdo competition while staying within Kreatesell’s budget.
                            "
                            roles={["Management", "Full time", "Nigeria"]}
                            path={"/careers/Career5"}
                          />
                      </div>

                      <div className={styles.department}>
                          <div className={styles.nameActionSection}>
                          <PositionHeader title="Management" roles="2 open roles" />
                          </div>
                          <PositionsCard
                            title="Chief of Staff"
                            description="As the Chief of Staff of Kreatesell, your job would be to act as the right hand to the Management, safeguard their time, provide directions that would drive the Kreatesell team forward, while also acting as the glue to ease communications and unite everyone in the team. You would make the Kreatesell team more productive by taking on high-level responsibilities. These include streamlining strategic initiatives, overseeing project management, and communicating objectives between our different departments. 
                            <br/><br/>
                            As an ideal candidate, you should have proven experience(s) in a business management role, with a special focus on executive-level advising and interdepartmental collaboration.
"
                            roles={["Management", "Full time", "Nigeria"]}
                            path={"/careers/Career2"}
                          />
                          <PositionsCard
                            title="Executive Assistant"
                            description="As an Executive Assistant with Kreatesell, you should know the importance of concise communication. Your job would be to provide focused assistance to the Management, with daily tasks and communication while serving as the point of contact between executives and employees. This position demands that you have great communication skills, flexibility, proactivity with logistics, and efficiency, with demands and expectations that are prone to change on a day-to-day basis. 
                            <br/><br/>
                            To be eligible, you should have the ability to learn concepts and processes quickly. You are expected to keep calm in the face of pressure, while keeping operations smooth and efficient, in all areas.
"
                            roles={["Management", "Full time", "Nigeria"]}
                            path={"/careers/Career4"}
                          />
                      </div>

                      <div className={styles.department}>
                          <div className={styles.nameActionSection}>
                          <PositionHeader title="Product Development" roles="1 open role" />
                          </div>
                          <PositionsCard
                            title="Full-stack Developer"
                            description="As a Full-Stack Developer with Kreatesell, you should be someone who can work on both the back-end and front-end of systems. This means that you can develop fully-fledged platforms (with databases, servers and clients) which don’t need other applications to function. 
                            <br/><br/>
                            To be eligible for this role, you should be able to approach software holistically as you would be catering for both user experience and functionality. You should know and be able to use a range of different technologies and languages (such as Java, JavaScript, HTML, PHP, C#, etc.) to develop software and applications. 
"
                            roles={["Product Development", "Full time", "Nigeria"]}
                            path={"/careers/Career3"}
                          />
                      </div>

                      <div className={styles.department}>
                          <div className={styles.nameActionSection}>
                          <PositionHeader title="Content Marketing" roles="3 open roles" />
                          </div>
                          <PositionsCard
                            title="Copywriter/Content Strategist "
                            description="At Kreatesell, we are looking out for a Copywriter/Content Strategist who would lead our creative content marketing efforts. In this role, you would be writing original copies for our advertising campaigns. You would also be maintaining brand consistency and planning a content strategy to distribute content across different online media channels. 
                            <br/><br/>
                            If you have at least 3 years of experience creating engaging web content, writing actionable copies, and creating content strategies that work, we’d like to meet you. 
                            "
                            roles={["Content Marketing", "Full time", "Nigeria"]}
                          />
                          <PositionsCard
                            title="Video Production Assistant "
                            description="As a video production assistant with Kreatesell, you would be working as a part of the Content team to produce quality video content. Your job functions would include setting up camera, lighting and audio equipment, filming, and post-production editing. In this role, you would be required to both produce live broadcasts of events and create recorded video content for later use.
                            <br/><br/>
                            If you have experience(s) with video production and editing, we would love to hear from you. Also, we would love to see a portfolio of the previous works you have done. Kindly send the link, alongside your application.
                            "
                            roles={["Content Marketing", "Full time", "Nigeria"]}
                            path={"/careers/Career8"}
                          />
                          <PositionsCard
                            title="PR & Social Media Marketing Manager"
                            description="As a PR & Social Media Marketing Manager with Kreatesell, you would be using social media platforms (such as Facebook, Instagram, Twitter, LinkedIn, etc.) to promote Kreatesell’s brand. You would be posting highly engaging promotional content, as well as interacting with our new and existing audience, and getting them to take action.
                            <br/><br/>
                            To qualify for this role, you should have vast experience in Community Management. You should understand the creative, analytical and managerial aspects of Social media marketing and be good with collaboration and Teamwork. If you meet these criteria, we would love to hear from you.
                            "
                            roles={["Content Marketing", "Full time", "Nigeria"]}
                            path={"/careers/Career9"}
                          />
                      </div>

                      <div className={styles.department}>
                          <div className={styles.nameActionSection}>
                          <PositionHeader title="Relationship Management" roles="1 open role" />
                          </div>
                          <PositionsCard
                            title="Customer Success/Business Relationship Agent"
                            description="At Kreatesell, we are looking out for a Copywriter/Content Strategist who would lead our creative content marketing efforts. In this role, you would be writing original copies for our advertising campaigns. You would also be maintaining brand consistency and planning a content strategy to distribute content across different online media channels. 
                            <br/><br/>
                            If you have at least 3 years of experience creating engaging web content, writing actionable copies, and creating content strategies that work, we’d like to meet you. 
                            "
                            roles={["Relationship Management", "Full time", "Nigeria"]}
                            path={"/careers/Career7"}
                          />
                      </div> */}
                    </div>
                </section>
<br/><br/>
            </div>


            </div>

    </Layout>
  )
}

export default Careers;