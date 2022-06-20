import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Spin } from "antd";
import { FaRegUser } from "react-icons/fa";
import { BsFillImageFill } from "react-icons/bs";
import ProfilePageError from "components/ProfilePageError";
import ProfilePageLoading from "components/ProfilePageLoading";
import PageWrapper from "components/affiliates/PageWrapper";
import KreatorAvatar from "components/affiliates/KreatorAvatar";
import AffiliatePageFooter from "components/affiliates/AffiliatePageFooter";
import KreatorSocials from "components/affiliateKreatorPreview/KreatorSocials";
import KreatorProducts from "components/affiliateKreatorPreview/KreatorProducts";
import axiosAPI from "utils/axios";
import styles from "public/css/AffiliateKreatorPreview.module.scss";

const KreatorPreview = () => {
  const [uri, setUri] = useState("");
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const [data, setData] = useState({
    kreator: null,
    products: null,
    totalProducts: 0,
    loading: false,
  });

  const router = useRouter();

  useEffect(() => {
    const name = router.query.storeName;

    if (name) {
      const url = new URL(
        `${process.env.BASE_URL}v1/kreatesell/product/fetch/${name}?Page=${filters.page}&Limit=${filters.limit}`
      );

      setUri(url);
    }
  }, [router.query.storeName, filters.page, filters.limit]);

  useEffect(() => {
    if (uri) {
      setData(s => ({ ...s, loading: true }));
      axiosAPI.request(
        "get",
        uri,
        res => {
          const response = res.data;

          setData({
            kreator: {
              ...response.store_details,
              full_name: response.kreator_full_name,
            },
            products: response.products.data,
            totalProducts: response.products.total_records,
            loading: false,
          });
        },
        err => {
          setData(s => ({ ...s, loading: false }));
          setError(err.message);
        }
      );
    }
  }, [uri]);

  if (error) {
    return <ProfilePageError errorMsg={error} title="Kreator Preview" />;
  }

  if (!data.kreator) return <ProfilePageLoading title="Kreator Preview" />;

  return (
    <PageWrapper title="Kreator Preview">
      <section className={styles.kreator}>
        {data.kreator.cover_page ? (
          <div className={styles.kreator__banner}>
            <Image
              src={data.kreator.cover_page}
              alt={`${data.kreator.full_name} cover page`}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        ) : (
          <div className={styles.empty__image__Banner}>
            <BsFillImageFill />
          </div>
        )}
        <div className={styles.kreator__info__container}>
          <div className={styles.kreator__info}>
            {data.kreator.display_picture ? (
              <div className={styles.kreator__image}>
                <KreatorAvatar
                  image={data.kreator.display_picture}
                  name={data.kreator.full_name}
                />
              </div>
            ) : (
              <div className={styles.empty__avatar}>
                <FaRegUser />
              </div>
            )}
            <div className={styles.kreator__details}>
              <p>
                <strong>{data.kreator.full_name}</strong>
              </p>
              {data.kreator.domain_link && <p>{data.kreator.domain_link}</p>}
            </div>
          </div>
          <KreatorSocials
            facebook={data.kreator.facebook}
            instagram={data.kreator.instagram}
            linkedIn={data.kreator.linked_ln}
            mobile={data.kreator.mobile_number}
            twitter={data.kreator.twitter}
          />
        </div>
        <div className={styles.kreator__bio}>
          <p>{data.kreator.bio_data}</p>
        </div>
      </section>
      <section className={styles.products}>
        {data.products.length === 0 ? (
          <div className={styles.no__products}>
            <strong>
              {data.kreator.full_name} does not have any products on display
            </strong>
          </div>
        ) : (
          <Spin spinning={data.loading}>
            <KreatorProducts
              products={data.products}
              totalProducts={data.totalProducts}
              filters={filters}
              setFilters={setFilters}
            />
          </Spin>
        )}
      </section>
      <AffiliatePageFooter />
    </PageWrapper>
  );
};

export default KreatorPreview;
