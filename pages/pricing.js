import { useState, useEffect } from "react";
import { Layout, PricingCard, Select, Button } from "../components";
import styles from "../public/css/Pricing.module.scss";
import { Faq, Animate } from "../utils";
import Image from "next/image";
import router from "next/router";

const Pricing = () => {
  const [activeBtn, setActiveBtn] = useState({
    annually: true,
    monthly: false,
  });
  const { annually, monthly } = activeBtn;

  const [businessPrice, setBusinessPrice] = useState("4,999");
  const [priceLabel, setPriceLabel] = useState("Billed Monthly");
  const [subPriceType, setSubPriceType] = useState("NGN 9989");
  const [selectedPlan, setSelectedPlan] = useState("");

  useEffect(() => {
    monthly ? setBusinessPrice("4,999") : setBusinessPrice("4,167");
    monthly
      ? setPriceLabel("Billed Monthly")
      : setPriceLabel("Billed Annually");
    monthly ? setSubPriceType("") : setSubPriceType("NGN 9989");
  }, [monthly]);

  const countryOptions = [
    { value: "Nigeria", label: "NGN" },
    { value: "USA", label: "USD" },
    { value: "United Kingdom", label: "GBP" },
    { value: "Kenya", label: "KES" },
    { value: "South Africa", label: "ZAR" },
    { value: "Tanzania", label: "TZC" },
    { value: "Uganda", label: "UGX" },
  ];

  const handleBtnClick = (plan) => {
    // do nothing for now.
    setSelectedPlan(plan);
    // return;
  };

  return (
    <Layout defaultMarginTop={true}>
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.header}>
            <h2>Cost-friendly and Transparent Pricing</h2>
            <p>No hidden fees that may give you surprises.</p>
          </div>

          <div className={styles.tabContainer}>
            <div className={styles.tabSelect}>
              <div className={styles.tab}>
                <button
                  onClick={() =>
                    setActiveBtn({ annually: true, monthly: false })
                  }
                  className={`${styles.btn1} ${annually && styles.activeBtn}`}
                >
                  Annually - Save 17%
                </button>
                <button
                  onClick={() =>
                    setActiveBtn({ annually: false, monthly: true })
                  }
                  className={`${styles.btn2} ${monthly && styles.activeBtn}`}
                >
                  Monthly
                </button>
              </div>

              <div className={styles.select}>
                <Select
                  name="country"
                  options={countryOptions}
                  arrowIconColor="#0072EF"
                  borderColor="#40A9FF"
                  // onChange={(e) => setSelect(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={styles.priceCards}>
            <div className={styles.pricingCont}>
              <div className={styles.free}>
                <PricingCard
                  title="basic"
                  price="0"
                  btnText="Start for free"
                  subTitle="All of the features you need to start selling your contents"
                  priceType="100% Free "
                  btnOnClick={()=>{
                    router.push("/login");
                    handleBtnClick("basic")}}
                  currentPlan={selectedPlan==="basic"}
                />
              </div>

              <div className={`${styles.free}`}>
                <PricingCard
                  title="business"
                  subTitle="Get the combination of core tools, custom options, and automated events for professional digital product Kreators looking to massively grow their businesses."
                  price={businessPrice}
                  btnText="Select this plan"
                  priceType={priceLabel}
                  subPriceType={subPriceType}
                  btnOnClick={()=>handleBtnClick("business")}
                  currentPlan={selectedPlan==="business"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.midSection}>
          <h3>Want to Reach out?</h3>
          <p>
            Email us at{" "}
            <a
              rel="noopener noreferrer"
              target="blank"
              href="mailto:info@KreateSell.com"
            >
              info@KreateSell.com
            </a>{" "}
            if your questions or concerns <br /> are not answered here.
          </p>
          <div className={styles.buttonCont}>
            <Button className={styles.btn} text="Contact Now" />
          </div>
        </div>

        <div className={styles.faqContainer}>
          <div
            className={styles.faqHeader}
            // {...Animate("zoom-in-right", 500, "ease-in")}
          >
            <h3 className={styles.title}>
              Frequently <br /> Asked <br /> Questions
            </h3>
            <h3 className={styles.mobileFaqTitle}>
              Frequently Asked <br />
              Questions
            </h3>
            <div className={styles.faqImage}>
              <Image src={Faq} width={332} height={234} alt="faq" />
            </div>
          </div>

          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <h5
                className={styles.question}
                // {...Animate("zoom-in", 500, "ease-in")}
              >
                How long will the basic plan remain free?
              </h5>
              <div
                className={styles.answer}
                // {...Animate("fade-up", 600, "ease")}
              >
                <p>
                The basic plan is free for as long as you remain on the plan. Although, upgrading to the paid business plan gives you access to more advanced features.
                </p>
              </div>
            </div>

            <div className={styles.content}>
              <h5
                className={styles.question}
                {...Animate("zoom-in", 700, "ease-in")}
              >
                What does the business plan include?
              </h5>
              <div
                className={styles.answer}
                // {...Animate("fade-up", 800, "ease")}
              >
                <p>
                When you subscribe to the business plan, in addition to the features on the basic plan, you get: 
                </p>
                <ol>
                  <li>access to beautiful templates that can assure you of high conversion of your page visitors into buyers</li>
                  <li>build an attractive sales page that holds your visitors’ attention and converts them to buyers using the drag and drop sales page builder</li>
                  <li>access to three follow up emails sent on your behalf to buyers who did not complete the buying process
integration of full email service provider</li>
                  <li>integration of webinar platform
accept instalmental payment
create membership courses with recurring payment</li>
                  <li>integrate Zapier</li>
                  <li>access to use PayPal and Stripe as a verified Kreator</li>
                  <li>allow Webinar replays online streaming</li>
                  <li>You can activate pop up prompts to sell to visitors on your sales page</li>
                  <li>access to social proof to help your visitors make the buying decision immediately</li>
                  <li>use a personalised domain</li>
                  <li>set pre-order in anticipation of the launch of your digital product
set discount coupon for product offers</li>
                  <li>remove default watermark on templates and customise the watermark</li>
                  <li>access up to 15Gb storage space</li>
                  <li>access advanced reports on your account activities</li>
                </ol>
                <p>You also get access to  top notch security, round-the-clock supervision and a control center to manage your KreateSell store.<br/>
You get access to our support by email or live chat on the platform. Our support teams are available from Monday to Friday, 24/5, in English. Your KreateSell store is upgraded upon request to benefit from these new features at your convenience.</p>
              </div>
            </div>

            <div className={styles.content}>
              <h5
                className={styles.question}
                // {...Animate("zoom-in", 500, "ease-in")}
              >
                How long does it take for funds to be deposited into my account?
              </h5>
              <div
                className={styles.answer}
                // {...Animate("fade-up", 600, "ease")}
              >
                <p>
                Settlements are made between 24 hours to 10 days, depending on your currency and country.
                </p>
              </div>
            </div>
            <div className={styles.content}>
              <h5
                className={styles.question}
                // {...Animate("zoom-in", 500, "ease-in")}
              >
                How can I make money as a Kreator?
              </h5>
              <div
                className={styles.answer}
                // {...Animate("zoom-in", 600, "ease-in")}
              >
                <p>
                It&#39;s very simple I say. All you just need to do is compile the knowledge you have into an ebook, audio course, online course, video course, membership etc., upload on KreateSell and start making easy money into your local bank account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
