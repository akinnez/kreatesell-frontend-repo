import { useState, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { Typography } from "antd";
import Toolbar from "../Toolbar";
import PersonificationModal from "../PersonificationModal";
import "react-quill/dist/quill.snow.css";
import styles from "./index.module.scss";

const { Link: AntLink } = Typography;

const ReactQuill = dynamic(
  async function () {
    const { default: RQ } = await import("react-quill");
    return function MyRQ({ forwardedRef, ...props }) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);

const Editor = ({ formik }) => {
  const [personificationModal, setPersonificationModal] = useState(false);
  const editorElement = useRef(null);
  const editorContainer = useRef(null);

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
        handlers: {
          personification: () => setPersonificationModal(true),
        },
      },
    };
  }, []);

  const handleLabelEnter = () => {
    if (!formik.touched.email_content && !formik.errors.email_content) {
      editorContainer.current.classList.add(styles["label--hover"]);
    }
  };

  const handleLabelLeave = () => {
    editorContainer.current.classList.remove(styles["label--hover"]);
  };

  const handleLabelClick = () => {
    editorElement.current.focus();
    editorContainer.current.classList.remove(styles["label--hover"]);
  };

  const handleEditorChange = value => {
    const result = value === "<p><br></p>" ? "" : value;
    formik.setFieldValue("email_content", result);
  };

  const handleEditorBlur = () => {
    if (!formik.values.email_content) {
      formik.setFieldError("email_content", "Enter email content");
    }

    formik.setFieldTouched("email_content");
  };

  const handlePersonification = personifications => {
    const element = editorElement.current;
    const start = element.getEditorSelection()?.index ?? 0;
    const length = element.getEditorSelection()?.length ?? 0;

    if (length > 0) {
      element.getEditor().deleteText(start, length);
    }

    element.getEditor().insertText(start, " ");
    element.getEditor().insertText(start + 1, personifications, {
      bold: true,
      italic: true,
      underline: true,
    });

    // const end = element.editor.getLength() - 1;
    // element.getEditor().insertText(end, " ", {
    //   bold: false,
    //   italic: false,
    //   underline: false,
    // });
  };

  return (
    <>
      <div className={styles.editor}>
        <div>
          <label
            onMouseEnter={handleLabelEnter}
            onMouseLeave={handleLabelLeave}
            onClick={handleLabelClick}
          >
            Email Content
          </label>
          <AntLink>Add Media</AntLink>
        </div>
        <div
          ref={editorContainer}
          className={
            formik.touched.email_content && formik.errors.email_content
              ? `${styles.editor__container} ${styles["editor__container--error"]}`
              : `${styles.editor__container}`
          }
        >
          <Toolbar />
          <ReactQuill
            forwardedRef={editorElement}
            modules={modules}
            placeholder="Email Content"
            onChange={handleEditorChange}
            onBlur={handleEditorBlur}
            value={formik.values.email_content}
          />
        </div>
        <div
          className={
            formik.touched.email_content && formik.errors.email_content
              ? `${styles["editor__error-msg"]} ${styles["editor__error-msg--active"]}`
              : `${styles["editor__error-msg"]}`
          }
        >
          {formik.touched.email_content && formik.errors.email_content}
        </div>
      </div>
      {personificationModal && (
        <PersonificationModal
          personificationModal={personificationModal}
          setPersonificationModal={setPersonificationModal}
          handlePersonification={handlePersonification}
        />
      )}
    </>
  );
};

export default Editor;
