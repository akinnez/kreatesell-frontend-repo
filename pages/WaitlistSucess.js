import React from 'react'
import styles from "../styles/home.module.scss";
import { Navbar } from "components/Nav";
// import SocialIcons from "components/SocialIcons";  
import "antd/dist/antd.css";
import { Footer } from "components";


const WaitlistSucess = () => {
    return (
        <div className={styles.succesContainer}>
            <Navbar />
            <section className={styles.subheadersection}>
                <p className={styles.subheader}>Congratulations!</p>
                <div className={styles.success__msg__container}>
                    <p>You have joined the exclusive early birds’ list!</p>
                    <p>To be the first to know exactly when KreateSell launches and for updates on freebies and more, do these 3 things:</p>
                    <p>1. Join the KreateSell Telegram channel - <a href='https://t.me/UseKreateSell'>https://t.me/UseKreateSell</a></p>
                    <p>2. Join KreateSell’s Facebook Group - <a href='https://www.facebook.com groups/1143014409782318/'>https://www.facebook.com groups/1143014409782318/</a></p>
                    <p>3. Click to save KreateSell’s contact to your address book</p>
                </div>
                <h3 className={styles.cheersText}>Cheers!</h3>
            </section>
            <Footer />
        </div>
    )
}

export default WaitlistSucess



3