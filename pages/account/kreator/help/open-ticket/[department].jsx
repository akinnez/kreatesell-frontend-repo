import { useState } from "react";
import { Button } from "components/button/Button";
import AuthLayout from "../../../../../components/authlayout";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import EditorToolbar, {
  modules,
  formats,
} from "../../../../../components/PostTicket/EditorToolbar";
import "react-quill/dist/quill.snow.css";
// import "./editor.module.scss";
import Image from "next/image";
import { MdReply, MdClose } from "react-icons/md";
// import Editor from "./Editor";
import FileUpload from "components/PostTicket/FileUpload";
import styles from "../../../../../public/css/PostTicket.module.scss";
import { Input } from "components/input/Input";
import { useRouter } from "next/router";
import axios from "axios";
import { showToast } from "utils";

const CardProfile = () => {
  return (
    <div className={styles.cardBodyDiv}>
      <div className={styles.userDiv}>
        <div className={styles.userImageDiv}>
          {/* <Image
            src="/images/person.jpg"
            width={60}
            height={60}
            layout="fixed"
            alt="Kreator's Image"
            className={styles.userImage}
          /> */}
          <div className={styles.checkedImage}>
            <Image
              src="/images/upgrade-active-tick.svg"
              alt="Checked"
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className={styles.userInfoDiv}>
          <h5 className={styles.userName}> Adeyemi Samuel</h5>
          <p className={styles.userRole}> Kreator</p>
        </div>
      </div>
    </div>
  );
};

const CardBody = (props) => {
  const {
    files,
    setFiles,
    subject,
    message,
    handleChangeSubject,
    handleChangeMessage,
    handleSubmit,
  } = props;

  return (
    <div>
      <div className={styles.cardResponsDiv}>
        <div className={styles.inputDiv}>
          <Input
            type="text"
            value={subject}
            placeholder="Enter the heading of the ticket"
            label="Ticket Heading"
            height={30}
            onChange={(e) => handleChangeSubject(e)}
          />
        </div>
        <h6>Message</h6>
        <div className="text-editor">
          <EditorToolbar />
          <ReactQuill
            theme="snow"
            value={message}
            onChange={(e) => handleChangeMessage(e)}
            placeholder={"Write the details of your ticket here"}
            modules={modules}
            formats={formats}
          />
        </div>

        <br />
        <h6>Attachment</h6>
        <FileUpload files={files} setFiles={setFiles} />
        <br />
        <div style={{ marginTop: "6px" }}>
          <Button bgColor="blue" text="Submit" onClick={() => handleSubmit()} />
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <Button
            text="Cancel"
            className={styles.cancelSubmit}
            onClick={() => handleCloseEditor()}
          />
        </div>
      </div>
    </div>
  );
};

const Department = () => {
  const router = useRouter();

  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const handleChangeSubject = (e) => setSubject(e.target.value);
  const handleChangeMessage = (e) => setMessage(e);
  const handleSubmit = () => {
    const data = {
      subject,
      message,
      department: router?.query?.department,
    };
    if (!subject || !message) {
      showToast("All fields are required", "error");
    }

    console.log(data);
    axios
      .post(`${process.env.BASE_URL}tickets/Create`, data)
      .then((res) => {
        setSubject("");
        setMessage("");
        showToast("Ticket have been opend successfully", "success");
      })
      .catch((err) => {
        console.log("sssssss", err);
        showToast(`${err.message}`, "error");
      });
  };
  return (
    <AuthLayout>
      <div className={styles.container}>
        <div className={styles.headerDiv}>
          <h3 className={styles.header}>Open a Ticket</h3>
        </div>
        <CardBody
          subject={subject}
          message={message}
          handleChangeSubject={handleChangeSubject}
          handleChangeMessage={handleChangeMessage}
          files={files}
          setFiles={setFiles}
          handleSubmit={handleSubmit}
        />
      </div>
    </AuthLayout>
  );
};

export default Department;
