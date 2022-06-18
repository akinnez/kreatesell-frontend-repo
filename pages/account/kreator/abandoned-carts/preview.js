import Head from "next/head";
import { useSelector } from "react-redux";
import { Card } from "antd";
import ProfileLayout from "components/ProfileLayout";
import BackButton from "components/BackButton";
import "react-quill/dist/quill.snow.css";
import styles from "public/css/AbandonedCartPreview.module.scss";

const Preview = () => {
  const { campaign } = useSelector(state => state.abandonedCart);

  return (
    <ProfileLayout>
      <Head>
        <title>KreateSell | Abandoned Cart Preview</title>
      </Head>
      <header className={styles.header}>
        <BackButton />
      </header>
      <section className={styles.content}>
        <Card className={styles.card}>
          <div className="ql-container ql-snow">
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: campaign?.email_content }}
            />
          </div>
        </Card>
      </section>
    </ProfileLayout>
  );
};

export default Preview;
