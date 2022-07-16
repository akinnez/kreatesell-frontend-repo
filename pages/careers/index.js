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
          let index = allJobs.findIndex((jobIdx)=> jobIdx.category?.trim() === job.category?.trim());
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
                    </div>
                </section>
<br/><br/>
            </div>


            </div>

    </Layout>
  )
}

export default Careers;