import React from "react";
import Image from "next/image";
import AuthLayout from "../../../components/authlayout";
import { ArrowLeft, NotificationPlaceholder, ActiveTick } from "utils";

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

			<div className="bg-white rounded-lg p-4 mt-8 flex gap-4">
				<div className="w-70 rounded-lg p-4">
					<div className="flex gap-4 items-center">
						<Image src={ActiveTick} />
						<p>You have successfully added a product</p>
						<div className="flex justify-end">
							<Image src={ActiveTick} />
						</div>
					</div>
				</div>
				<div className="rounded-lg w-30">
					<Image src={NotificationPlaceholder} />
				</div>
			</div>
		</AuthLayout>
	);
};

export default InAppNotification;
