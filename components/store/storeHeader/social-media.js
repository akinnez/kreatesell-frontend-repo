import React from 'react';

import {useSelector} from 'react-redux';
import {Copy, Facebook, Twitter, Instagram, LinkedIn} from '../../IconPack';
import {Divider} from '../../grid';

import {_copyToClipboard} from 'utils';
import Link from 'next/link';

const Social = ({
	facebook = '#',
	twitter = '#',
	instagram = '#',
	linkedIn = '#',
}) => {
	const {store} = useSelector((state) => state.store);
	// console.log('storePage = ', store?.domain_details.domain_details[0].domain_url,)
	return (
		<>
			<div className="social-wrapper">
				<p>Share store link on</p>
				<div className="social-icon-wrapper">
					<a
						href={facebook}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Facebook />
					</a>
					<a
						href={instagram}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Instagram />
					</a>
					<a
						href={linkedIn}
						target="_blank"
						rel="noopener noreferrer"
					>
						<LinkedIn />
					</a>
					<a href={twitter} target="_blank" rel="noopener noreferrer">
						<Twitter />
					</a>
				</div>
				<Divider />
				<div
					className="copy-wrapper"
					onClick={() =>
						_copyToClipboard(
							store?.domain_details.domain_details[0].domain_url,
							'Link copied successfully'
						)
					}
				>
					<Copy /> <span>Copy link</span>
				</div>
			</div>
			<style jsx>{`
				.social-wrapper {
					padding: 20px;
					min-width: 200px;
					text-align: center;
				}

				.social-wrapper p {
					font-size: 14px;
					line-height: 24px;
					color: #595959;
					margin-bottom: 20px;
				}

				.social-icon-wrapper {
					display: flex;
					justify-content: space-between;
					gap: 10px;
				}

				.copy-wrapper {
					display: flex;
					align-items: center;
					gap: 10px;
					justify-content: center;
					font-size: 14px;
					line-height: 24px;
					color: #595959;
					cursor: pointer;
				}
			`}</style>
		</>
	);
};

export default Social;
