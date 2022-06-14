import Head from "next/head";
import { useRouter } from "next/router";
import { Card } from "antd";
import Spinner from "components/Spinner";
import ProfileLayout from "components/ProfileLayout";
import BackButton from "components/BackButton";
import RenderQuillHTML from "components/RenderQuillHTML";
import useFetchData from "hooks/useFetchData";
import styles from "public/css/AbandonedCartPreview.module.scss";

const Preview = () => {
  const router = useRouter();

  const { data: campaign, error } = useFetchData(
    router.query.id
      ? `${process.env.BASE_URL}v1/kreatesell/product/campaign/get/${router.query.id}`
      : null
  );

  if (error) {
    return (
      <ProfileLayout>
        <Head>
          <title>KreateSell | Abandoned Cart Preview</title>
        </Head>
        <header className={styles.header}>
          <BackButton />
        </header>
        <section className={styles.error}>{error}</section>
      </ProfileLayout>
    );
  }

  if (!campaign) {
    return (
      <ProfileLayout>
        <Head>
          <title>KreateSell | Abandoned Cart Preview</title>
        </Head>
        <header className={styles.header}>
          <BackButton />
        </header>
        <Spinner />
      </ProfileLayout>
    );
  }

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
          <RenderQuillHTML html={campaign.data.result.email_content} />
        </Card>
      </section>
    </ProfileLayout>
  );
};

export default Preview;
