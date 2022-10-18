import {
	AiFillFacebook,
	AiFillInstagram,
	AiFillLinkedin,
	AiFillTwitterSquare,
	AiOutlineWhatsApp,
} from 'react-icons/ai';
import styles from './index.module.scss';

const KreatorSocials = ({facebook, instagram, linkedIn, mobile, twitter}) => (
	<div className={styles.kreator__socials}>
		<span>Connect with me on</span>
		<div>
			{facebook && (
				<a href={facebook} target="_blank" rel="noreferrer">
					<AiFillFacebook />
				</a>
			)}
			{instagram && (
				<a href={instagram} target="_blank" rel="noreferrer">
					<AiFillInstagram />
				</a>
			)}
			{linkedIn && (
				<a href={linkedIn} target="_blank" rel="noreferrer">
					<AiFillLinkedin />
				</a>
			)}
			<a
				href={`https://wa.me/${mobile.replace(/[\+\-\(\) ]/g, '')}`}
				target="_blank"
				rel="noreferrer"
			>
				<AiOutlineWhatsApp />
			</a>
			{twitter && (
				<a href={twitter} target="_blank" rel="noreferrer">
					<AiFillTwitterSquare />
				</a>
			)}
		</div>
	</div>
);

export default KreatorSocials;
