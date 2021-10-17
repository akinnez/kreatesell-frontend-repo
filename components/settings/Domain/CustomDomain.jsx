import { Button, Input } from "components";
import styles from "./Domain.module.scss";

export const CustomDomain = () => {
	return (
		<div>
			<div className="productBorder mt-4 bg-white rounded-lg">
				<div className="flex items-center">
					<h3 className="text-black-100 font-medium text-xl lg:text-2xl">
						Custom Store Domain
					</h3>
					<div className="bg-base-green-100 ml-2 p-1 text-base-white-100 font-medium mb-2">
						BUSINESS
					</div>
				</div>

				<div className="text-base-gray-200 text-sm lg:text-base">
					If you own a domain name , you can overwrite the default
					KreateSell.com domain by pointing your preferred domain to your
					KreateSell store. You can also use a subdomain like
					buy.yourdomain.com. Your custom domain should point directly to a
					CNAME of KreateSell <a href="#">Learn More</a>
				</div>

				<div className="pt-3">
					<p className="text-black-100">Domain URL</p>
					<div className="bg-base-white-200 px-4 pt-2 flex items-center w-full lg:w-9/12">
						<div className="pr-6 text-base-gray pb-2">https://</div>
						<div className="w-4/5">
							<Input height="small" placeholder="olumidejohn" />
						</div>
					</div>
					<p className="text-base-gray-200 text-xs py-2">
						Enter your customized domain name here,
					</p>
				</div>

				<div className="w-2/5 md:w-4/12 lg:w-1/6">
					<Button text="Save" bgColor="blue" className={styles.btnStyle} />
				</div>
			</div>

			<div className="productBorder mt-4 bg-white rounded-lg">
				<div className="flex items-center">
					<h3 className="text-black-100 font-medium text-xl lg:text-2xl">
						Custom Store Domain
					</h3>
					<div className="bg-base-green-100 ml-2 p-1 text-base-white-100 font-medium mb-2">
						BUSINESS
					</div>
				</div>

				<div className="text-base-gray-200 text-sm lg:text-base">
					This is your free KreateSell store URL. If you change this subdomain,
					your store URL will be updated to the new set subdomain..
				</div>

				<div className="pt-3">
					<p className="text-black-100">Subdomain</p>
					<div className="bg-base-white-200 px-4 pt-2 flex items-center w-full lg:w-9/12">
						<div className="pr-6 text-base-gray pb-2">https://</div>
						<div className="w-4/5">
							<Input height="small" placeholder="olumidejohn" />
						</div>
					</div>
					<p className="text-base-gray-200 text-xs py-2">
						Enter your customized subdomain name here,
					</p>
				</div>

				<div className="w-2/5 md:w-4/12 lg:w-1/6">
					<Button text="Save" bgColor="blue" className={styles.btnStyle} />
				</div>
			</div>
		</div>
	);
};
