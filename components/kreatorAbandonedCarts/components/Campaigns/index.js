import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pagination, Card, Spin } from "antd";
import { BsPlusLg } from "react-icons/bs";
import Spinner from "components/Spinner";
import PaginationSizeChanger from "components/PaginationHelpers/PaginationSizeChanger";
import Campaign from "../Campaign";
import axiosAPI from "utils/axios";
import { showToast } from "utils";
import Clipboard from "public/images/clipboards.png";
import styles from "./index.module.scss";

const Campaigns = () => {
  const [uri, setUri] = useState("");
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const [campaigns, setCampaigns] = useState({
    data: null,
    total: 0,
    loading: false,
  });

  useEffect(() => {
    const url = new URL(
      `${process.env.BASE_URL}v1/kreatesell/product/campaign/get?Page=${filters.page}&Limit=${filters.limit}`
    );

    setUri(url);
  }, [filters.page, filters.limit]);

  useEffect(() => {
    if (uri) {
      setCampaigns(s => ({ ...s, loading: true }));
      axiosAPI.request(
        "get",
        uri,
        res => {
          setCampaigns(s => ({
            ...s,
            data: res.data.data,
            total: res.data.total_records,
            loading: false,
          }));
        },
        err => {
          setCampaigns(s => ({ ...s, loading: false }));
          setError(err.message);
          showToast(err.message, "error");
        }
      );
    }
  }, [uri]);

  if (error) {
    return (
      <Card className={styles.card}>
        <div className={styles.error__message}>
          Ann error has occurred and we could not get your campaigns.
        </div>
      </Card>
    );
  }

  if (!campaigns.data) return <Spinner />;

  const handlePageChange = page => {
    setFilters({ ...filters, page });
  };

  return (
    <Card className={styles.card}>
      <header className={styles.header}>
        <h2>Manage All Your Email Campaigns Here.</h2>
      </header>
      <Spin spinning={campaigns.loading}>
        {campaigns.data.length === 0 ? (
          <div className={styles.no__data}>
            <Image src={Clipboard} alt="clipboard" width={200} height={200} />
            <p>No record yet</p>
          </div>
        ) : (
          <>
            <PaginationSizeChanger
              dataSize={campaigns.total}
              filters={filters}
              setFilters={setFilters}
            />
            <article className={styles.campaign__wrapper}>
              <div className={styles.campaigns__container}>
                {campaigns.data.map(campaign => (
                  <Campaign key={campaign.id} campaign={campaign} />
                ))}
              </div>
              <Link href="/account/kreator/abandoned-carts/add">
                <a>
                  <BsPlusLg />
                  &nbsp; Add Email
                </a>
              </Link>
            </article>
            {campaigns.data.length > 0 && (
              <Pagination
                pageSize={filters.limit}
                current={filters.page}
                total={campaigns.total}
                responsive={true}
                onChange={handlePageChange}
              />
            )}
          </>
        )}
      </Spin>
    </Card>
  );
};

export default Campaigns;
