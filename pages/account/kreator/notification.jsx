import React from "react";
import Image from "next/image";
import AuthLayout from "../../../components/authlayout";
import { ArrowLeft, NotificationPlaceholder, ActiveTick } from "utils";
import styles from "../../../public/css/notification.module.scss";

const InAppNotification = () => {
	return (
		<AuthLayout>
			<div className="flex py-6 items-center">
				<div className="flex">
					<div>
						<Image src={ArrowLeft} alt="go back" />{" "}
					</div>
					<span className="pl-2 font-semibold text-primary-blue">BACK</span>
				</div>

				<div className="mx-auto text-black-100 font-semibold text-lg lg:text-2xl">
					Notifications
				</div>
			</div>
			<div className="text-center -m-4 text-base-gray-200">
				Faucibus justo et in sit at eget faucibus. Faucibus justo et in sit at
				eget faucibus.
			</div>

			<div className="bg-white rounded-lg p-4 pt-6 mt-8 flex gap-4">
				<div className="w-3/5 rounded-lg pb-4 px-6 ">
					<div className="flex gap-4 items-center justify-between bg-base-green-300 rounded-lg p-4">
						<div className="flex justify-start ">
							<div>
								<Image src={ActiveTick} />
							</div>
							<div className="pl-6 flex flex-col">
								<div className=" text-base-gray font-medium">
									You have successfully added a product
								</div>
								<div className="text-xs text-base-gray-600">1m ago</div>
							</div>
						</div>
						<div className="ml-auto ">
							<Image src={ActiveTick} />
						</div>
					</div>
					{/* <div className="divider"></div> */}
					<div className="flex gap-4 items-center justify-between bg-white rounded-lg p-4">
						<div className="flex justify-start ">
							<div>
								<Image src={ActiveTick} />
							</div>
							<div className="pl-6 flex flex-col">
								<div className=" text-base-gray font-medium">
									<span className="text-base-green-200">Akintude Murphy </span>{" "}
									requested to purchase this book
								</div>
								<div className="text-xs text-base-gray-600">1m ago</div>
								<button>View Order</button>
							</div>
						</div>
						<div className="ml-auto ">
							<Image src={ActiveTick} />
						</div>
					</div>
					<div className="divider"></div>
				</div>

				<div
					className={`rounded-lg w-2/5 flex text-center flex-col py-8 ${styles.boxShadow}`}
				>
					<div className="m-auto">
						<Image src={NotificationPlaceholder} />
					</div>
					<h4 className="text-base-gray text-lg pt-6">
						You have some unread notifications
					</h4>
				</div>
			</div>
		</AuthLayout>
	);
};

export default InAppNotification;
