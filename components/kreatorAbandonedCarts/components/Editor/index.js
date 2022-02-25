import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { Typography } from "antd";
import Toolbar from "../Toolbar";
// import PersonificationModal from "../PersonificationModal";
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
  // const [personificationModal, setPersonificationModal] = useState(false);
  const editorElement = useRef(null);
  const editorContainer = useRef(null);

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
        // handlers: {
        //   personification: () => setPersonificationModal(true),
        //   file: () => null,
        // },
      },
    };
  }, []);

  const handleLabelEnter = () => {
    // if (!formik.touched.email_content && !formik.errors.email_content) {
    //   editorContainer.current.classList.add(styles.labelHover);
    // }
    editorContainer.current.classList.add(styles.labelHover);
  };

  const handleLabelLeave = () => {
    editorContainer.current.classList.remove(styles.labelHover);
  };

  const handleLabelClick = () => {
    editorElement.current.focus();
    editorContainer.current.classList.remove(styles.labelHover);
  };

  const handleEditorChange = value => {
    formik.setFieldValue("email_content", value);
  };

  const handleEditorBlur = () => {
    if (!formik.values.email_content) {
      // formik.setFieldError("email_content", "Enter email content");
      formik.setFieldTouched("email_content");
    } else {
      formik.setFieldTouched("email_content");
    }
  };

  // const handlePersonification = personifications => {
  //   const element = editorElement.current;
  //   const start = element.getEditorSelection()?.index ?? 0;
  //   const length = element.getEditorSelection()?.length ?? 0;

  //   if (length > 0) {
  //     element.getEditor().deleteText(start, length);
  //   }

  //   element.getEditor().insertText(start, personifications, { bold: true });
  // };

  return (
    <>
      <div className={styles.editorWrapper}>
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
          className={styles.editorContainer}
          // className={
          //   formik.touched.email_content && formik.errors.email_content
          //     ? `${styles.editorContainer} ${styles.editorContainerError}`
          //     : `${styles.editorContainer}`
          // }
        >
          <Toolbar />
          <ReactQuill
            forwardedRef={editorElement}
            modules={modules}
            // placeholder="Email Content"
            onChange={handleEditorChange}
            onBlur={handleEditorBlur}
            value={formik.values.email_content}
          />
        </div>
        {/* <div
          className={
            formik.touched.email_content && formik.errors.email_content
              ? `${styles.editorErrorMsg} ${styles.editorErrorMsgTrue}`
              : `${styles.editorErrorMsg}`
          }
        >
          {formik.touched.email_content && formik.errors.email_content}
        </div> */}
      </div>
      {/* {personificationModal && (
        <PersonificationModal
          personificationModal={personificationModal}
          setPersonificationModal={setPersonificationModal}
          handlePersonification={handlePersonification}
        />
      )} */}
    </>
  );
};

export default Editor;
