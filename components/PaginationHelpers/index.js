import { useState } from "react";
import { Input, Select } from "antd";
import styles from "./index.module.scss";

const PaginationHelper = ({ dataSize, filters, setFilters }) => {
  const [input, setInput] = useState("");

  const handleSelect = value => {
    const totalPages = Math.ceil(dataSize / value);
    setFilters({
      ...filters,
      limit: value,
      page: filters.page > totalPages ? totalPages : filters.page,
    });
  };

  const totalPages = Math.ceil(dataSize / filters.limit);
  const handleInput = () => {
    if (!input || input === "0") return;

    const page = +input > totalPages ? totalPages : +input;
    setFilters({ ...filters, page });
    setInput("");
  };

  const handleInputChange = e => {
    const { value } = e.target;

    if (/[^\d]$/.test(value)) {
      const newValue = value.replace(/[^\d]$/, "");
      setInput(newValue);
      return;
    }

    setInput(value);
  };

  return (
    <div className={styles["pagination-helper__container"]}>
      <div className={styles["pagination-helper__select-box"]}>
        <Select defaultValue={filters.limit} onChange={handleSelect}>
          <Select.Option value={10}>10 / page</Select.Option>
          <Select.Option value={25}>25 / page</Select.Option>
          <Select.Option value={50}>50 / page</Select.Option>
          <Select.Option value={100}>100 / page</Select.Option>
        </Select>
      </div>
      {filters.limit <= dataSize ? (
        <div className={styles["pagination-helper__input-box"]}>
          <span>Go to</span>
          <Input
            value={input}
            onChange={handleInputChange}
            onPressEnter={handleInput}
          />
        </div>
      ) : null}
    </div>
  );
};

export default PaginationHelper;
