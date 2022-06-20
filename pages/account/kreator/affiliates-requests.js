import { useState } from "react";
import Head from "next/head";
import { Typography, Button, Table } from "antd";
import useSWR from "swr";
import AuthLayout from "components/authlayout";
import SuccessModalBox from "components/SuccessModalBox";
import PaginationHelper from "components/PaginationHelpers";
import Filters from "components/kreatorAffiliateRequests/components/Filters";
import AffiliateNote from "components/kreatorAffiliateRequests/components/AffiliateNote";
import ReportAffiliate from "components/kreatorAffiliateRequests/components/ReportAffiliate";
import ActionModal from "components/kreatorAffiliateRequests/components/ActionModal";
import tableColumns from "components/kreatorAffiliateRequests/tableColumns";
import useFilters from "hooks/useFilters";
import axiosAPI from "utils/axios";
import { showToast } from "utils";
import styles from "public/css/KreatorAffiliateRequests.module.scss";

const { Title, Text } = Typography;
const rowKey = record => record.id;
const statusArr = [
  { type: "All", label: "All" },
  { type: "Pending", label: "Pending" },
  { type: "Approved", label: "Approved" },
  { type: "Declined", label: "Declined" },
];

const AffiliateRequests = () => {
  const [requests, setRequests] = useState({ data: [], total: 0 });
  const [successModal, setSuccessModal] = useState(false);
  const [noteModal, setNoteModal] = useState({ visible: false, note: null });
  const [reportModal, setReportModal] = useState({ visible: false, id: null });

  const [actionModal, setActionModal] = useState({
    visible: false,
    data: null,
  });

  const { uri, filters, setFilters } = useFilters(
    "v1/kreatesell/product/fetch/affiliates/all"
  );

  const { data: res } = useSWR(
    () => (uri ? uri : null),
    url => {
      return axiosAPI.request(
        "get",
        url,
        res => {
          setRequests({
            ...requests,
            data: res.data.data,
            total: res.data.total_records,
          });
          return res;
        },
        err => {
          showToast(err.message, "error");
        }
      );
    }
  );

  const handler = (setter, field, value) => param => {
    setter(s => ({ ...s, [field]: value || param }));
  };

  const handleSuccess = value => {
    setSuccessModal(value);
  };

  const hideHandler = (setter, field) => () => {
    setter({ visible: false, [field]: null });
  };

  const showHandler = (setter, field) => value => {
    setter({ visible: true, [field]: value });
  };

  const showReportModal = showHandler(setReportModal, "id");
  const showActionModal = showHandler(setActionModal, "data");
  const showNoteModal = showHandler(setNoteModal, "note");

  const updateReported = id => {
    const newRequests = requests.data.map(request => {
      if (request.affiliate_id === id) {
        request.affiliate_reported = "true";
        return request;
      }

      return request;
    });

    setRequests({ ...requests, data: newRequests });
  };

  const updateStatus = (id, value) => {
    const newRequests = requests.data.map(request => {
      if (request.id === id) {
        request.status = value;
        return request;
      }

      return request;
    });

    setRequests({ ...requests, data: newRequests });
  };

  const columns = tableColumns(showReportModal, showActionModal, showNoteModal);

  return (
    <AuthLayout headerTitle="REQUESTS">
      <Head>
        <title>KreateSell | Kreator&#39;s Affiliate Requests</title>
      </Head>
      <header className={styles.header}>
        <Title>Affiliate Offers</Title>
      </header>
      <section>
        <Filters setFilters={setFilters} />
      </section>
      <PaginationHelper
        dataSize={requests.total}
        filters={filters}
        setFilters={setFilters}
      />
      <section className={styles.status__btns__section}>
        <div className={styles.status__btns}>
          {statusArr.map(({ type, label }) => (
            <div className={styles.status__btn} key={label}>
              <Button
                onClick={handler(setFilters, "status", type)}
                type={filters.status === type ? "primary" : "default"}
              >
                {label}
              </Button>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.table__section}>
        <Table
          dataSource={requests.data}
          columns={columns}
          pagination={{
            position: ["bottomLeft"],
            pageSize: filters.limit,
            current: filters.page,
            total: requests.total,
            responsive: true,
            onChange: handler(setFilters, "page", null),
          }}
          rowKey={rowKey}
          loading={!res}
        />
      </section>
      {successModal && (
        <SuccessModalBox
          modalIsVisible={successModal}
          closeModal={() => handleSuccess(false)}
        >
          <section className={styles.content}>
            <p>
              <Text>Report Successfully Sent</Text>
            </p>
            <p>
              <Text>
                We would review it and if the affiliate is found guilty, they
                would no longer have access to your products.
              </Text>
            </p>
          </section>
        </SuccessModalBox>
      )}
      {noteModal.visible && (
        <AffiliateNote
          noteIsVisible={noteModal.visible}
          hideNote={hideHandler(setNoteModal, "note")}
          note={noteModal.note}
        />
      )}
      {reportModal.visible && (
        <ReportAffiliate
          reportIsVisible={reportModal.visible}
          hideReport={hideHandler(setReportModal, "id")}
          id={reportModal.id}
          updateReported={updateReported}
          showSuccess={() => handleSuccess(true)}
        />
      )}
      {actionModal.visible && (
        <ActionModal
          actionIsVisible={actionModal.visible}
          hideAction={hideHandler(setActionModal, "data")}
          updateStatus={updateStatus}
          {...actionModal.data}
        />
      )}
    </AuthLayout>
  );
};

export default AffiliateRequests;
