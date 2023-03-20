import React, {useState} from 'react';
import Router from 'next/router';
import Image from 'next/image';

import {useSelector} from 'react-redux';
import {Avatar, Modal} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import Drawer from 'react-bottom-drawer';

import styles from './Index.module.scss';
import {
	EditIcon,
	Facebook,
	ShareIcon,
	ViewAs,
	Twitter,
	Instagram,
	LinkedIn,
} from '../../IconPack';
import Dropdown from '../../dropdown';
import Social from './social-media';
import {
	VerificationIcon,
	LargeVerificationIcon,
	RenderIf,
	MediumVerificationIcon,
} from '../../../utils';
import {Button} from 'components';
import {VerifiedModal, VerifiedDrawer} from 'components/VerifiedComponents';

const CtaButton = ({Icon = () => <></>, label, active}) => {
	return (
		<>
			<div className={`cta ${active ? 'active' : ''}`}>
				<Icon /> {label}
			</div>
			<style jsx>{`
				.cta {
					font-size: 14px;
					display: flex;
					align-items: center;
					gap: 5px;
					padding: 2px 10px;
					border-radius: 8px;
					cursor: pointer;
				}

				.cta.active {
					box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.12),
						0px 2px 4px -1px rgba(0, 0, 0, 0.07);
				}
			`}</style>
		</>
	);
};

export const ProtectedStoreHeader = ({
	storeName = '',
	coverImage = '',
	displayPicture = '',
	brandName = '',
	social = {},
	publicStore = false,
	publicStoreInfo = {},
}) => {
	// console.log('store = ', publicStoreInfo);
	const {kreatorFullName, kycStatus, storePlan} = useSelector(
		(state) => state.product
	);
	const [showModal, setShowModal] = useState(false);
	const [showDrawer, setShowDrawer] = useState(false);
	// function to close drawer for mobile
	const onClose = React.useCallback(() => {
		setShowDrawer(false);
	}, []);

	const showBadge = () => {
		return kycStatus?.kyc_status === 'Approved' && storePlan === 'Business';
	};

	return (
		<>
			<div
				className={
					coverImage || publicStoreInfo?.cover_page
						? styles.bg_wrapper
						: styles.empty_bg_wrapper
				}
				style={
					coverImage || publicStoreInfo?.cover_page
						? {
								backgroundImage: `url(${
									coverImage ||
									publicStoreInfo?.cover_page ||
									'/images/placeholder-1.jpg'
								})`,
						  }
						: {}
				}
			>
				{!(coverImage || publicStoreInfo?.cover_page) && (
					<div className={styles.image}>
						<Image
							src={'/images/placeholder-3.png'}
							height={'100px'}
							width={'100px'}
							alt="coverImage"
						/>
					</div>
				)}
				<div className={styles.inner}>
					<div className={styles.inner_item_profile}>
						<div className={styles.profile_wrapper}>
							{!publicStoreInfo?.display_picture &&
							!displayPicture ? (
								<div className={styles.image_intro_text}>
									<Avatar
										shape="square"
										className={styles.avatar}
										size={70}
										icon={<UserOutlined />}
									/>
								</div>
							) : (
								<>
									<div
										className={styles.image_intro_text}
										style={{
											backgroundImage: `url(${
												displayPicture ||
												publicStoreInfo?.display_picture ||
												'/images/placeholder-2.jpg'
											})`,
										}}
									/>
								</>
							)}
							<div className={styles.txt_wrapper}>
								<h3 className={`flex gap-1`}>
									{kreatorFullName || ''}{' '}
									<RenderIf condition={showBadge()}>
										{/* mobile */}
										<div
											className={`${styles.mobileCheck} flex`}
										>
											<Image
												className={`cursor-pointer`}
												alt="blue verify checkmark"
												src={VerificationIcon}
												onClick={() =>
													setShowDrawer(true)
												}
											/>
										</div>
										{/* Desktop view */}
										<div
											className={`${styles.desktopCheck} flex`}
										>
											<Image
												className={`cursor-pointer`}
												alt="blue verify checkmark"
												src={VerificationIcon}
												onClick={() =>
													setShowModal(true)
												}
											/>
										</div>
									</RenderIf>
								</h3>
								<p>
									https://kreatesell.com/store/
									{storeName || publicStoreInfo?.store_name}
								</p>
							</div>
						</div>

						{!publicStore && (
							<div className={styles.cta_link_wrapper}>
								<div>
									<div
										onClick={() =>
											Router.push(
												'/account/kreator/store/edit'
											)
										}
									>
										<CtaButton
											Icon={EditIcon}
											label="Edit Profile"
											active
										/>
									</div>
									<div>
										<Dropdown
											style={{marginTop: '0'}} //FIX DROPDOWN MARGIN
											Button={
												<CtaButton
													Icon={ShareIcon}
													label="Share Link"
												/>
											}
										>
											<Social
												facebook={social?.facebook}
												twitter={social?.twitter}
												instagram={social?.instagram}
												linkedIn={social?.linkedIn}
											/>
										</Dropdown>
									</div>
									<div
										onClick={() =>
											Router.push(`/store/${storeName}`)
										}
									>
										<CtaButton
											Icon={ViewAs}
											label="Preview"
										/>
									</div>
								</div>
							</div>
						)}

						{publicStore && (
							<div className="hidden md:flex items-center px-10 lg:px-20">
								<div>Connect with me on</div>
								<div className="flex items-center justify-center lg:justify-between gap-4 pl-3">
									<a href={publicStoreInfo?.facebook ?? '#'}>
										<Facebook />
									</a>
									<a href={publicStoreInfo?.instagram ?? '#'}>
										<Instagram />
									</a>
									<a href={publicStoreInfo?.linked_ln ?? '#'}>
										<LinkedIn />
									</a>
									<a href={publicStoreInfo?.twitter ?? '#'}>
										<Twitter />
									</a>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{publicStore && (
				<div className="flex md:hidden items-center px-6 justify-center mt-16">
					<div>Connect with me on</div>
					<div className="flex items-center justify-center lg:justify-between gap-4 pl-3">
						<a href={publicStoreInfo?.facebook ?? '#'}>
							<Facebook />
						</a>
						<a href={publicStoreInfo?.instagram ?? '#'}>
							<Instagram />
						</a>
						<a href={publicStoreInfo?.linked_ln ?? '#'}>
							<LinkedIn />
						</a>
						<a href={publicStoreInfo?.twitter ?? '#'}>
							<Twitter />
						</a>
					</div>
				</div>
			)}
			<VerifiedModal {...{showModal, setShowModal}}>
				<VerifiedModalChildren />
			</VerifiedModal>
			<VerifiedDrawer {...{showDrawer, onClose}}>
				<VerifiedDrawerChildren {...{onClose}} />
			</VerifiedDrawer>
		</>
	);
};

const VerifiedModalChildren = () => {
	return (
		<div className={`${styles.modal} flex flex-col `}>
			<Image alt="" src={LargeVerificationIcon} />
			<h2 className={`text-center mt-3`}>Verified Account</h2>
			<h5 className={``}>
				This store is officially registered as a business on KreateSell.
				They have been verified and you can pay them using Paypal,
				Stripe, Cryptocurrency and other advanced payment options.{' '}
				<span role="link">Learn more...</span>
			</h5>
		</div>
	);
};

const VerifiedDrawerChildren = ({onClose}) => {
	return (
		<div className={`${styles.drawer} flex flex-col py-10`}>
			<Image alt="" src={MediumVerificationIcon} />
			<h2 className={`text-center mt-3`}>Verified Account</h2>
			<h5 className={``}>
				This store is officially registered as a business on KreateSell.
				They have been verified and you can pay them using Paypal,
				Stripe, Cryptocurrency and other advanced payment options.{' '}
				<span role="link">Learn more...</span>
			</h5>
			<div className={`${styles.buttonContainer} mt-5`} onClick={onClose}>
				<Button text="Got It" bgColor="white" />
			</div>
		</div>
	);
};

export const StoreHeader = () => {
	return (
		<>
			<div
				className={styles.bg_wrapper}
				style={{backgroundImage: `url(/images/placeholder-1.jpg)`}}
			>
				<div className={styles.inner}>
					<div className={styles.inner_item_profile}>
						<div className={styles.profile_wrapper}>
							<div
								className={styles.image_intro_text}
								style={{
									backgroundImage: `url(/images/placeholder-2.jpg)`,
								}}
							/>
							<div className={styles.txt_wrapper}>
								<h3></h3>
								<p>https://kreatesell.com/olumidejohn</p>
							</div>
						</div>
						<div className={styles.cta_link_wrapper}>
							<div>
								<div className={styles.firstTwo}>
									<p
										onClick={() =>
											Router.push('/account/store/edit')
										}
									>
										<CtaButton
											Icon={EditIcon}
											label="Edit Profile"
											active
										/>
									</p>
									<p>
										<Dropdown
											Button={
												<CtaButton
													Icon={ShareIcon}
													label="Share Link"
												/>
											}
										/>
									</p>
								</div>
								<p>
									<CtaButton Icon={ViewAs} label="Preview" />
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
