import React from "react";
// import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Button } from "components/button/Button";
import { FaPlus } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import styles from "./fileupload.module.scss";
import { AiFillDelete } from "react-icons/ai";

function FileUpload({ files, setFiles }) {
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: "image/*",
    maxFiles: 3,
    multiple: true,
    onDrop: (acceptedFiles) => {
      setFiles((prevState) => {
        return [
          ...prevState,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        ];
      });
    },
  });

  const removeFile = (file) => {
    let newFiles = [...files];
    newFiles = newFiles.filter((item) => file.name !== item.name);
    setFiles(newFiles);
  };
  const thumbs = files.map((file) => (
    <div className={styles.thumb} key={file.name}>
      <AiFillDelete
        className={styles.deleteIcon}
        onClick={() => removeFile(file)}
      />
      <div className={styles.thumbInner}>
        <img src={file.preview} layout="fill" className={styles.img} />
      </div>
    </div>
  ));

  //   useEffect(
  //     () => () => {
  //       files.forEach((file) => URL.revokeObjectURL(file.preview));
  //     },
  //     [files]
  //   );
  return (
    <section>
      <div className={styles.fileUploadWrapper}>
        <div {...getRootProps()} className={styles.fileUploadContainer}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className={styles.fileUploadDiv}>
              <IoCloudUploadOutline className={styles.uploadIcon} />
              <p className={styles.dragText}>Drop the files here ...</p>
            </div>
          ) : (
            <div className={styles.fileUploadDiv}>
              <IoCloudUploadOutline className={styles.uploadIcon} />
              <p className={styles.dragText}>
                Drag and drop or click to upload files
              </p>
            </div>
          )}
        </div>
        <Button
          text="Add more"
          className={styles.addFileBtn}
          leftIcon={<FaPlus className={styles.iconSize} />}
          onClick={open}
        />
      </div>
      <div className={styles.thumbsContainer}>
        {files && files?.length > 0 && thumbs}
      </div>
    </section>
  );
}

export default FileUpload;
