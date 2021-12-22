import styles from "../../public/css/legal.module.scss";

export const Item = ({ question, answer, withMargin, isSubHeading }) => {
  return (
    <>
      <>
        {isSubHeading ? (
          <h4 className={styles.qLower}>{question}</h4>
        ) : (
          <h3 className={styles.question}>{question}</h3>
        )}
      </>
      <div className={styles.answer}>
        {answer?.map((item, index) => (
          <p
            className={
              withMargin || item === "" ? styles.answer : styles.packed
            }
            key={index}
          >
            {item}
          </p>
        ))}
      </div>
    </>
  );
};

