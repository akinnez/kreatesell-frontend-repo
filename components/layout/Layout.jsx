import { Meta, Navbar, Footer, SubFooter } from "..";
import styles from "../../public/css/Signup.module.scss";
import { FaWhatsapp } from "react-icons/fa";
export const Layout = ({
  children,
  title,
  keywords,
  description,
  subFooter = false,
  defaultMarginTop,
  ...subFooterProps
}) => {
  return (
    <>
      <Meta title={title} keywords={keywords} description={description} />
      <section
        className={styles.layout}
        style={{ width: "100%", overflow: "hidden" }}
      >
        <Navbar />
        <a
          className={styles.whatsApp}
          href="https://wa.me/+2349016324945"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp />
        </a>
        <main className={defaultMarginTop && styles.layoutMargin}>
          {children}
        </main>
        {subFooter && <SubFooter {...subFooterProps} />}
      </section>
      <Footer />
    </>
  );
};
