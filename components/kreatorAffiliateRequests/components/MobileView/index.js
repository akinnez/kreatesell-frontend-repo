import { memo } from "react";
import NoData from "components/NoData";
import RequestStatus from "../RequestStatus";
import RequestNotesButton from "../RequestNotesButton";
import DropDown from "../DropDown";
import PopOver from "../PopOver";
import dateFormat from "utils/dateFormat";
import styles from "./index.module.scss";

const MobileView = ({
  requests,
  showNoteModal,
  showActionModal,
  showReportModal,
}) => (
  <>
    {requests.length === 0 ? (
      <NoData />
    ) : (
      <ul className={styles.requests}>
        {requests.map(request => (
          <li key={request.id} className={styles.request}>
            <div className={styles.request__header}>
              <RequestStatus status={request.status} />
              <div>
                <RequestNotesButton
                  notes={request.notes}
                  noteFlag={request.note_flag}
                  showNoteModal={showNoteModal}
                />
                <DropDown
                  status={request.status}
                  requestId={request.id}
                  affiliate={request.affiliate_name}
                  affiliateId={request.affiliate_id}
                  product={request.product_name}
                  productId={request.product_id}
                  showActionModal={showActionModal}
                />
              </div>
            </div>
            <div className={styles.request__info}>
              <div>
                <strong>Requested On:</strong>{" "}
                <span>{dateFormat(request.request_date)}</span>
              </div>
              <PopOver
                affiliateReported={request.affiliate_reported}
                affiliateProfileImage={request.affiliate_profile_image}
                affiliateName={request.affiliate_name}
                affiliateUniqueUsername={request.affiliate_unique_username}
                affiliateCountry={request.affiliate_country}
                affiliateId={request.affiliate_id}
                showReportModal={showReportModal}
              />
            </div>
            <ol>
              <li className={styles.request__detail}>
                <strong>Product Name</strong>
                <span>{request.product_name}</span>
              </li>
              <li className={styles.request__detail}>
                <strong>Product Type</strong>
                <span>{request.product_type}</span>
              </li>
              <li className={styles.request__detail}>
                <strong>No of Sales</strong>
                <span>
                  {request.number_of_sales > 10
                    ? "10+"
                    : request.number_of_sales}
                </span>
              </li>
            </ol>
          </li>
        ))}
      </ul>
    )}
  </>
);

export default memo(MobileView);
