import { Select, Input } from "..";
import styles from "../../public/css/AdminDateHeader.module.scss";
import { SVGFilter } from "../../utils";
import Image from "next/image";
import { dayOptions, ticketsOptions } from "./partials";
// import { format } from "date-fns";

export const DateHeader = ({ showSelect = true }) => {
  return (
    <div className={styles.container}>
      <div className={styles.dateHeader}>
        <div className={styles.emptyDiv}></div>
        <div className={styles.today}>
          <Select
            options={dayOptions}
            value="Custom Select"
            placeholder="Today"
            placeHolderColor="#8c8c8c"
            label="Show"
            className={styles.select}
            height="44px"
          />
        </div>

        <div className={styles.currency}>
          <Select
            options={ticketsOptions}
            value="All Tickets"
            placeholder="Tickets"
            placeHolderColor="#8c8c8c"
            label="All Tickets"
            className={styles.select}
            height="44px"
          />
        </div>

        <div className={styles.dateCont}>
          <div className={styles.label}>Show from</div>
          <div className={styles.selectDate}>
            <Input type="date" className={styles.date} />
          </div>
        </div>

        <div className={styles.dateCont}>
          <div className={styles.label}>To</div>
          <div className={styles.selectDate}>
            <Input type="date" className={styles.date} />
          </div>
        </div>

        <div className={styles.filterCont}>
          <Image src={SVGFilter} alt="filter" width="80" height="44" />
        </div>
      </div>
    </div>
  );
};
