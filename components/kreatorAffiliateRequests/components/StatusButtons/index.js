import { Button } from "antd";
import styles from "./index.module.scss";

const statusArr = [
  { type: "All", label: "All" },
  { type: "Pending", label: "Pending" },
  { type: "Approved", label: "Approved" },
  { type: "Declined", label: "Declined" },
];

const StatusButtons = ({ setFilters, filters }) => {
  const handleClick = type => {
    setFilters({ ...filters, status: type });
  };

  return (
    <section className={styles.status__btns__section}>
      <div className={styles.status__btns}>
        {statusArr.map(({ type, label }) => (
          <div className={styles.status__btn} key={label}>
            <Button
              onClick={() => handleClick(type)}
              type={filters.status === type ? "primary" : "default"}
            >
              {label}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatusButtons;
