import { Meta, Navbar, Footer, SubFooter } from "..";
import styles from "../../public/css/Signup.module.scss";

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
      <section style={{ width: "100%", overflow: "hidden" }}>
        <Navbar />
        <main className={defaultMarginTop && styles.layoutMargin}>
          {children}
        </main>
        {subFooter && <SubFooter {...subFooterProps} />}
      </section>
      <Footer />
    </>
  );
};
