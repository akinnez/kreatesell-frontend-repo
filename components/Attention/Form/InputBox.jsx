import React from "react";
import styles from "./form.module.scss";

const InputBox = ({ type, placeholder, name, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        className={name === "FirstName" ? styles.first : ""}
      />
    </div>
  );
};

export default InputBox;
