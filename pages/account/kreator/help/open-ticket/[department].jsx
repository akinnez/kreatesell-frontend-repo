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
import router, { useRouter } from "next/router";
import axios from "axios";
import { showToast, checkExpiredUserToken, getUserToken } from "utils";

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
    submitting,
    uploadingFiles,
    setUploadingFiles,
  } = props;

  const router = useRouter();
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
        <FileUpload
          files={files}
          setFiles={setFiles}
          uploadingFiles={uploadingFiles}
          setUploadingFiles={setUploadingFiles}
        />
        <br />
        <div style={{ marginTop: "6px" }}>
          <Button
            disabled={submitting || files?.length > 5}
            bgColor="blue"
            text="Submit"
            onClick={() => handleSubmit()}
          />
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <Button
            disabled={submitting}
            text="Cancel"
            className={styles.cancelSubmit}
            onClick={() => router.back()}
          />
        </div>
      </div>
    </div>
  );
};

const Department = () => {
  const router = useRouter();

  const [files, setFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChangeSubject = (e) => setSubject(e.target.value);
  const handleChangeMessage = (e) => setMessage(e);

  const handleSubmit = () => {
    //   console.log("aaaaaaaaa", files);
    // console.log("ddddddddd", uploadingFiles);

    checkExpiredUserToken();
    const token = getUserToken();

    setSubmitting(true);
    if (!subject || subject === "" || !message || message === "") {
      setSubmitting(false);
      return showToast("All fields are required", "error");
    }
    const formData = new FormData();

    for (let i = 0; i < uploadingFiles.length; i++) {
      formData.append("ImagePaths", uploadingFiles[i]);
    }
    formData.append("Subject", subject);
    formData.append("Message", message);
    formData.append("Department", router?.query?.department);

    axios
      .post(`${process.env.BASE_URL}tickets/Create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSubject("");
        setMessage("");
        setFiles([]);
        showToast("Ticket have been opend successfully", "success");
        setSubmitting(false);
      })
      .catch((err) => {
        // console.log("sssssss", err);
        showToast(`${err.message}`, "error");
        setSubmitting(false);
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
          submitting={submitting}
          uploadingFiles={uploadingFiles}
          setUploadingFiles={setUploadingFiles}
        />
      </div>
    </AuthLayout>
  );
};

export default Department;
