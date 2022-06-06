import React from 'react'
import PropTypes from "prop-types";
import Image from "next/image"
import {useRouter} from "next/router";

import {Button} from "../../";
import {LeftArrow} from "../../../utils";
import styles from "./CareerNavigationCard.module.scss"

const CareerNavigationCard = ({department, description, role}) => {
  const router = useRouter();
  return (
    <div className={styles.navigationContainer}>
        <div className={styles.left}>
            <div className={styles.top}>
                <div className={styles.arrow} onClick={()=>router.push("/careers")}>
                  <Image src={LeftArrow} alt="" width="40"/>
                </div>
                <h3 className={styles.heading}>{department}</h3>
            </div>
            <div className={styles.bottom}>
                <h2 className={styles.title}>{role}</h2>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
        <div className={styles.right}>
            <Button text="Apply" bgColor="blue" className={styles.actionBtn}/>
        </div>
    </div>
  )
}

CareerNavigationCard.defaultProps = {

}

CareerNavigationCard.propTypes = {
  department: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
}

export default CareerNavigationCard;