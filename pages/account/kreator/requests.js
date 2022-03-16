import { useState, useMemo } from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import { Typography, Button, Table } from "antd";
import useSWR from "swr";
import AuthLayout from "components/authlayout";
import Filters from "components/kreatorAffiliateRequests/components/Filters";
import {
  statusArr,
  requestsData,
} from "components/kreatorAffiliateRequests/data";
import AffiliateNote from "components/kreatorAffiliateRequests/components/AffiliateNote";
import ReportAffiliate from "components/kreatorAffiliateRequests/components/ReportAffiliate";
import tableColumns from "components/kreatorAffiliateRequests/tableColumns";
import normalize from "utils/normalize";
import axiosAPI from "utils/axios";
import { showToast } from "utils";
import styles from "public/css/KreatorAffiliateRequests.module.scss";

const { Title } = Typography;
const rowKey = record => record.id;

const AffiliateRequests = () => {
  const [notes, setNotes] = useState(false);
  const [report, setReport] = useState(false);
  const [requests, setRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [requestDate, setRequestDate] = useState("");
  const [affiliateName, setAffiliateName] = useState("");
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [status, setStatus] = useState("All");
  const [affiliateId, setAffiliateId] = useState(null);
  const [affiliateNote, setAffiliateNote] = useState(null);

  const { productTypes } = useSelector(state => state.product);
  const types = useMemo(() => normalize(productTypes, "id"), [productTypes]);

  let uri = `${process.env.BASE_URL}v1/kreatesell/product/fetch/affiliates/all?Page=${page}&Limit=${limit}&Status=${status}`;

  if (requestDate) {
    uri = `${uri}&Launch_Date=${requestDate}`;
  }

  if (affiliateName) {
    uri = `${uri}&Affiliate_Name=${affiliateName}`;
  }

  if (productName) {
    uri = `${uri}&Product_Name=${productName}`;
  }

  if (productType) {
    uri = `${uri}&Product_Type=${productType}`;
  }

  const { data: res } = useSWR(uri, url => {
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
  });

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

  const columns = tableColumns({
    types,
    showNotesModal,
    updateRequest,
    showReportModal,
  });

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
          dataSource={res && requests.length === 0 ? requestsData : requests}
          columns={columns}
          pagination={{
            position: ["bottomLeft"],
            defaultPageSize: limit,
            responsive: true,
            total: requests.length === 0 ? requestsData.length : totalRequests,
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
