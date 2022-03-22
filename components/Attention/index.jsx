import styles from "./attention.module.scss";
import Form from "./Form";

const MainAttention = (props) => {
  return (
    <section className={styles.container}>
      <h1 className={styles.mainHeading}>
        Be the <span className={styles.green}>FIRST</span> <br />
        to Know!
      </h1>
      <h2 className={styles.subHeading}>
        Are you ready to experience a mind-blowing platform made just for you to
        sell all your content and digital products across borders, and massively
        earn without any hassle?
      </h2>
      <p className={styles.stopFlicker}>
        Submit your details to join the wait-list
      </p>
      <Form {...props} />
    </section>
  );
};

export default MainAttention;
