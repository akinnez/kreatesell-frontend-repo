import React from 'react'
import PropTypes from "prop-types";

import styles from "./TitleDescription.module.scss";

const TitleDescriptionList = ({title, subtitle, list, isNumberList}) => {
  return (
    <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        {subtitle && <p className={styles.description}>{subtitle}</p>}
        {Array.isArray(list) && 
        <>
          <ul className={styles.listWrapper}>
              {list.map((itm,idx)=>(
                  <li className={styles.list} key={idx}>
                      <span>{!!isNumberList ? <>{idx+1}. </> : <>&#8226;</>}  </span>
                      <p className={styles.itm}>{itm}</p> 
                      
                  </li>
              ))}
          </ul>

        </>
        }
    </div>
  )
}

TitleDescriptionList.defaultProps = {
    list: []
}

TitleDescriptionList.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string),
  isNumberList: PropTypes.bool
}


export default TitleDescriptionList