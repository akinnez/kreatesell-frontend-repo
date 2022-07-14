import Image from "next/image";
import { Button } from "antd";
import ReadImg from "public/images/note_read.png";
import UnreadImg from "public/images/note_unread.png";
import styles from "./index.module.scss";

const RequestNotesButton = ({ notes, noteFlag, showNoteModal }) => (
  <Button
    onClick={() => showNoteModal(notes)}
    shape="round"
    className={`${styles.notes__btn} ${
      noteFlag === "Unread"
        ? styles["notes__btn--unread"]
        : styles["notes__btn--read"]
    }`}
  >
    {noteFlag === "Unread" ? (
      <Image src={UnreadImg} alt="Unread Image" width={18} height={18} />
    ) : (
      <Image src={ReadImg} alt="Read Image" width={18} height={18} />
    )}
  </Button>
);

export default RequestNotesButton;
