import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import style from "./Header.module.scss";
import { PageDot, ProfileIcon, Cog, Bell } from "../IconPack";
import Router, { useRouter } from "next/router";
import { Logout, GetNotifications } from "../../redux/actions";
import { useSelector } from "react-redux";
import { _getMyStoreDetails } from "utils";
import { NotificationDropdown } from "components/notification/Dropdown";

const Profile = ({ name }) => {
	return (
		<>
			<div className="profile-wrapper">
				<div id="profile-content">
					<h4>{name || "Undefined"}</h4>
					<p>Account</p>
				</div>
				<div className="profile">
					<ProfileIcon />
				</div>
			</div>
			<style jsx>{`
				.profile-wrapper {
					display: flex;
					align-items: center;
					gap: 10px;
				}

				#profile-content h4,
				#profile-content p {
					margin: 0;
					line-height: 1.1;
					text-align: right;
				}

				#profile-content h4 {
					color: rgba(89, 89, 89, 1);
				}

				#profile-content p {
					color: rgba(140, 140, 140, 1);
				}

				.profile {
					box-shadow: 0px 20px 27px rgba(0, 0, 0, 0.05);
					border-radius: 8px;
					width: 42px;
					height: 42px;
					background-color: #ffffff;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			`}</style>
		</>
	);
};

const Nav = () => {
	const { Header } = Layout;
	const { SubMenu } = Menu;

	const [info, setInfo] = useState({});
	const [showNotification, setShowNotification] = useState(false);

	const { pathname } = useRouter();
	const store = _getMyStoreDetails();

	const { notifications } = useSelector((state) => state.notification);

	const unreadNotification = notifications?.filter((item) => !item?.is_read);

	const logout = Logout();
	const getNotifications = GetNotifications();

	const pageTitle = pathname?.split("/");
	const title =
		pageTitle.length >= 4 ? pageTitle[3].toLocaleUpperCase() : "Home";

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		setInfo(user);
		getNotifications(store?.user_id);
	}, []);

	return (
		<>
			<Header className={style.header}>
				<div className={style.nav_left}>
					<PageDot />
					<h2>{title}</h2>
				</div>
				<div className={style.nav_right}>
					<Menu mode="horizontal" style={{ backgroundColor: "transparent" }}>
						<Menu.Item key="setting" icon={<Cog />} />
						<Menu.Item
							key="notification"
							icon={<Bell />}
							onClick={() => setShowNotification((value) => !value)}
						>
							{unreadNotification?.length > 0 && (
								<div className="red bg-red-500 absolute rounded-full h-5 w-5 text-white text-xs flex items-center justify-center -top-2 right-3">
									{unreadNotification.length}
								</div>
							)}
						</Menu.Item>
						<SubMenu key="SubMenu" icon={<Profile name={info?.full_name} />}>
							<Menu.Item
								key="prof-1"
								onClick={() => Router.push("/account/kreator/store/edit")}
							>
								Profile
							</Menu.Item>
							<Menu.Item key="prof-2" onClick={() => logout()}>
								Logout
							</Menu.Item>
						</SubMenu>
					</Menu>
				</div>
			</Header>
			{showNotification && <NotificationDropdown />}
		</>
	);
};

export default Nav;
