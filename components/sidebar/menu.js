import React,{useState} from 'react'
import Link from 'next/link'
import style from './Menu.module.scss'
import {Dash} from "../IconPack";


const Menu = ({children})=>{
	return(
		
		<div className={style.side_menu_wrapper}>
			<ul className={style.side_menu}>
				{children}
			</ul>
		</div>
	
	)
}

export const MenuItem = ({
	active=false,
	Icon = Category,
	target = "#",
	label,
	isDropDown,
	submenu = [],
	labelStyle,
	iconStyle,
    ...rest
}) => {
	const [open, setOpen] = useState(false);
	const [hover, setHover] = useState(false);

	return (
		<>
			<li className={style.li}
				{...rest}
				onClick={isDropDown ? () => setOpen(!open) : null}
				onMouseOver={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				<Link href={isDropDown ? "#" : target}>
					<a>
						<div
							className={`${style.nav_menu_icon_wrapper} ${active ? style.active : null}`}>
							<div className={`${style.menu_icon} ${active ? style.opaque : null}`}
								style={iconStyle}>
								<Icon
									set="bulk"
									primaryColor={hover || active ? "white" : null}
								/>
							</div>
							<span style={labelStyle}>{label}</span>
							{isDropDown ? (
								<div className={style.menu_drop_minus}>
									<Dash />
								</div>
							) : null}
						</div>
					</a>
				</Link>
			</li>
			{open ? (
				<ul className={style.sub_menu}>
					{submenu?.map(({ url, label }, i) => (
						<li key={i}>
							<Link href={url}>
								<a>{label}</a>
							</Link>
						</li>
					))}
				</ul>
			) : null}

		</>
	);
}

export default Menu