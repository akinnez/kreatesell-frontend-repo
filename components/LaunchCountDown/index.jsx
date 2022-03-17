import { useState, useRef, useEffect } from "react";
import styles from "./launch.module.scss";

const CountDownTimer = () => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date("April 17, 2022 12:00:00").getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        // stop timer
        clearInterval(interval.current);
      } else {
        // update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    const val = interval.current;
    return () => {
      clearInterval(val);
    };
  }, []);

  return (
    <>
      <section className={styles.timerContainer}>
        <div
          className={
            timerDays === 0 || timerHours === 0
              ? styles.bothGone
              : styles.TwoColumn
          }
        >
          {timerDays !== 0 && (
            <>
              <div className={styles.timerBox}>
                <p className={styles.timerValue}>{timerDays}</p>
                <p className={styles.time}>
                  <small>{timerDays <= 1 ? "day" : "days"}</small>
                </p>
              </div>
              <span className={styles.delimit}>:</span>
            </>
          )}
          {timerHours !== 0 && (
            <>
              <div className={styles.timerBox}>
                <p className={styles.timerValue}>{timerHours}</p>
                <p className={styles.time}>
                  <small>{timerHours <= 1 ? "hour" : "hours"}</small>
                </p>
              </div>
              <span className={`${styles.delimit} ${styles.hide}`}>:</span>
            </>
          )}
        </div>

        <div className={styles.TwoColumn}>
          {timerMinutes !== 0 && (
            <>
              <div className={styles.timerBox}>
                <p className={styles.timerValue}>{timerMinutes}</p>
                <p className={styles.time}>
                  <small>{timerMinutes <= 1 ? "minute" : "minutes"}</small>
                </p>
              </div>
              <span className={styles.delimit}>:</span>
            </>
          )}
          {timerSeconds !== 0 && (
            <div className={styles.timerBox}>
              <p className={styles.timerValue}>{timerSeconds}</p>
              <p className={styles.time}>
                <small>{timerSeconds <= 1 ? "second" : "seconds"}</small>
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CountDownTimer;
