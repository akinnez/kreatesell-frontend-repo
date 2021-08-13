import React from 'react'
import style from './ProplanCard.module.scss'
import Link from 'next/link'
import {
	CreditCard,
	Diamond,
} from "../IconPack";

const ProPlanCard = ()=>{

    return(
        <>
        <li style={{ marginTop: "50px" }}>
        <div className={style.card_bg}>
            <div className={style.overlay}>
                <Diamond />
                <p>
                    Update to
                    <br /> Premium Plan
                </p>
                <Link href="#">
                    <a className={style.btn_link}>GO PRO PLAN</a>
                </Link>
            </div>
        </div>
        </li>
        </>
    )
}

export default ProPlanCard