import { Select, Input } from "components";
import { SVGFilter } from "../../utils";
import Image from "next/image";
import { dayOptions, currencyOptions } from "./partials";
import styles from "./ChargeBackHeader.module.scss";
import { format } from "date-fns";
// import { useEffect } from "react";

export const ChargeBackHeader = ({
  handleSearchInput,
  handleDurationInput,
  handleProductStatus,
  handleStartDate,
  handleEndDate,
  handleDateToInput,
  handleSearchSubmit,
  productStatusOptions,
}) => {
  const fmtDt = format(Date.now(), "yyyy-MM-dd");

  // useEffect(() => {}, [handleSearchInput]);

  return (
    <div className={styles.chargeBackHeader}>
      <div className={styles.searchInput}>
        <p className={styles.searchLabel}>Search</p>
        <Input
          placeholder="Search"
          className={styles.search}
          onChange={handleSearchInput}
        />
      </div>

      <div className={styles.selectDivStyle}>
        <Select
          options={currencyOptions}
          placeholder="All"
          placeHolderColor="#8c8c8c"
          label="Currency"
          height="50px"
          className={styles.selectStyle}
          onChange={(e) => handleProductStatus(e.value)}
        />
      </div>

      <div className={styles.fromDate}>
        <p className={styles.dateLabel}>Date From</p>
        <div>
          <input
            type="date"
            className={styles.date}
            defaultValue={fmtDt}
            onChange={handleStartDate}
          />
        </div>
      </div>

      <div className={styles.fromDate}>
        <p className={styles.dateLabel}>Date To</p>
        <div>
          <input
            type="date"
            className={styles.date}
            defaultValue={fmtDt}
            onChange={handleEndDate}
          />
        </div>
      </div>

      <div>
        <div className={styles.filterCont} onClick={handleSearchSubmit}>
          <Image src={SVGFilter} alt="filter" width="85" height="50" />
        </div>
      </div>
    </div>
  );
};
