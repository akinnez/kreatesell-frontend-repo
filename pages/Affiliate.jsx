import React from 'react';
import Image from "next/image";


import {Layout, Button} from "../components";
import styles from "../public/css/Affiliate.module.scss";
import Card from 'components/affiliates/AffiliateLandingPage/Card';
import { YourTurn, MeetAffiliate1, MeetAffiliate2, MeetAffiliate3, RightArrowBlue, RightArrowWhite } from 'utils';
import {useRouter} from 'next/router';


const Affiliate = () => {
  const router = useRouter();
  return (
    <Layout subFooter={false} defaultMarginTop={true}>
    <div className={styles.container}>
    <div className={styles.topContainer}>

        <h2 className={styles.title}>Affiliates</h2>
        <h5 className={styles.subTitle}>Are You Ready To START EARNING MASSIVELY With No Stress At All? </h5>
        <div className={styles.mainBanner}>
            <div className={styles.left}>
            <h2 className='hidden md:block'>
                Become An<br/> Affiliate On<br/> Kreatesell<br/> Now!
            </h2>
            <h2 className='block md:hidden'>
                Become An Affiliate On Kreatesell Now!
            </h2>
            <br/>
            <Button icon={<Image src={RightArrowBlue} alt=""/>} onClick={()=>router.push("/signup")} className={`hidden md:block ${styles.getStarted}`} type='default' text='Get Started Free' style={{minWidth:"150px", minHeight:"50px"}}/>
            </div>
            <div className={styles.right}>
                Kreatesell is a Break-Through SaaS platform for Content Creators and Digital Entrepreneurs (Kreators) to instantly sell their content and digital products to a wide range of global customers.<br/><br/>

                Kreatesell is the First-Of-Its-Kind and has incorporated Simplified tools to help Kreators make Embarrassingly Large sales, even with no Tech/coding skill or experience.<br/><br/>

                As an affiliate, you would be making a Super Powerful impact by providing these Kreators with a constant stream of buying customers, to buy their products on Kreatesell.<br/><br/>

                The best part? You earn AMAZING commissions for everyone who buys using your referral link.<br/><br/>

                Earning has Never Been Easier as it is on Kreatesell. Make Insane Amounts of passive and active income for yourself. <br/><br/>
            </div>
            <Button icon={<Image src={RightArrowBlue} alt=""/>} onClick={()=>router.push("/signup")} className="block md:hidden" type='default' text='Get Started Free  ' style={{width:"90%", minHeight:"60px", margin:"auto", fontSize:"1.25rem"}}/>
        </div>

        {/* learn more */}
        <section className={styles.learnMore}>
            <h3 className={styles.title}>Let&apos;s Learn from Michael&apos;s Story</h3>
            <h5 className={styles.subtitle}>The amazing all-in-one tools that bring a winning customer experience</h5>

            <h2 className={styles.meet}>Meet Micheal !</h2>

            <div className={styles.subSection}>
                <div className={styles.left}>
                <div className={styles.card}>
                    <Card 
                        backgroundColor={'peachBackground'}
                        content={"Michael was always broke. He didn't know how to make money online and went about borrowing money from friends and family, to meet his basic needs."}
                    />
                    <Card 
                        backgroundColor={'greenBackground'}
                        content={"This was quite EMBARRASSING! He thought and decided that he didn't want to continue that way. There had to be a way out!And he found it! "}
                    />
                    <Card 
                        backgroundColor={'blueBackground'}
                        content={"He signed up as a user on Kreatesell. After signing up, he browsed through the products listed, looking for those that offered the BEST commissions to Affiliates."}
                    />
                </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.imageCont}>
                        <Image src={MeetAffiliate1} alt="" />
                    </div>
                </div>
            </div>

            <div className={styles.subSectionV2}>
                <div className={styles.left}>
                    <div className={styles.imageCont}>
                    <Image src={MeetAffiliate2} alt="" />
                    </div>
                </div>
                <div className={styles.right}>
                <div className={styles.card}>
                    <Card 
                        backgroundColor={'greenBackground'}
                        content={"He applied for the offers and his request was approved, he got his unique referral link for each product.<br/><br/>\
                            In Less than 60 days, Michael Blew! \
                            He became A MULTI MILLIONAIRE In Naira!"}
                    />
                    <Card 
                        backgroundColor={'blueBackground'}
                        content={"He had a following on his Facebook, Instagram and Whatsapp status.<br/><br/>\
                            After promoting the links on these platforms, he got so many people to buy - A total of 2,000!\
                            "}
                    />
                    <Card 
                        backgroundColor={'peachBackground'}
                        content={"Let’s break it down,<br/><br/>\
                            He applied as an affiliate for 5 products offering a commission of $10 per product\
                            "}
                    />
                </div>
                </div>
            </div>

            <div className={styles.subSection}>
            <div className={styles.left}>
                <div className={styles.card}>
                    <Card 
                        backgroundColor={'blueBackground'}
                        content={"Got a total of 2,000 people to buy at least one of the products using his affiliate link<br/></br/>\
                        And made a whopping total of $20,000<br/></br/>\
                        That is 10,000,000 when converted to Naira!\
                        "}
                    />
                    <Card 
                        backgroundColor={'peachBackground'}
                        content={"He made commissions on every person who bought through his link and got paid INSTANTLY into his wallet and then, into his registered bank account on our Affiliate payday - every Tuesday! "}
                    />
                    <Card 
                        backgroundColor={'greenBackground'}
                        content={"It was that EASY…<br/></br/>\
                        The best part? The link doesn’t expire. He would earn from anyone who buys using his link in the future.<br/></br/>\
                        Talk about passive income! Isn’t this amazing?? "}
                    />
                </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.imageCont}>
                    <Image src={MeetAffiliate3} alt="" />
                    </div>
                </div>
            </div>

        </section>
    </div>
    <div className={styles.bottomContainer}>
        <section className={styles.yourTurn}>
            <div className={styles.left}>
                <Image
                    src={YourTurn}
                    alt="image"
                    className={styles.image}
                />
            </div>
            <div className={styles.right}>
                <p className='hidden md:block'>
                <span>NOW&nbsp;&nbsp; IT&nbsp;&nbsp; IS&nbsp;&nbsp; YOUR&nbsp;&nbsp; TURN&nbsp;&nbsp; TO&nbsp;&nbsp; MAKE&nbsp;&nbsp; MILLIONS</span><br/> without dropping a sweat!<br/><br/>

                It&apos;s as simple as Sign Up, Get a Unique Link,<br/> Promote and EARN!<br/><br/> 

                You can refer as many people as you want for as<br/> many products as you wish when you sign up as a<br/> User to become an Affiliate on Kreatesell.<br/><br/> 

                You get a unique referral link for every product you<br/> market. And you earn a predetermined commission<br/> for every purchase made using your link.<br/><br/> 

                This is an opportunity you won&apos;t find anywhere!<br/><br/> 

                Start making MASSIVE income through this once-<br/>in-a-lifetime stream of income.

                </p>
                <p className='block md:hidden'>
                <span>NOW IT IS YOUR TURN TO MAKE MILLIONS</span> without dropping a sweat!<br/><br/>

                        It&apos;s as simple as Sign Up, Get a Unique Link, Promote and EARN!<br/><br/> 

                        You can refer as many people as you want for as many products as you wish when you sign up as a User to become an Affiliate on Kreatesell.<br/><br/> 

                        You get a unique referral link for every product you market. And you earn a predetermined commission for every purchase made using your link.<br/><br/> 

                        This is an opportunity you won&apos;t find anywhere!<br/><br/> 

                        Start making MASSIVE income through this once-in-a-lifetime stream of income.

                </p>
            </div>
        </section>
        <section className={styles.signUpSection}>
        <h3 className='hidden md:block'>
            Sign up as a User on Kreatesell to<br/> become an Affiliate NOW!
        </h3>
        <h3 className='block md:hidden'>
            Sign up as a User on Kreatesell to become an Affiliate NOW!
        </h3>

        <Button bgColor="blue" icon={<Image src={RightArrowWhite} alt=""/>} onClick={()=>router.push("/signup")} text='Get Started Free' style={{minWidth:"150px", padding:".8rem"}}/>
        </section>

    </div>
    </div>
    </Layout>
  )
}

export default Affiliate