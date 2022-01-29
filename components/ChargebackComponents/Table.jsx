import { EmptyDataTable } from "utils";
import styles from "./Table.module.scss";
import Image from "next/image";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { Popover } from "antd";
import { useState } from "react";
import { AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import { BsReplyFill } from "react-icons/bs";
import moment from "moment";

const SuccessDiv = ({ text }) => {
  return (
    <div
      style={{
        background: "#4bf71625",
        borderRadius: "5px",
        width: "50px",
        textAlign: "center",
      }}
    >
      <p style={{ color: "#176300" }}>{text}</p>
    </div>
  );
};

const ErrorDiv = ({ text }) => {
  return (
    <div
      style={{
        background: "#f7211622",
        borderRadius: "5px",
        width: "50px",
        textAlign: "center",
      }}
    >
      <p style={{ color: "#f5222d" }}>{text}</p>
    </div>
  );
};

export const Table = ({ header, data, loading }) => {
  const [openPopOver, setOpenPopOver] = useState(false);
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {header?.map((item, i) => (
              <th key={i}>{item?.title}</th>
            ))}
          </tr>
        </thead>

        {Boolean(data?.length) && (
          <tbody className="t-body">
            {data?.map((item, i) => (
              <tr key={item?.id || i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.desc}</td>
                <td>{item.department}</td>
                <td>{moment(item.date).format("YYYY-MM-DD HH:mm:ss")}</td>
                <td>
                  {item.status ? (
                    <ErrorDiv text="Open" />
                  ) : (
                    <SuccessDiv text="Closed" />
                  )}
                </td>
                <td>
                  <Popover
                    placement="bottomRight"
                    title={null}
                    content={
                      <u className={styles.popoverUl}>
                        <li className={styles.popoverLi}>
                          <AiOutlineEye className={styles.popoverIcon} />
                          <p>View Ticket</p>
                        </li>
                        <li className={styles.popoverLi}>
                          <BsReplyFill className={styles.popoverIcon} />
                          <p>Reply</p>
                        </li>
                        <li className={styles.popoverLi}>
                          <AiOutlineClose className={styles.popoverIcon} />
                          <p>Close</p>
                        </li>
                      </u>
                    }
                    trigger="click"
                  >
                    {<IoEllipsisHorizontal className={styles.horizButton} />}
                  </Popover>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {!Boolean(data?.length) && (
        <div className="w-full h-full flex flex-col items-center justify-center p-8">
          <div>
            <Image src={EmptyDataTable} alt="empty table" />
          </div>
          {loading ? (
            <div>Loading Data ...</div>
          ) : (
            <div className="text-center mt-3 bolder">No available data</div>
          )}
        </div>
      )}
    </div>
  );
};
