import { useEffect } from "react";
import Image from "next/image";
import AuthLayout from "../../../components/authlayout";
import {
	ArrowLeft,
	NotificationPlaceholder,
	ActiveTick,
	_getMyStoreDetails,
	_timeToMomentAgo,
	ProductNotificationImage,
	tick,
	UserImage,
} from "utils";
import styles from "../../../public/css/notification.module.scss";
import { GetNotifications, ReadNotifications } from "redux/actions";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const InAppNotification = () => {
	const router = useRouter();
	const store = _getMyStoreDetails();
	const getNotifications = GetNotifications();
	const readNotifications = ReadNotifications();

	const { notifications } = useSelector((state) => state.notification);

	const handleReadNotification = (id) => {
		readNotifications(id, () => {
			getNotifications(store?.user_id);
		});
	};

	const unreadNotification = notifications?.some((item) => item?.is_read);

	useEffect(() => {
		getNotifications(store?.user_id);
	}, []);

	return (
		<AuthLayout>
			<div className="flex py-2 lg:py-6 items-center">
				<div className="flex cursor-pointer" onClick={() => router.back()}>
					<div>
						<Image src={ArrowLeft} alt="go back" />{" "}
					</div>
					<span className="pl-2 font-semibold text-primary-blue">BACK</span>
				</div>

				<div className="hidden lg:block mx-auto text-black-100 font-semibold text-lg lg:text-2xl">
					Notifications
				</div>
			</div>

			<div className="lg:hidden block mx-auto text-black-100 font-semibold text-lg lg:text-2xl text-center leading-6 pb-6">
				Notifications
			</div>

			<div className="text-center text-xs px-6 lg:px-0 md:text-sm lg:text-base lg:-m-4 text-base-gray-200">
				Faucibus justo et in sit at eget faucibus. Faucibus justo et in sit at
				eget faucibus.
			</div>

			<div className="lg:bg-white rounded-lg p-0 lg:p-4 pt-6 mt-8 flex items-start gap-4">
				<div className="w-full lg:w-3/5 rounded-lg pb-4 px-1 lg:px-6">
					{notifications?.map((notification) => (
						<SingleNotification
							key={notification?.id}
							notification={notification}
							handleReadNotification={() =>
								handleReadNotification(notification?.id)
							}
						/>
					))}
				</div>

				<div
					className={`rounded-lg w-2/5 hidden lg:flex text-center flex-col px-4 py-20 ${styles.boxShadow}`}
				>
					<div className="m-auto">
						<Image src={NotificationPlaceholder} />
					</div>
					{unreadNotification && (
						<h4 className="text-base-gray text-lg pt-6">
							You have some unread notifications
						</h4>
					)}
				</div>
			</div>
		</AuthLayout>
	);
};

const SingleNotification = ({ notification, handleReadNotification }) => {
	return (
		<div
			className={`flex gap-2 items-center justify-between rounded-lg py-2 px-3 border-b border-solid border-base-white-300 cursor-pointer ${
				notification?.is_read ? `bg-white` : `bg-base-green-300`
			}`}
			onClick={() => handleReadNotification()}
		>
			<div className="flex justify-start ">
				<div>
					<Image src={tick} />
				</div>
				<div className="pl-6 flex flex-col">
					<div className=" text-base-gray font-medium">
						{notification?.contents}
					</div>
					<div className="text-xs text-base-gray-600">
						{_timeToMomentAgo(notification?.action_time)}
					</div>
				</div>
			</div>
			<div className="mb-auto lg:ml-auto">
				<Image src={ProductNotificationImage} />
			</div>
		</div>
	);
};

export default InAppNotification;
