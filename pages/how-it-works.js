import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Layout, InputButton, Button } from "../components";
import styles from "../public/css/HowItWorks.module.scss";
import {
  AddProduct,
  CreateStore,
  Publish,
  HowItWorksHero,
  RightArrow,
  LeftSpiral,
  RightSpiral,
  Animate,
} from "../utils";

const HowItWorks = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <Layout subFooter={false} defaultMarginTop={true}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h2 className={styles.main}>Just Upload It. Make Money From It.</h2>
          <h2 className={styles.mobileHeader}>
            Just Upload It. Make <br /> Money From It.
          </h2>

          <p className={styles.subtitle}>
            A smarter and better way of making money from your content.
          </p>
          <p className={styles.mobileSubtitle}>
            A smarter and better way of making money from your content.
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
        </div>

        <div className={styles.bestOption}>
          <div
            className={styles.content}
            {...Animate("fade-right", 200, "ease")}
          >
            <h3>Best Option For</h3>
            <div className={styles.pillContainer}>
              <div className={styles.pills}>
                <div className={styles.pill}>Ebook Author</div>
                <div className={styles.pill}>Information Seller</div>
                <div className={styles.pill}>Educators</div>
              </div>
              <div className={styles.pills}>
                <div className={styles.pill}>Membership Creator</div>
                <div className={styles.pill}>Webinar Hosts</div>
              </div>
              <div className={styles.pills}>
                <div className={styles.pill}>Online Course Creator</div>
              </div>
            </div>
            <p className={styles.pillContent}>
              KreateSell is an ease-to-use, cross-border ecommerce <br />{" "}
              platform that will enable you to upload your digital products for{" "}
              <br />
              fastest and easiest sales and conversion without having to <br />{" "}
              learn multiple complex sales funnel platforms. And you instantly
              get <br />
              paid from anywhere in the world conveniently.
            </p>
            <p className={styles.mobilePillContent}>
              KreateSell is an ease-to-use, cross-border ecommerce platform that
              will enable you to upload your digital products for the fastest
              and easiest sales and conversions, without having to learn to use
              multiple complex sales funnel platforms. And you instantly get
              paid from anywhere in the world conveniently.
            </p>
          </div>
          <div
            className={styles.image}
            {...Animate("flip-left", 200, "ease-out-cubic")}
          >
            <Image
              src={HowItWorksHero}
              width="445"
              height="457"
              alt="how it works"
            />
          </div>
        </div>

        <div className={styles.subCaption}>
          <h3 {...Animate("fade-up", 500, "ease")}>How It Works</h3>
          <p {...Animate("fade-up", 600, "ease")}>
            Amazing all-in-one tools that bring a winning customer experience
          </p>
        </div>

        <div className={styles.rowOne}>
          <div
            className={styles.image}
            {...Animate("flip-right", 500, "ease-out-cubic")}
          >
            <Image
              src={CreateStore}
              width={280}
              height={297}
              alt="create-product"
            />
          </div>
          <div className={styles.rowContent}>
            <div
              className={styles.rowNumber}
              {...Animate("zoom-in", 100, "ease")}
            >
              1
            </div>
            <div
              className={styles.content}
              {...Animate("zoom-in-left", 200, "ease")}
            >
              <h5 className={styles.webTitle}>
                Create your Store and setup Store details
              </h5>
              <h5 className={styles.mobileTitle}>
                Create your Store and <br /> setup Store details
              </h5>
              <div className={styles.statementBox}>
                <p className={styles.statement}>
                  To get started, just navigate to the get started or sign up
                  button and create a free account to have the all-in-one system
                  in action for your use.
                </p>
                <br />
                <p className={styles.statement}>
                  Getting set? Add all your store details for easy recognition.
                  Use details that compel, attract and intrigue potential
                  buyers.
                </p>

                {/* <p className={styles.mobileStatement}>
                  To get started, just navigate to the get started or sign up
                  button and create a free account to have the all-in-one system
                  in action for use. Getting ready? Now add all your store
                  details for easy recognition. Details that compel, attract and
                  intrigue potential buyers.
                </p> */}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.spiral} {...Animate("fade-down", 200, "linear")}>
          <Image
            src={RightSpiral}
            height="150"
            width="500"
            alt="right spiral"
            className={styles.img}
          />
        </div>

        <div className={`${styles.rowOne} ${styles.evenRow}`}>
          <div className={styles.rowContent}>
            <div
              className={styles.rowNumber}
              {...Animate("zoom-in", 200, "ease")}
            >
              2
            </div>
            <div
              className={styles.content}
              {...Animate("zoom-in-right", 200, "ease")}
            >
              <h5 className={styles.webTitle}>Add Product</h5>
              <h5 className={styles.mobileTitle}>Add Product</h5>
              <div className={styles.statementBox}>
                <p className={styles.statement}>
                  Ready to go global? Create your products with awesome
                  descriptions and additional beneficial details that capture
                  the attention of customers. After that, share your product
                  link to your target audience.
                </p>
              </div>
            </div>
          </div>
          <div
            className={styles.image}
            {...Animate("flip-left", 200, "ease-out-cubic")}
          >
            <Image
              src={AddProduct}
              width={280}
              height={297}
              alt="create-product"
            />
          </div>
        </div>

        <div className={styles.spiral} {...Animate("fade-down", 200, "linear")}>
          <Image
            src={LeftSpiral}
            height="150"
            width="500"
            alt="left spiral"
            className={styles.img}
          />
        </div>

        <div className={`${styles.rowOne} ${styles.rowThree}`}>
          <div
            className={styles.image}
            {...Animate("flip-right", 200, "ease-out-cubic")}
          >
            <Image
              src={Publish}
              width={280}
              height={297}
              alt="create-product"
            />
          </div>
          <div className={styles.rowContent}>
            <div
              className={styles.rowNumber}
              {...Animate("zoom-in", 200, "ease")}
            >
              3
            </div>
            <div
              className={styles.content}
              {...Animate("zoom-in-left", 200, "ease")}
            >
              <h5 className={styles.webTitle}>
                Publish - Go live in a seconds
              </h5>
              <h5 className={styles.mobileTitle}>Publish</h5>
              <div className={styles.statementBox}>
                <p className={styles.statement}>
                  Creating any of the supported products - membership,
                  subscription or digital downloads under minutes is cool,
                  right?
                </p>
                {/* here */}
                <p className={styles.statement}>
                  The cooler part of it is setting up your funnel on the same
                  page in a couple of clicks, without going through any tech
                  headache. Do that and you are ready to go live and start
                  getting paid from anywhere in the world where your audience
                  reside, in seconds.
                </p>
                {/* here */}
                <p className={styles.statement}>
                  Click the publish button and your product link will be
                  available for sharing.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.spiral} {...Animate("fade-down", 300, "linear")}>
          <Image
            src={RightSpiral}
            height="150"
            width="500"
            alt="right spiral"
            className={styles.img}
          />
        </div>

        <div className={`${styles.rowOne} ${styles.evenRow}`}>
          <div className={styles.rowContent}>
            <div
              className={styles.rowNumber}
              {...Animate("zoom-in", 200, "ease")}
            >
              4
            </div>
            <div
              className={styles.content}
              {...Animate("zoom-in-right", 200, "ease")}
            >
              <h5 className={styles.webTitle}>
                Get paid instantly into your account
              </h5>
              <h5 className={styles.mobileTitle}>
                Get paid instantly into your account
              </h5>
              <div className={styles.statementBox}>
                <p className={styles.statement}>
                  Enter your local bank account details and start receiving your
                  sales payment instantly. No more foreign currency barriers,
                  you&apos;ll receive your payout directly and instantly into
                  the account provided.
                </p>
              </div>
            </div>
          </div>
          <div
            className={styles.image}
            {...Animate("flip-left", 200, "ease-out-cubic")}
          >
            <Image
              src={AddProduct}
              width={280}
              height={297}
              alt="create-product"
            />
          </div>
        </div>

        <div className={styles.subFooter}>
          <h3
            className={styles.subFooterTitle}
            // {...Animate("fade-up", 200, "ease")}
          >
            KreateSell solves your marketing <br /> and conversion hectic
            processes.
          </h3>
          <h3
            className={styles.mobileSubFooterTitle}
            // {...Animate("fade-up", 200, "ease")}
          >
            KreateSell solves your marketing and conversion hectic processes.
          </h3>
          <p>
            Rid yourself of stress. Upload more content. Make money. Enjoy your
            choiced life to the fullest.
          </p>
          <Button
            text="Get Started Free"
            bgColor="blue"
            className={styles.btn}
            icon={<RightArrow />}
            // {...Animate("zoom-in", 500, "ease-in")}
          />
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks;
