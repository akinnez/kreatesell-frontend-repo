import { Table } from "./Table";
import { AllTicketsHeader } from "./TableHeader";
import { DownloadIcon, RightArrow } from "utils";
import styles from "./TicketsTable.module.scss";
import Image from "next/image";
// import { Pagination } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TicketTable = ({ tickets, handlePaginationChange, page }) => {
  const router = useRouter();

  const [productData, setProductData] = useState([]);
  const [productName, setProductName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [productStatusId, setProductStatusId] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className={styles.ticketsContainer}>
      <div className={styles.ticketsTopSection}>
        <div className={styles.ticketsTopSectionInner}>
          <div className="text-primary-blue  font-semibold text-xs pr-2">
            {/* View All Ticket */}
          </div>
          {/* <RightArrow color="#0072EF" /> */}
        </div>
        <div className={styles.ticketsTopSectionInner}>
          <div className="text-primary-blue  font-semibold text-xs pr-2">
            Export Data in CSV
          </div>
          <Image src={DownloadIcon} />
        </div>
      </div>

      <div>
        <Table data={tickets} />
      </div>

      {/* <div className="py-8 lg:pt-0">
          <Pagination
            defaultCurrent={1}
            onChange={handlePaginationChange}
            current={page}
            total={tickets?.length}
            defaultPageSize={10}
          />
        </div>
     */}
    </div>
  );
};

export default TicketTable;
