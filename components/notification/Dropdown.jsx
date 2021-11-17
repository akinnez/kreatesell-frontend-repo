import Image from "next/image";
import { tick, _timeToMomentAgo } from "utils";
import { useSelector } from "react-redux";
import { ReadNotifications } from "redux/actions";
import styles from "./dropdown.module.scss";
import { useRouter } from "next/router";

export const NotificationDropdown = () => {
	const router = useRouter();
	const readNotifications = ReadNotifications();

	const { notifications } = useSelector((state) => state.notification);

	const handleReadNotification = (id) => {
		readNotifications(id, () => router.push("/account/kreator/notification"));
	};

	return (
		<div
			className={`absolute w-11/12 left-4 top-24 md:w-1/2 md:left-2/5 lg:w-1/5 lg:top-24 lg:left-3/4 bg-white rounded-lg p-4 ${styles.container}`}
		>
			{notifications?.slice(0, 5)?.map((notification) => (
				<div
					className="flex gap-4 items-start pb-3 cursor-pointer"
					key={notification?.id}
					onClick={() => handleReadNotification(notification?.id)}
				>
					<div className="pt-2">
						<Image src={tick} alt="notification" />
					</div>

					<div>
						<div className="text-base-gray font-medium leading-5">
							{notification?.contents}
						</div>
						<div className="text-base-gray-600 text-xs pt-2">
							{_timeToMomentAgo(notification?.action_time)}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
