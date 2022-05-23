import { useState, useEffect } from "react";
import Head from "next/head";
import { Typography, Button, Table } from "antd";
import useSWR from "swr";
import AuthLayout from "components/authlayout";
import Filters from "components/kreatorAffiliateRequests/components/Filters";
import AffiliateNote from "components/kreatorAffiliateRequests/components/AffiliateNote";
import ReportAffiliate from "components/kreatorAffiliateRequests/components/ReportAffiliate";
import tableColumns from "components/kreatorAffiliateRequests/tableColumns";
import axiosAPI from "utils/axios";
import { showToast } from "utils";
import styles from "public/css/KreatorAffiliateRequests.module.scss";

const { Title } = Typography;
const rowKey = record => record.id;
const statusArr = [
  { type: "All", label: "All" },
  { type: "Pending", label: "Pending" },
  { type: "Approved", label: "Approved" },
  { type: "Denied", label: "Denied" },
];

const AffiliateRequests = () => {
  const [notes, setNotes] = useState(false);
  const [report, setReport] = useState(false);
  const [requests, setRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [page, setPage] = useState(1);
  const [requestDate, setRequestDate] = useState("");
  const [affiliateName, setAffiliateName] = useState("");
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [status, setStatus] = useState("All");
  const [affiliateId, setAffiliateId] = useState(null);
  const [affiliateNote, setAffiliateNote] = useState(null);
  const [uri, setUri] = useState("");

  useEffect(() => {
    let url = new URL(
      `${process.env.BASE_URL}v1/kreatesell/product/fetch/affiliates/all?Page=${page}&Limit=8`
    );

    if (status !== "All") url.searchParams.set("Status", status);
    if (requestDate) url.searchParams.set("Launch_Date", requestDate);
    if (affiliateName) url.searchParams.set("Affiliate_Name", affiliateName);
    if (productName) url.searchParams.set("Product_Name", productName);
    if (productType) url.searchParams.set("Product_Type", productType);

    setUri(url);
  }, [page, status, requestDate, affiliateName, productName, productType]);

  const { data: res } = useSWR(
    () => (uri ? uri : null),
    url => {
      return axiosAPI.request(
        "get",
        url,
        res => {
          setRequests(res.data.data);
          setTotalRequests(res.data.total_records);
          return res;
        },
        err => {
          showToast(err.message, "error");
        }
      );
    }
  );

  const handleClicks = (setter, value) => param => {
    setter(value || value === false ? value : param);
  };

  const showReportModal = id => {
    setReport(true);
    setAffiliateId(id);
  };

  const showNotesModal = note => {
    setNotes(true);
    setAffiliateNote(note);
  };

  const updateRequest = (id, status) => {
    const newRequests = requests.map(request => {
      if (request.id === id) {
        request.status = status;
        return request;
      }

      return request;
    });

    setRequests(newRequests);
  };

  const columns = tableColumns(showNotesModal, updateRequest, showReportModal);

  return (
    <AuthLayout>
      <Head>
        <title>KreateSell | Kreator&#39;s Affiliate Requests</title>
      </Head>
      <header className={styles.header}>
        <Title>Affiliate Offers</Title>
      </header>
      <section>
        <Filters
          setProductName={setProductName}
          setAffiliateName={setAffiliateName}
          setProductType={setProductType}
          setRequestDate={setRequestDate}
        />
      </section>
      <section className={styles.status__btns__section}>
        <div className={styles.status__btns}>
          {statusArr.map(({ type, label }) => (
            <div className={styles.status__btn} key={label}>
              <Button
                onClick={handleClicks(setStatus, type)}
                type={status === type && "primary"}
              >
                {label}
              </Button>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.table__section}>
        <Table
          dataSource={requests}
          columns={columns}
          pagination={{
            position: ["bottomLeft"],
            pageSize: 8,
            responsive: true,
            total: totalRequests,
            current: page,
            onChange: handleClicks(setPage),
          }}
          rowKey={rowKey}
          loading={!res}
        />
      </section>
      {notes && (
        <AffiliateNote
          notes={notes}
          hideNotes={handleClicks(setNotes, false)}
          affiliateNote={affiliateNote}
        />
      )}
      {report && (
        <ReportAffiliate
          report={report}
          hideReport={handleClicks(setReport, false)}
          affiliateId={affiliateId}
        />
      )}
    </AuthLayout>
  );
};

export default AffiliateRequests;
