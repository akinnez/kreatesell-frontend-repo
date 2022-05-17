import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Layout, InputButton } from "../components";
import { Link } from "react-scroll";
import styles from "../public/css/Features.module.scss";
import {
  RightArrow,
  AnalyzeIcon,
  CustomizeIcon,
  DeliverIcon,
  // FeatureBg,
  FeatureIcon,
  ManageIcon,
  MarketIcon,
  PayoutIcon,
  SecureIcon,
  SellIcon,
  SupportIcon,
  Animate,
} from "../utils";

const Features = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  // state for getting active link
  const [activeScrollLink, setActiveScrollLink] = useState("");
  const handleClick = (linkName) => setActiveScrollLink(linkName);

  return (
    <Layout subFooter={true} defaultMarginTop={true}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h2 className={styles.webTitle}>
            No more Headaches from Multiple <br />
            Complex Tech Tools
          </h2>
          <h2 className={styles.mobileTitle}>
            No more headaches from multiple complex tech tools
          </h2>

          <p className={styles.webSubtitle}>
            You need quality time to create brilliant content for your audience
            who needs them. Upload your content on a simple
            <br /> all-in-one platform and save yourself from losing your peace
            in figuring things out….
          </p>
          <p className={styles.mobileSubtitle}>
            You need quality time to create brilliant content for your audience
            who needs them. Upload your content on a simple all-in-one platform
            and save yourself from losing your peace in figuring things out….
          </p>

          <div className={styles.input}>
            <InputButton
              name="email"
              placeholder="Enter your email..."
              buttonText="Get Started Free"
              buttonIcon={<RightArrow />}
              onChange={(e) => setEmail(e.target.value)}
              onSubmit={(e) => {
                e.preventDefault();
                router.push({
                  pathname: "/signup",
                  query: { email },
                });
              }}
            />
          </div>

          <div className={styles.benefits}>
            <span>Signup for free</span>
            <span>• Easy setup</span>
            <span>• Fast payout</span>
          </div>

          <div
            className={styles.features}
            {...Animate("zoom-in", 200, "ease-in")}
          >
            <div className={styles.featuresWrapper}>
              <ul>
                <GenerateScrollLinks
                  data={leftLinks}
                  handleClick={handleClick}
                  activeLink={activeScrollLink}
                />
              </ul>
              <div className={styles.hrDivider}></div>
              <ul>
                <GenerateScrollLinks
                  data={middleLinks}
                  handleClick={handleClick}
                  activeLink={activeScrollLink}
                />
              </ul>
              <div className={styles.hrDivider}></div>

              <ul>
                <GenerateScrollLinks
                  data={rightLinks}
                  handleClick={handleClick}
                  activeLink={activeScrollLink}
                />
              </ul>
            </div>
          </div>
        </div>

        {/* Sell Features Row */}
        <div className={styles.sellFeatures}>
          <div className={styles.majorFeatures}>
            <div
              className={styles.imageCont}
              {...Animate("fade-right", 200, "ease")}
            >
              <section className={styles.featureTop}>
                <div className={styles.featureTitleIcon}>
                  <Image alt="sell icon" src={SellIcon} />
                </div>
                <h2 className={styles.featureTitle} id="sell">
                  Sell
                </h2>
              </section>
              <h6 className={styles.featureExcerpt}>
                Sell your contents to anywhere in the world doing almost
                nothing.
              </h6>
              <div className={styles.featureIcon}>
                <Image src={FeatureIcon} alt="feature icon" />
              </div>
            </div>

            <div className={styles.cardCont}>
              <div className={styles.firstRow}>
                <FeatureCard
                  // animate={() => Animate("zoom-in", 100, "ease")}
                  title="Onboarding welcome emails"
                  content="Prepare your automation to send messages to your customers, buyers, members once they buy or sign up for your product and also to bring about smooth sailing throughout their shopping span."
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 300, "ease")}
                  title="Multi-language & multi-currency"
                  content="Talk to your customer in the language they understand, and display pricing in their local currency and worry less about currency barriers."
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 500, "ease")}
                  title="Onsite Payments"
                  content="Buyers will enjoy a seamless and hassle free experience in ordering or purchasing your product. Increase in the inflow of cash because of seamless payment options."
                />
              </div>
              <div className={styles.secondRow}>
                <FeatureCard
                  // animate={() => Animate("zoom-in", 200, "ease")}
                  title="Flexible payment options"
                  content="Shoot your sales and Skyrocket your conversion rate by providing your customers with flexible payment methods they prefer."
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 400, "ease")}
                  title="Payment Links"
                  content="Use Payment Links to sell your product, to start a subscription, or accept membership. Create a full payment page and send to a wide range of prospects around the world through your social media handles, emails or any channel you choose to use in just a few clicks."
                />
              </div>
            </div>
            <div
              className={styles.mobileFeatureIcon}
              {...Animate("fade-right", 200, "ease")}
            >
              <Image src={FeatureIcon} alt="feature icon" />
            </div>
          </div>
        </div>
        {/* Sell Features Row */}

        {/* Deliver Features Row */}
        <div className={styles.deliverFeatures}>
          <div className={`${styles.majorFeatures} ${styles.alte}`}>
            <div
              className={styles.mobileFeatureIcon}
              {...Animate("fade-right", 200, "ease")}
            >
              <Image src={FeatureIcon} alt="feature icon" />
            </div>
            <div className={styles.cardCont}>
              <div className={`${styles.firstRow} ${styles.alternateFirstRow}`}>
                <FeatureCard
                  // animate={() => Animate("zoom-in", 100, "ease")}
                  title="Digital products"
                  content="Sell your digital product like pdf, zip file, video tutorials, Instructional guides and many more worldwide."
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 300, "ease")}
                  title="Memberships"
                  content="Make your community members or students happy by giving them lots of updates and introducing them into active/conversational community, forums where they get to meet like minded. "
                />
              </div>
              <div
                className={`${styles.secondRow} ${styles.alternateSecondRow}`}
              >
                <FeatureCard
                  // animate={() => Animate("zoom-in", 200, "ease")}
                  title="Subscriptions"
                  content="Set an intended fee for your customers to get access to your already existing or newly added products on a weekly, monthly, quarterly, or yearly basis. "
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 400, "ease")}
                  title="Online Courses"
                  content="Choose from the endless list of online courses that perfectly solve your business and customers’ needs; Kreatesell accepts many file types, hosts all of the content, and starts making money from selling your content to your students."
                />
              </div>
            </div>

            <div
              className={`${styles.imageCont} ${styles.alternate}`}
              {...Animate("fade-left", 200, "ease")}
            >
              <div className={styles.featureTitleIcon}>
                <Image src={DeliverIcon} alt="deliver icon" />
              </div>
              <h2 className={styles.featureTitle} id="deliver">
                Deliver
              </h2>
              <h6 className={styles.featureExcerpt}>
                Customize how, where, when, and the market you want to sell your
                products to. Delivery will be done faster and safer, based on
                what you pre-set.
              </h6>
              <div className={styles.featureIcon}>
                <Image src={FeatureIcon} alt="feature icon" />
              </div>
            </div>
          </div>
        </div>
        {/* Deliver Features Row */}

        {/* Manage Features Row */}
        <div className={styles.manageFeatures}>
          <div className={styles.majorFeatures}>
            <div
              className={styles.imageCont}
              {...Animate("fade-right", 200, "ease")}
            >
              <div className={styles.featureTitleIcon}>
                <Image src={ManageIcon} alt="manage icon" />
              </div>
              <h2 className={styles.featureTitle} id="manage">
                Manage
              </h2>
              <h6 className={styles.featureExcerpt}>
                You are provided with a full functional toolbox that takes care
                of the legal and administrative requirements. Concentrate on
                creating content and making money.
              </h6>
              <div className={styles.featureIcon}>
                <Image src={FeatureIcon} alt="feauture icon" />
              </div>
            </div>

            <div className={styles.cardCont}>
              <div className={`${styles.firstRow} ${styles.alternateFirstRow}`}>
                <FeatureCard
                  // animate={() => Animate("zoom-in", 100, "ease")}
                  title="API"
                  content="Make use the API option to connect your business store with supported 3rd party applications. Simply copy the provided API keys and paste it into the 3rd party application."
                />
              </div>
              <div className={styles.secondRow}>
                <FeatureCard
                  // animate={() => Animate("zoom-in", 200, "ease")}
                  title="Fraud reporting"
                  content="You can prevent any suspicious activities. KreateSell provides you round-the-clock support which you can immediately reach out to inorder to resolve the issue."
                />
              </div>
            </div>
            <div
              className={styles.mobileFeatureIcon}
              {...Animate("fade-right", 200, "ease")}
            >
              <Image src={FeatureIcon} alt="feature icon" />
            </div>
          </div>
        </div>
        {/* Manage Features Row */}

        {/* Market Features Row */}
        <div className={styles.marketFeatures}>
          <div className={styles.majorFeatures}>
            <div
              className={`${styles.imageCont} ${styles.centred}`}
              {...Animate("fade-right", 200, "ease")}
            >
              <div className={styles.featureTitleIcon}>
                <Image src={MarketIcon} alt="feature icon" />
              </div>
              <h2 className={styles.featureTitle} id="market">
                Market
              </h2>
              <h6 className={styles.featureExcerpt}>
                Reduce your stress by automating your marketing funnel or flow
                with super-effective tools to help you increase your conversion
                and sell better.
              </h6>
              <div className={styles.featureIcon}>
                <Image src={FeatureIcon} alt="feature icon" />
              </div>
            </div>

            <div className={styles.cardCont}>
              <div className={styles.firstRow}>
                <FeatureCard
                  // animate={() => Animate("zoom-in", 100, "ease")}
                  title="Coupon codes"
                  content="Manage products and activate discounts for individual products or all products, in a specific time frame or based on the fixed amount or percentage."
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 200, "ease")}
                  title="Affiliate marketing"
                  content="Allow the affiliate to promote options in your product and let the affiliate promoter to share your links and bring in sales for just a fraction of the product price."
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 300, "ease")}
                  title="1-click upsells"
                  content="Trigger your customers’ buying interest by offering a similar product from your store listings as they proceed to checkout."
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 500, "ease")}
                  title="Product update emails"
                  content="Get your active customers informed with the latest updates that just happened to the product they bought. "
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 400, "ease")}
                  title="Give Free Gift"
                  content="Give your customers free gifts for compensation or lead magnet to increase your store traffic and conversion by setting your product price to zero."
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 400, "ease")}
                  title="Activate and Deactivate"
                  content="Activate your product so that it could be listed on your product listing page. Customers get to see activated products and make purchases. You can deactivate a product, probably there is something to sort for the particular moment until such is resolved, put the product on deactivation mode."
                />
              </div>
              <div className={styles.secondRow}>
                <FeatureCard
                  // animate={() => Animate("zoom-in", 400, "ease")}
                  title="Cart abandonments"
                  content="Stop losing potential buyers. Cart abandonment campaign has been put in place to notify and send reminder messages to the potential customer that left the product after clicking the checkout button."
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 400, "ease")}
                  title="Email marketing"
                  content="Get your potential and active customer engaged with your personalized email or the preset email on the kreatesell clipboard."
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 300, "ease")}
                  title="New Product Alert"
                  content="Get your active customer notified about the new product you just added to your store listing."
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 400, "ease")}
                  title="Lead magnets"
                  content="Give your audience free content in exchange for their email addresses and build your audience. They are your new leads and you can sell your course to them anytime."
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 300, "ease")}
                  title="Pre-launch and pre-sell"
                  content="You don’t need to wait until launch day! Create your course, then publish and start creating awareness and receiving payment in advance."
                />
              </div>
            </div>
            <div
              className={styles.mobileFeatureIcon}
              {...Animate("fade-right", 200, "ease")}
            >
              <Image src={FeatureIcon} alt="feature icon" />
            </div>
          </div>
        </div>
        {/* Market Features Row */}

        {/* Customize Features Row */}
        <div className={styles.customizeFeatures}>
          <div className={`${styles.majorFeatures} ${styles.reassign}`}>
            <div
              className={styles.mobileFeatureIcon}
              {...Animate("zoom-in", 200, "ease")}
            >
              <Image src={FeatureIcon} alt="feature icon" />
            </div>
            <div className={styles.cardCont}>
              <div className={`${styles.firstRow} ${styles.alternateFirstRow}`}>
                <FeatureCard
                  // animate={() => Animate("zoom-in", 300, "ease")}
                  title="Custom checkout fields"
                  content="Decide on the information you need from your buyers, like a phone number or email, name and many more."
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 300, "ease")}
                  title="Customize buttons"
                  content="Change and stylize checkout call-to-action buttons by typing in your new desired text."
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 300, "ease")}
                  title="Be simple"
                  content="Enable or disable any option in your product page to increase the ease of your customer buying experience."
                />
              </div>
              <div
                className={`${styles.secondRow} ${styles.alternateSecondRow}`}
              >
                <FeatureCard
                  // animate={() => Animate("zoom-in", 400, "ease")}
                  title="Custom store page"
                  content="Use drag and drop elements or select preset templates, then customize fonts, and colors that align with your branding for a seamless customer buying experience."
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 400, "ease")}
                  title="Checkout templates"
                  content="Select from the list of available checkout templates or you might decide to design your own from scratch by using custom component blocks."
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 400, "ease")}
                  title="Custom email templates"
                  content="Customize your email templates for orders, campaigns, or a newsletter to maintain your brand voice."
                />
              </div>
            </div>

            <div
              className={`${styles.imageCont} ${styles.alternate}`}
              {...Animate("fade-left", 200, "ease")}
            >
              <div className={styles.featureTitleIcon}>
                <Image src={CustomizeIcon} alt="customize icon" />
              </div>
              <h2 className={styles.featureTitle} id="customize">
                Customize
              </h2>
              <h6 className={styles.featureExcerpt}>
                Make the checkout page to look just exactly as you want. Also,
                to bring ease to your target audience purchasing experience.
              </h6>
              <div className={styles.featureIcon}>
                <Image src={FeatureIcon} alt="feature icon" />
              </div>
            </div>
          </div>
        </div>
        {/* Customize Features Row */}

        {/* Secure Features Row */}
        <div className={styles.secureFeatures}>
          <div className={styles.majorFeatures}>
            <div
              className={styles.imageCont}
              {...Animate("fade-right", 200, "ease")}
            >
              <div className={styles.featureTitleIcon}>
                <Image src={SecureIcon} alt="secure icon" />
              </div>
              <h2 className={styles.featureTitle} id="secure">
                Secure
              </h2>
              <h6 className={styles.featureExcerpt}>
                Get your personal documents and files secured by using the
                management tools on the platform.
              </h6>
              <div
                className={styles.featureIcon}
                {...Animate("fade-right", 200, "ease")}
              >
                <Image src={FeatureIcon} alt="feature icon" />
              </div>
            </div>

            <div className={styles.cardCont}>
              <div className={`${styles.firstRow} ${styles.alternateFirstRow}`}>
                <FeatureCard
                  // animate={() => Animate("zoom-in", 400, "ease")}
                  title="2-factor auth"
                  content="Protect your account from unsecure and unreliable access to your account by activating the 2-factor authentication."
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 500, "ease")}
                  title="Video & audio streaming"
                  content="Restrict the unauthorized use of your content by exploring the options of audio and video as that cannot be easily duplicated or pirated."
                />
              </div>
              <div className={styles.secondRow}>
                <FeatureCard
                  // animate={() => Animate("zoom-in", 400, "ease")}
                  title="Limit number of Product"
                  content="Set product limits to prevent customers from accessing the document after the preset amount of products have been reached."
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 500, "ease")}
                  title="PDF stamping"
                  content="Get your pdf document stamped or watermarked to prevent the unauthorized sharing of your personal property or document."
                />
              </div>
            </div>
            <div
              className={styles.mobileFeatureIcon}
              {...Animate("fade-right", 200, "ease")}
            >
              <Image src={FeatureIcon} alt="feature icon" />
            </div>
          </div>
        </div>
        {/* Secure Features Row */}

        {/* Analyze Features Row */}
        <div className={styles.customizeFeatures}>
          {/* <div className={styles.majorFeatures}> */}
          <div className={`${styles.majorFeatures} ${styles.reassign}`}>
            <div className={styles.mobileFeatureIcon}>
              <Image src={FeatureIcon} alt="feature icon" />
            </div>
            <div className={styles.cardCont}>
              <div className={`${styles.firstRow} ${styles.alternateFirstRow}`}>
                <FeatureCard
                  // animate={() => Animate("zoom-in", 400, "ease")}
                  title="Order reports"
                  content="Generate the full report of the sales made over a specified period or over time in just a few clicks."
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 500, "ease")}
                  title="Upsell analytics"
                  content="Review the information from your previous upsells, to determine how to effectively upsell to your existing/active customer."
                />
              </div>
              <div
                className={`${styles.secondRow} ${styles.alternateSecondRow}`}
              >
                <FeatureCard
                  // animate={() => Animate("zoom-in", 500, "ease")}
                  title="Full product reports"
                  content="Create and export all your products, including names, prices for offline or personal use."
                />
                <FeatureCard
                  // animate={() => Animate("zoom-in", 400, "ease")}
                  title="Abandoned cart analytics"
                  content="Get the full analytics of the buyers that abandoned your product to cart. Download and even get to reach out to them to see why and how to help them resolve any issue just in case."
                />
              </div>
            </div>

            <div
              className={`${styles.imageCont} ${styles.alternate}`}
              {...Animate("fade-left", 200, "ease")}
            >
              <div className={styles.featureTitleIcon}>
                <Image src={AnalyzeIcon} alt="analyze icon" />
              </div>
              <h2 className={styles.featureTitle} id="analyze">
                Analyze
              </h2>
              <h6 className={styles.featureExcerpt}>
                Get the proper data and analytics of your store with the
                comprehensive analytic tools provided by kreatsell.
              </h6>
              <div className={styles.featureIcon}>
                <Image src={FeatureIcon} alt="feature icon" />
              </div>
            </div>
          </div>
        </div>
        {/* Analyze Features Row */}

        {/* Payout Features Row */}
        <div className={styles.secureFeatures}>
          <div className={styles.majorFeatures}>
            <div
              className={styles.imageCont}
              {...Animate("fade-right", 200, "ease")}
            >
              <div className={styles.featureTitleIcon}>
                <Image src={PayoutIcon} alt="payout icon" />
              </div>
              <h2 className={styles.featureTitle} id="payouts">
                Payout
              </h2>
              <h6 className={styles.featureExcerpt}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                aliquam gravida sed nec.
              </h6>
              <div className={styles.featureIcon}>
                <Image src={FeatureIcon} alt="feature icon" />
              </div>
            </div>

            <div className={styles.cardCont}>
              <div className={`${styles.firstRow} ${styles.alternateFirstRow}`}>
                <FeatureCard
                  // animate={() => Animate("zoom-in", 400, "ease")}
                  title="Instant payouts"
                  content="Get your sales payment faster with instant payouts; we don’t hold money after it has exceeded the clearance period."
                />
              </div>
              <div className={styles.secondRow}>
                <FeatureCard
                  // animate={() => Animate("zoom-in", 500, "ease")}
                  title="Unified payouts"
                  content="Get paid for all your sales made in different currencies in a single currency."
                />
              </div>
            </div>
            <div
              className={styles.mobileFeatureIcon}
              {...Animate("fade-right", 200, "ease")}
            >
              <Image src={FeatureIcon} alt="feature icon" />
            </div>
          </div>
        </div>
        {/* Payout Features Row */}

        {/* Support Features Row */}
        <div className={styles.supportFeatures}>
          <div className={`${styles.majorFeatures} ${styles.reassign}`}>
            <div className={styles.mobileFeatureIcon}>
              <Image src={FeatureIcon} alt="feature icon" />
            </div>
            <div className={styles.cardCont}>
              <div
                className={`${styles.secondRow} ${styles.alternateSecondRow}`}
              >
                <FeatureCard
                  // animate={() => Animate("zoom-in", 400, "ease")}
                  title="Round-the-clock support"
                  content="We have the full functioning and round-the-clock support readily available to take any concerns, questions, complaints or suggestions."
                />
              </div>
            </div>

            <div
              className={`${styles.imageCont} ${styles.alternate}`}
              {...Animate("fade-left", 500, "ease")}
            >
              <div className={styles.featureTitleIcon}>
                <Image src={SupportIcon} alt="support icon" />
              </div>
              <h2 className={styles.featureTitle} id="supports">
                Support
              </h2>
              <h6 className={styles.featureExcerpt}>
                Get the proper data and analytics of your store with the
                comprehensive analytic tools provided by kreatsell.
              </h6>
              <div
                className={styles.featureIcon}
                {...Animate("fade-left", 200, "ease")}
              >
                <Image src={FeatureIcon} alt="feature icon" />
              </div>
            </div>
          </div>
        </div>
        {/* Support Features Row */}
      </div>
    </Layout>
  );
};

export default Features;

const FeatureCard = (props) => {
  const { title, content } = props;
  return (
    <div className={styles.featureCard}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardContent}>{content}</p>
    </div>
  );
};

// scroll spy links

const linksData = {
  leftLinks: ["sell", "deliver", "manage"],
  middleLinks: ["market", "customize", "secure"],
  rightLinks: ["analyze", "payouts", "supports"],
};

const { leftLinks, middleLinks, rightLinks } = linksData;

const GenerateScrollLinks = ({ data, handleClick, activeLink }) => {
  return data.map((item) => {
    const classApplied = activeLink === item ? styles.activeScrollLink : "";

    return (
      <li key={item} className={`${styles.scrollListItem} ${classApplied}`}>
        <Link
          to={item}
          spy={true}
          smooth={true}
          offset={-200}
          duration={500}
          className={styles.Link}
          activeClass="react-scroll-active-link"
          onClick={() => handleClick(item)}
        >
          {item}
        </Link>
      </li>
    );
  });
};
