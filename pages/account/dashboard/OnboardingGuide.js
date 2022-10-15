import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../../components/modal/Modal.module.scss";
import { CloseIcon } from "../../../utils";
import {guideDataObject, guideDataObjectMobiles} from '../../../Models/onboardingGuideData'


const OnboardingGuide = ({ visible, setProceedToOnboard, setGuideModalVisible }) => {

    const [index, setIndex] = useState(0)
    const [mindex, setMIndex] = useState(0)


    const changeContents = () => {
        setIndex(index + 1)
    }

    const changeContentsMobile = () => {
        setMIndex(mindex + 1)
    }

    const setPreviousContents = () => {
        setIndex(index - 1)
    }
    const setPreviousMobile = () => {
        setMIndex(mindex - 1)
    }

    const proceedToDashboard = () => {
        setProceedToOnboard(true)
        setGuideModalVisible(true)
    }

    const guideInfoObject = guideDataObject[index]
    const guideInfoObjectMobile = guideDataObjectMobiles[mindex]

    const [_visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(visible);
    }, [visible]);

    return (
        <div
            className={`
			${styles.onboardingGuideModal}
			${!_visible && "hidden"} 
			${_visible && styles.styleDisplay}`
            }
        >
            {/* desktop view */}
            <div className={styles.onboardingTooltip} style={{ left: guideInfoObject.positionLeft, top: guideInfoObject.positionTop }}>
                <div className={styles.toolTipTitleContainer}>
                    <p className={styles.toolTipModalTitle}>{guideInfoObject.modalTitle}</p>
                    <Image src={CloseIcon} className={styles.toolTipCloseIcon} onClick={proceedToDashboard} />
                </div>
                <p className={styles.toolTipText}>{guideInfoObject.modalText}</p>
                <div className={styles.toolTipTitleContainer}>
                    <p className={styles.toolTipBtnText}>{index + 1}/9</p>
                    <div className={styles.toolTipBtnContainer}>
                        <button disabled={index === 0} className={styles.toolTipBtn} onClick={setPreviousContents}>Prev</button>
                        {index !== guideDataObject.length - 1 && (
                            <button disabled={index === guideDataObject.length - 1} className={styles.toolTipNextBtn} onClick={changeContents}>Next</button>
                        )}
                        {index === guideDataObject.length - 1 && (
                            <button className={styles.toolTipNextBtn} onClick={proceedToDashboard}>Next</button>
                        )}
                    </div>
                </div>
            </div>

            {/* mobiles */}
            <div className={styles.onboardingTooltipMobile} style={{ left: guideInfoObjectMobile.positionLeft, top: guideInfoObjectMobile.positionTop }}>
                <div className={styles.toolTipTitleContainer}>
                    <p className={styles.toolTipModalTitle}>{guideInfoObjectMobile.modalTitle}</p>
                    <Image src={CloseIcon} className={styles.toolTipCloseIcon} onClick={proceedToDashboard} />
                </div>
                <p className={styles.toolTipText}>{guideInfoObjectMobile.modalText}</p>
                <div className={styles.toolTipTitleContainer}>
                    <p className={styles.toolTipBtnText}>{mindex + 1}/3</p>
                    <div className={styles.toolTipBtnContainer}>
                        <button disabled={mindex === 0} className={styles.toolTipBtn} onClick={setPreviousMobile}>Prev</button>
                        {mindex !== guideDataObjectMobiles.length - 1 && (
                            <button disabled={mindex === guideInfoObjectMobile.length - 1} className={styles.toolTipNextBtn} onClick={changeContentsMobile}>Next</button>
                        )}
                        {mindex === guideDataObjectMobiles.length - 1 && (
                            <button className={styles.toolTipNextBtn} onClick={proceedToDashboard}>Next</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnboardingGuide;

