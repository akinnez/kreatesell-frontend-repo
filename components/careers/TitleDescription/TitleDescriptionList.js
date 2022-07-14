import React from 'react'
import PropTypes from "prop-types";

import styles from "./TitleDescription.module.scss";

const TitleDescriptionList = ({title, subtitle, list}) => {
  return (
    <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        {subtitle && <p className={styles.description}>{subtitle}</p>}
        <div
            dangerouslySetInnerHTML={{
                __html: list,
            }}
        />
    </div>
  )
}

TitleDescriptionList.defaultProps = {
    list: ""
}

TitleDescriptionList.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  list: PropTypes.string,
}


export default TitleDescriptionList