import React from 'react'
import Image from 'next/image'

import { useSelector } from 'react-redux'
import { useCountdown } from 'hooks/useCountdownTimer'

import style from './Timer.module.scss'
const Timer = () => {
  const {
    store: { plan_expiry_date },
  } = useSelector((state) => state.store)
  const [days, hours, minutes, seconds] = useCountdown(plan_expiry_date)
  return (
    <>
      <section className={style.businessBg}>
        <div className={style.iconBox}>
          <p className={style.text}>
            {days + hours + minutes + seconds <= 0 ? (
              <>
                Your BUSINESS PLAN has expired. You will automatically be put on
                the basic plan. Click button to renew now.
              </>
            ) : days > 0 ? (
              <div className={style.upgradeIndicationContainer}>
                <div className={style.currentPlan}>
                  <h3 className={style.title}>Current Plan:</h3>
                  <div className={style.business}>
                    <h2>BUSINESS</h2>
                    <div>ACTIVE</div>
                  </div>
                </div>
                {days <= 100 && (
                  <>
                    <h3 className={style.title}>Time Left</h3>
                    <div className={style.timerContainer}>
                      <div className={style.timer}>
                        <h3>{days}</h3>
                        <p style={{ color: '#fff' }}>Days</p>
                      </div>
                      <div className={style.timer}>
                        <h3>{hours}</h3>
                        <p style={{ color: '#fff' }}>Hours</p>
                      </div>
                      <div className={style.timer}>
                        <h3>{minutes}</h3>
                        <p style={{ color: '#fff' }}>Mins</p>
                      </div>
                      <div className={style.timer}>
                        <h3>{seconds}</h3>
                        <p style={{ color: '#fff' }}>Secs</p>
                      </div>
                    </div>
                    <div className={style.btnCont}>
                      <button className={style.btn}>Renew Business Plan</button>
                    </div>
                  </>
                )}
              </div>
            ) : days < 0 && plan_expiry_date ? (
              <>
                <div className={style.icon}>
                  <Image src={BusinessPlanBox} alt="business plan icon" />
                  <p className={style.expiredDescription}>
                    Your <span>BUSINESS PLAN</span> has expired. You will
                    automatically be put on the basic plan. Click button to
                    renew now.
                  </p>
                </div>
                <div className={style.btnCont}>
                  <button className={style.btn}>Renew Business Plan</button>
                </div>
              </>
            ) : (
              <></>
            )}
            {/* Enjoy the power of
            <br /> premium options */}
          </p>
        </div>
      </section>
    </>
  )
}

export default Timer