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
import { useState } from "react";

export const Footer = () => {
  const router = useRouter();
  const [isHiring] = useState(true);

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
              <Image src={WhatsappIcon} alt="mobile" />
            </div>
            <a
              className="text"
              rel="noopener noreferrer"
              target="blank"
              // href="tel:+2349062002777"
              href="https://wa.me/+2349062002777"
            >
              Contact Us
            </a>
          </div>

          {/* <div className={styles.brandContact}>
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
          </div> */}
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
            <Link href="/payouts">
              <a>Payouts</a>
            </Link>
            <Link href="/features">
              <a>Features</a>
            </Link>

            <Link href="/Affiliate">
              <a>Affiliates</a>
            </Link>
          </div>
        </div>

        <div>
          <div className={styles.categoryTitle}>Company</div>
          <div className={styles.categoryLink}>
            <Link href="/about-us">
              <a>About</a>
            </Link>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
            <Link href="#">
              <a>Media</a>
            </Link>
            <Link href="/careers">
              <a className={styles.jobs}>
                Jobs{" "}
                {isHiring && (
                  <div className={styles.hireBox}>we&apos;re hiring!</div>
                )}
              </a>
            </Link>
            <Link href="/integrations">
              <a>Integration</a>
            </Link>
          </div>
        </div>

        <div>
          <div className={styles.categoryTitle}>Support</div>
          <div className={styles.categoryLink}>
            <Link href="/signup">
              <a>Getting Started</a>
            </Link>
            <Link href="/how-it-works">
              <a>Tutorials</a>
            </Link>
            <Link href="/faq">
              <a>FAQ</a>
            </Link>

            <a href="https://wa.me/+2349016324945">Contact Support</a>
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
            <Link href="/legal/affiliate-terms">
              <a>Affiliate Terms</a>
            </Link>
            <Link href="/legal/terms-of-service">
              <a>Terms of Service</a>
            </Link>
          </div>
        </div>

        <div>
          <div className={styles.categoryTitle}>Follow us</div>
          <div className={styles.categorySocial}>
            <a
              href="https://www.facebook.com/usekreatesell"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={FBIcon}
                alt="kreatesell facebook"
                className="cursor"
              />
            </a>
            <a
              href="https://www.instagram.com/usekreatesell"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={InstaIcon}
                alt="kreatesell instagram"
                className="cursor"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/usekreatesell"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={LinkedIcon}
                alt="kreatesell linkedin"
                className="cursor"
              />
            </a>

            <a
              href="https://twitter.com/usekreatesell"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={TwitterIcon}
                alt="kreatesell twitter"
                className="cursor"
              />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.mobileFooter}>
        <div className={styles.firstRow}>
          <div className={styles.firstRowA}>
            <div className={styles.categoryTitle}>Product</div>
            <div className={styles.categoryLink}>
              <Link href="/">
                <a>Home</a>
              </Link>
              <Link href="/pricing">
                <a>Pricing</a>
              </Link>
              <Link href="/payouts">
                <a>Payouts</a>
              </Link>
              <Link href="/features">
                <a>Features</a>
              </Link>

              <Link href="/Affiliate">
                <a>Affiliates</a>
              </Link>
            </div>
          </div>

          <div className={styles.firstRowB}>
            <div className={styles.categoryTitle}>Company</div>
            <div className={styles.categoryLink}>
              <Link href="/about-us">
                <a>About</a>
              </Link>
              <Link href="/blog">
                <a>Blog</a>
              </Link>
              <Link href="#">
                <a>Media</a>
              </Link>
              <Link href="#">
                <a className={styles.jobs}>
                  Jobs{" "}
                  {isHiring && (
                    <div className={styles.hireBox}>we&apos;re hiring!</div>
                  )}
                </a>
              </Link>
              <Link href="/integrations">
                <a>Integration</a>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.secondRow}>
          <div className={styles.firstRowA}>
            <div className={styles.categoryTitle}>Support</div>
            <div className={styles.categoryLink}>
              <Link href="/signup">
                <a>Getting Started</a>
              </Link>
              <Link href="/how-it-works">
                <a>Tutorials</a>
              </Link>
              <Link href="/faq">
                <a>FAQ</a>
              </Link>

              <a href="https://wa.me/+2349016324945">Contact Support</a>
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
              <Link href="/legal/affiliate-terms">
                <a>Affiliate Terms</a>
              </Link>
              <Link href="/legal/terms-of-service">
                <a>Terms of Service</a>
              </Link>
            </div>
          </div>
        </div>
        <span className={styles.thinLine}></span>

        <div className={styles.brandMobile}>
          <Image src={FooterBrand} alt="footer brand" />
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
            <a
              href="https://www.facebook.com/usekreatesell"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={FBIcon}
                alt="kreatesell facebook"
                className="cursor"
              />
            </a>
            <a
              href="https://www.instagram.com/usekreatesell"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={InstaIcon}
                alt="kreatesell instagram"
                className="cursor"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/usekreatesell"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={LinkedIcon}
                alt="kreatesell linkedin"
                className="cursor"
              />
            </a>
            <a
              href="https://wa.me/+2349062002777"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={WhatsappIcon}
                alt="kreatesell whatsapp"
                className="cursor"
              />
            </a>

            <a
              href="https://twitter.com/usekreatesell"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={TwitterIcon}
                alt="kreatesell twitter"
                className="cursor"
              />
            </a>
          </div>

          {/* <div className={styles.mobileAddress}>Cocoa house Dugbe, Ibadan</div> */}

          <div className={styles.mobileCopyright}>
            Copyright &copy; {new Date().getFullYear()} Kreatesell. All Rights
            Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};
