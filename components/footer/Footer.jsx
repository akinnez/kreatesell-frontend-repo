import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FooterBrand,
  Location,
  Message,
  Mobile,
  FBIcon,
  InstaIcon,
  LinkedIcon,
  TwitterIcon,
  WhatsappIcon,
} from "../../utils";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const router = useRouter();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerCont}>
        <div className={styles.brand}>
          <div className={styles.brandTitle} onClick={() => router.push("/")}>
            <Image src={FooterBrand} alt="kreatesell" />
          </div>

          <div className={styles.brandContact}>
            <div className={styles.brandContactIcon}>
              <Image src={Message} alt="kreatesell" />
            </div>
            <a
              rel="noopener noreferrer"
              className="text"
              target="blank"
              href="mailto:info@kreatesell.com"
            >
              info@kreatesell.com
            </a>
          </div>

          <div className={styles.brandContact}>
            <div className={styles.brandContactIcon}>
              <Image src={Mobile} alt="mobile" />
            </div>
            <a
              className="text"
              rel="noopener noreferrer"
              target="blank"
              href="tel:+2347019875432"
            >
              +2347019875432
            </a>
          </div>

          <div className={styles.brandContact}>
            <div className={styles.brandContactIcon}>
              <Image src={Location} alt="location" />
            </div>
            <a
              className="text"
              rel="noopener noreferrer"
              target="blank"
              href="https://www.google.com/maps/place/Cocoa+House+Ibadan/@7.3875478,3.8767496,17z/data=!3m1!4b1!4m5!3m4!1s0x10398d0e3452ea31:0x8da53949f2293130!8m2!3d7.3875425!4d3.8789383"
            >
              Cocoa house Dugbe, Ibadan
            </a>
          </div>
        </div>

        <div>
          <div className={styles.categoryTitle}>Product</div>
          <div className={styles.categoryLink}>
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/pricing">
              <a>Pricing</a>
            </Link>
            <Link href="/features">
              <a>Features</a>
            </Link>
            <Link href="/how-it-works">
              <a>Tutorials</a>
            </Link>
            <Link href="#">
              <a>Affiliates</a>
            </Link>
          </div>
        </div>

        <div>
          <div className={styles.categoryTitle}>Company</div>
          <div className={styles.categoryLink}>
            <Link href="#">
              <a>About</a>
            </Link>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
            <Link href="#">
              <a>Press</a>
            </Link>
            <Link href="#">
              <a>Careers</a>
            </Link>
            <Link href="#">
              <a>Integration</a>
            </Link>
          </div>
        </div>

        <div>
          <div className={styles.categoryTitle}>Support</div>
          <div className={styles.categoryLink}>
            <Link href="/how-it-works">
              <a>Getting Started</a>
            </Link>
            <Link href="/how-it-works">
              <a>Tutorials</a>
            </Link>
            {/* <Link href="#"> */}
            <a href="https://wa.me/+2349016324945">Contact Support</a>
            {/* </Link> */}
            <Link href="/faq">
              <a>FAQ</a>
            </Link>
          </div>
        </div>

        <div>
          <div className={styles.categoryTitle}>Legal</div>
          <div className={styles.categoryLink}>
            <Link href="/legal/cookie-policy">
              <a>Cookies Policy</a>
            </Link>
            <Link href="/legal/privacy-policy">
              <a>Privacy Policy</a>
            </Link>
            <Link href="/legal/affiliate-policy">
              <a>Affiliate Policy</a>
            </Link>
            <Link href="/legal/terms-of-service">
              <a>Terms of Service</a>
            </Link>
          </div>
        </div>

        <div>
          <div className={styles.categoryTitle}>Follow us</div>
          <div className={styles.categoryLink}>
            <Link href="#">
              <a>Facebook</a>
            </Link>
            <Link href="#">
              <a>Twitter</a>
            </Link>
            <Link href="#">
              <a>Instagram</a>
            </Link>
            <Link href="#">
              <a>Linkedin</a>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.mobileFooter}>
        <div className={styles.firstRow}>
          <div className={styles.firstRowA}>
            <div className={styles.categoryTitle}>Product</div>
            <div className={styles.categoryLink}>
              <Link href="#">
                <a>Home</a>
              </Link>
              <Link href="#">
                <a>Pricing</a>
              </Link>
              <Link href="/features">
                <a>Features</a>
              </Link>
              <Link href="/how-it-works">
                <a>Affiliates</a>
              </Link>
              <Link href="#">
                <a>Releases</a>
              </Link>
            </div>
          </div>

          <div className={styles.firstRowB}>
            <div className={styles.categoryTitle}>Company</div>
            <div className={styles.categoryLink}>
              <Link href="#">
                <a>About</a>
              </Link>
              <Link href="#">
                <a>Blog</a>
              </Link>
              <Link href="#">
                <a>Press</a>
              </Link>
              <Link href="#">
                <a>Careers</a>
              </Link>
              <Link href="#">
                <a>Integration</a>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.secondRow}>
          <div className={styles.firstRowA}>
            <div className={styles.categoryTitle}>Support</div>
            <div className={styles.categoryLink}>
              <Link href="#">
                <a>Getting Started</a>
              </Link>
              <Link href="#">
                <a>Tutorials</a>
              </Link>
              {/* <Link href="#"> */}
              <a href="https://wa.me/+2349016324945">Contact Support</a>
              {/* </Link> */}
              <Link href="#">
                <a>FAQ</a>
              </Link>
            </div>
          </div>

          <div className={styles.firstRowB}>
            <div className={styles.categoryTitle}>Legal</div>
            <div className={styles.categoryLink}>
              <Link href="/legal/cookie-policy">
                <a>Cookies Policy</a>
              </Link>
              <Link href="/legal/privacy-policy">
                <a>Privacy Policy</a>
              </Link>
              <Link href="/legal/affiliate-policy">
                <a>Affiliate Policy</a>
              </Link>
              <Link href="/legal/terms-of-service">
                <a>Terms of Service</a>
              </Link>
            </div>
          </div>
        </div>
        <span className={styles.thinLine}></span>

        <div className={styles.brandMobile}>
          <Image src={FooterBrand} />
          <a
            rel="noopener noreferrer"
            className={styles.mobileFooterEmail}
            target="blank"
            href="mailto:info@kreatesell.com"
          >
            info@kreatesell.com
          </a>

          <div className={styles.engageUs}>Engage with us</div>

          <div className={styles.mobileSocialLinks}>
            <Image src={FBIcon} alt="kreatesell facebook" className="cursor" />
            <Image
              src={InstaIcon}
              alt="kreatesell instagram"
              className="cursor"
            />
            <Image
              src={LinkedIcon}
              alt="kreatesell linkedin"
              className="cursor"
            />
            <Image
              src={WhatsappIcon}
              alt="kreatesell whatsapp"
              className="cursor"
            />
            <Image
              src={TwitterIcon}
              alt="kreatesell twitter"
              className="cursor"
            />
          </div>

          <div className={styles.mobileAddress}>Cocoa house Dugbe, Ibadan</div>

          <div className={styles.mobileCopyright}>
            Copyright &copy; {new Date().getFullYear()} Kreatesell. All Rights
            Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};
