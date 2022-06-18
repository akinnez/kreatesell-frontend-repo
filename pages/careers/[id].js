import React, {useState} from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import Image from "next/image"

import useSWR from "swr";
import axios from 'axios';

import ApiService from 'utils/axios'
import Spinner from "components/Spinner";
import styles from "../../public/css/Career.module.scss";
import {CareerNavigationCard, TitleDescription, TitleDescriptionList} from "../../components/careers";
import {
    Layout,
    CareersForm,
    Modal,
    Button
} from "../../components";
import {CareerSuccess, CareerFailure} from "../../utils";

const responsibilities = [
    "Manage end-to-end performance marketing across the customer lifecycle (acquisition, activation, retention, revenue, and referral)",
    "Own paid and organic growth strategy, from concept to completion.",
    "Understand traditional and emerging channels used for acquiring and retaining customers, including some combination of SEM, programmatic Display, Paid Social, and offline channels.",
    "Build-out paid acquisition strategy; report on and calculate the success of (e.g. ROI), and make recommendations for improvement",
    "Develop retention and loyalty strategy, including building-out communication touch-points across multiple channels (email, push, WhatsApp, Telegram etc) and implementing an ESP/Marketing Automation platform of choice."
]

const metrics = [
    "Define measurements of success (KPIs) for campaigns, develop a testing framework, and analyze data to understand the impact of new channels",
    "Define growth and performance benchmarks and establish analytics and reporting for channels",
    "Build growth models using organic and paid growth loops",
    "Create reporting dashboards and share relevant insights regularly with internal teams",
    "Communicate growth performance to executive leadership to promote a shared understanding of performance marketing strategy, ROI, and opportunities."
]

const requirements = [
    "2+ years experience in growth marketing, performance marketing, digital marketing or relevant role and must have sold or been selling a digital or physical product on the internet in whatever scale.",
    "Experience in Google Analytics and comfortable with other analytics tools.",
    "Project management skills with the ability to work independently and cross-collaboratively in a fast-paced environment.",
    "Strong written and verbal communication skills with the ability to compile and present cohesive reports with clear action items and insights.",
    "Hands-on experience with paid acquisition channels (e.g. Google Ads, Facebook Ads Manager, etc) is a plus.",
    "Experience with SaaS products that have mobile, desktop app assets is a plus."
]

const attributes = [
    "A public speaker with a good stage presence and can close the audience to make a decision.",
    "Unique thinker and collaborator who can engage others.",
    "Entrepreneurial instincts: you are a proactive self-starter with a solution-oriented attitude.",
    "Insatiable drive to succeed.",
    "Solicits and welcomes feedback.",
    "You are passionate about Marketing and Marketing tech. You keep up to date with the industry, its latest trends, and platforms.",
    "You have experience working with multiple marketing functions such as brand and content and can connect the dots between programs to. create full-funnel marketing campaigns."
]

const instructions = [
    "Complete all the required questions.",
    "Click the Submit Application button when done."
]

export default function Career () {
    const Router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [jobStatus, setJobstatus] = useState("failure")
    const [loading,setLoading] = useState({
        submitting:false,
      })
    const fetcher = ()=>axios.get(`${process.env.BASE_URL}admin/SingleJobRole?jobId=${Router.query.id}`)
                        .then((res)=> res?.data?.data)
                        .catch((err)=>{
                        // console.log(err)
                        })
    const {data: job, error} = useSWR(
        `${process.env.BASE_URL}admin/SingleJobRole?jobId=${Router.query.id}`,
        fetcher
        );
    const handleSubmit = (values, file) => {
        setLoading({submitting: true});
        var formData = new FormData();
            formData.append("JobsId", Router.query.id);
            formData.append("FirstName", values.first_name);
            formData.append("LastName", values.last_name);
            formData.append("Email", values.email);
            formData.append("Phone", values.phone);
            formData.append("FaceBookProfile", values.facebook);
            formData.append("InstagramProfile", values.instagram);
            formData.append("LinkedInProfile", values.linkedin);
            formData.append("Achievement",values.achievement);
            formData.append("WorkExperience", values.experience);
            formData.append("Location", values.location);
            formData.append("Gem", values.personality);
            formData.append("Consent", true);
            formData.append("portfolio", file.portfolio);
            formData.append("Files", file.fit);
            formData.append("Files", file.resume);
            
            ApiService.request(
            'post',
            '/admin/Apply/Jobs',
            ({data}) => {
                setLoading({submitting: false});
                setJobstatus("success");
                setShowModal(true);
                // console.log(data);
            },
            (err) => {
                setLoading({submitting: false});
                setJobstatus("failure");
                setShowModal(true);
                console.log(err.message || err.data)
            },
            formData
        )
    }

    if(!job && !error) {
        return(
            <Layout subFooter={false} defaultMarginTop={true}>
                <Head>
                    <title>KreateSell | Job</title>
                </Head>
                <div style={{paddingTop: "10px",height:"calc(100vh - 107px)"}}>
                    <Spinner />
                </div>
            </Layout>
        ) 
    }
    console.log(job);
    // if(error) return <h3>Error</h3>
  return (
      <>
    <Layout subFooter={false} defaultMarginTop={true}>
        <div className={styles.container}>
          <CareerNavigationCard 
            department={job.category}
            role={job.title} 
            description={`${job.location} | ${job.contract_type}`}
          />
          <div className={styles.body}>
            <section className={styles.role}>
                <TitleDescription 
                    title={`${job.title} at Kreatesell`}
                    description={`${job.description1}`}  
                />
            </section>
            <section className={styles.about}>
            <TitleDescription 
                title='About Growth Marketer Role'
                description="We are looking for a Growth Marketer to join our Marketing team and develop a strategy for exponential business growth at launch and as we scale.
                <br/><br/>
                If you're data-enthusiast, energetic, Comfortable working in a fast-paced, deadline-driven environment, don't need un-ending supervision and are confident of your abilities
                <br/><br/>
                If you answered YES to these questions, we will like you onboard our growing team.
                <br/><br/>
                You will start work as soon as the selection process is completed.
                "    
            />
            </section>
            <section className={styles.benefits}>
                <TitleDescriptionList
                    title="Benefits"
                    subtitle={null}
                    list={["Attractive Salary","Provision of quality Health Insurance.","Access to Certification Training Materials.","Conducive Work Environment.","Flexible office time."]}
                />
            </section>
            <section className={styles.responsibilities}>
                <TitleDescriptionList
                    title="Job Responsibilities"
                    subtitle={`As a ${job.title} at Kreatesell, you will:`}
                    list={job.responsibilities || []}
                />
            </section>
            {Array.isArray(job.metrics) && job.metrics.length>0 && <section className={styles.metrics}>
                <TitleDescriptionList
                    title="Metrics, Testing and Reporting:"
                    subtitle={null}
                    list={job.metrics ||[]}
                />
            </section>}
            {Array.isArray(job.requirements) && job.requirements.length>0 && <section className={styles.requirements}>
                <TitleDescriptionList
                    title={"Job Requirements"}
                    subtitle={`Our ideal ${job.title} at Kreatesell should have:`}
                    list={job.requirements||[]}
                />
            </section>}
            {Array.isArray(job.attributes) && job.attributes.length>0 && <section className={styles.attributes}>
                <TitleDescriptionList
                    title={"Your Attributes:"}
                    subtitle={null}
                    list={job.attributes||[]}
                />
            </section>}
            {Array.isArray(job.instructions) && job.instructions.length>0 && <section className={styles.instructions}>
                <TitleDescriptionList
                    title={"Important Instructions To Follow!"}
                    subtitle={null}
                    list={job.instructions || []}
                    isNumberList={true}
                />
            </section>}
          </div>
            <section id="CareerPageForm" className={styles.form}>
                <CareersForm submitCB={handleSubmit} jobID={Router.query.id} loading={loading}/>
            </section>
        </div>

    </Layout>
    <Modal
        onClose={()=> setShowModal(false)}
        visible={showModal}
        cancelPropagation={true}
        containerStyle={styles.modalContainer}
        className={styles.modalOuterContainer}
        closeButton={true}
        closeBtnAction={()=>setShowModal(false)}
    >
        <ApplicationStatusModal status={jobStatus} closeModal={()=>setShowModal(false)}/>
    </Modal>
    </>
  )
}

const statusObj = {
    success:{
        icon: CareerSuccess,
        applicationStatus:"Application Submitted Successfully",
        description: "Thank you for applying. Your application would be reviewed and a<br/> member of our recruitment team would contact you with further<br/> instructions if you are successful.",
        btnClassName: styles.successButtonClassName,
        btnText: "Home",
        }, 
    failure:{
        icon: CareerFailure,
        applicationStatus:"Application Failed",
        description: "Sorry, we encountered a problem in submitting you application.<br/> Please, try again.",
        btnClassName: styles.failureButtonClassName,
    }
}
const ApplicationStatusModal = ({status="success", closeModal}) => {
    const Router = useRouter();
    return(
        <div className={styles.modalBody}>
            {/* icon */}
            <Image
                src={statusObj[status].icon}
                alt="status Icon"
                width={150}
                height={200}
            />
            <h3 className={styles.status}>{statusObj[status].applicationStatus}</h3>
            <p 
                className={styles.description} 
                dangerouslySetInnerHTML={{__html: statusObj[status].description}}
            />
            {
                status === "success" ? (
                    <Button
                        text={"Home"}
                        bgColor="blue"
                        className={styles.btnCont}
                        loading={false}
                        onClick={()=>Router.push("/careers")}
                    />
                ): (
                    <Button
                        text={"Try Again"}
                        className={styles.errorBtnCont}
                        loading={false}
                        onClick={closeModal}
                    />
                )
            }
        </div>
    )
}