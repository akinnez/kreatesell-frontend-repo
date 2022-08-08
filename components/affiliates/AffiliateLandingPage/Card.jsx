import React from 'react'

import styles from "./Card.module.scss";

const Card = ({backgroundColor="greenBackground", content}) => {
    const getStyle = () => {
        return styles[backgroundColor];
    }
  return (
    <div className={`${styles.cardContainer} ${getStyle()}`}>
        <p
            className={styles.cardContent}
            dangerouslySetInnerHTML={{
                    __html: content,
            }}
        />
    </div>
  )
}

export default Card