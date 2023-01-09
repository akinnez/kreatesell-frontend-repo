import React from 'react';
import Image from 'next/image';
import {useRouter} from 'next/router';

import {useSelector} from 'react-redux';
import {useCountdown} from 'hooks/useCountdownTimer';

import style from './Timer.module.scss';
import {RenderIf} from 'utils';
import {BusinessPlanBox} from '../../utils/assets';

const Timer = () => {
	const router = useRouter();
	const {
		store: {plan_expiry_date, user},
	} = useSelector((state) => state.store);
	const [days, hours, minutes, seconds] = useCountdown(plan_expiry_date);

	return (
		<RenderIf condition={true}>
			<section className={style.businessBg}>
				<div className={style.iconBox}>
					<p className={style.text}>
						{days + hours + minutes + seconds <= 0 &&
						plan_expiry_date ? (
							<>
								Your BUSINESS PLAN has expired. You will
								automatically be put on the basic plan. Click
								button to renew now.
								<div className={style.btnCont}>
									<button
										className={style.btn}
										onClick={() =>
											router.push(
												'/account/kreator/settings?activeTab=billing'
											)
										}
									>
										Renew Business Plan
									</button>
								</div>
							</>
						) : days + hours + minutes + seconds > 0 ? (
							<div className={style.upgradeIndicationContainer}>
								<div className={style.currentPlan}>
									<h3 className={style.title}>
										Current Plan:
									</h3>
									<div className={style.business}>
										<h2>BUSINESS</h2>
										<div>ACTIVE</div>
									</div>
								</div>
								{/* TODO: this will be changed when we go live */}
								{days <= 30 && (
									<>
										<h3 className={style.title}>
											Time Left
										</h3>
										<div className={style.timerContainer}>
											<div className={style.timer}>
												<h3>{days}</h3>
												<p style={{color: '#fff'}}>
													Days
												</p>
											</div>
											<span className={style.semicolon}>
												:
											</span>
											<div className={style.timer}>
												<h3>{hours}</h3>
												<p style={{color: '#fff'}}>
													Hours
												</p>
											</div>
											<span className={style.semicolon}>
												:
											</span>
											<div className={style.timer}>
												<h3>{minutes}</h3>
												<p style={{color: '#fff'}}>
													Mins
												</p>
											</div>
											<span className={style.semicolon}>
												:
											</span>
											<div className={style.timer}>
												<h3>{seconds}</h3>
												<p style={{color: '#fff'}}>
													Secs
												</p>
											</div>
										</div>
										<div className={style.btnCont}>
											<button
												className={style.btn}
												onClick={() =>
													router.push(
														'/account/kreator/settings?activeTab=billing'
													)
												}
											>
												Renew Business Plan
											</button>
										</div>
									</>
								)}
							</div>
						) : days < 0 && plan_expiry_date ? (
							<>
								<div className={style.icon}>
									<Image
										src={BusinessPlanBox}
										alt="business plan icon"
									/>
									<p className={style.expiredDescription}>
										Your <span>BUSINESS PLAN</span> has
										expired. You will automatically be put
										on the basic plan. Click button to renew
										now.
									</p>
								</div>
								<div className={style.btnCont}>
									<button
										className={style.btn}
										onClick={() =>
											router.push(
												'/account/kreator/settings?activeTab=billing'
											)
										}
									>
										Renew Business Plan
									</button>
								</div>
							</>
						) : (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<span
									style={{
										backgroundColor: 'white',
										width: 'fit-content',
										padding: '.25rem',
										borderRadius: '8px',
										marginBlockEnd: '0.5rem',
									}}
								>
									<Image
										src={BusinessPlanBox}
										alt="business plan icon"
									/>
								</span>
								Enjoy the power of premium options
								<div className={style.btnCont}>
									<button
										className={style.btn}
										onClick={() =>
											router.push(
												'/account/kreator/settings?activeTab=billing'
											)
										}
									>
										GO BUSINESS PLAN
									</button>
								</div>
							</div>
						)}
						{/* Enjoy the power of
            <br /> premium options */}
					</p>
				</div>
			</section>
		</RenderIf>
	);
};

export default Timer;
