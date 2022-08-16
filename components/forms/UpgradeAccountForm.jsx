import {useState, useEffect} from "react";
import Image from "next/image";

import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { usePaystackPayment } from "react-paystack";
import { Button } from "components/button/Button";
import {
	ActiveTick,
	InactiveMasterCard,
	InactivePaypal,
	ActiveStripe,
	AdvancedBitcoin,
	AdvancedPaypal,
	AdvancedStripe
} from "utils";
import { RightArrow } from "utils/icons/RightArrow";

import useCurrency from 'hooks/useCurrency';
import Loader from "../loader";
import styles from "../../public/css/UpgradeAccountForm.module.scss"

const paymentMethods = [
	{
		type: "Stripe",
		icon: ActiveStripe,
		value: "stripe"
	},
	{
		type: "Paypal",
		icon: AdvancedPaypal,
		value: "paypal"
	},
	{
		type: "CryptoCurrency",
		icon: AdvancedBitcoin,
		value: "crypto"
	},
]

export const UpgradeAccountForm = () => {
	// const makePlanUpgrade = MakePlanUpgrade();
	const {countriesCurrency,loading} = useCurrency();
	const [activeCurrency, setActiveCurrency] = useState("");
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
	const [activeBtn, setActiveBtn] = useState({
		annually: true,
		monthly: false,
	  });
	  const { annually, monthly } = activeBtn;

	useEffect(() => {
	monthly ? setBusinessPrice("4,999") : setBusinessPrice("4,167");
	monthly
		? setPriceLabel("Billed Monthly")
		: setPriceLabel("Billed Annually");
	monthly ? setSubPriceType("") : setSubPriceType("NGN 9989");
	}, [monthly]);

	useEffect(() => {
	  if(countriesCurrency){
		setActiveCurrency(countriesCurrency[0]);
		setSelectedPaymentMethod(paymentMethods[0].value);
	  }
	}, [countriesCurrency])

	const handleSelect = (currency) => {
		setActiveCurrency(currency);
	}

	const handlePaymentMethod = (method) => {
		setSelectedPaymentMethod(method);
	}

	const handlePayment = (e) => {
		e.preventDefault();
		if(!["USD", "GBP"].includes(activeCurrency.currency)){
			console.log("I got here");
			setSelectedPaymentMethod(()=>"");
		}
		const data = {
			fullname: "string",
			email_address: "string",
			mobile_number: "string",
			datetime: "2022-08-08T14:24:41.326Z",
			total: 0,
			reference_id: "string",
			purchase_details: [
			  {
				product_id: 0,
				quantity: 0,
				amount: 0
			  }
			],
			status: "string",
			card_type: "string",
			last_four: "string",
			currency: "string",
			is_affiliate: true,
			affiliate_product_link: "string"
		  }
		  console.log("activeCurrency: ",activeCurrency, "\nselectedPaymentMethod",selectedPaymentMethod);
		// backend enpoint
		// makePlanUpgrade(data, ()=>console.log("success"), ()=>console.log("error"));
	}
	
	if(loading) return <Loader/>;
	return (
		<>
			<div className="px-0 md:px-5">
				<div className="text-center mb-4">
					<h3 className="text-black-100 font-bold text-xl">
						Upgrade Your Account
					</h3>
					<h4 className="text-black-100 pt-2">BUSINESS</h4>
					<div className="divider"></div>

					<div className="text-base-green-200 font-bold text-2xl">
						<sup className="font-normal text-xs text-black-100">NGN</sup> 4,167
						<sub className="font-normal text-xs text-black-100">/ Month</sub>
					</div>
				</div>

				<form className="px-2 md:px-2 pt-4" onSubmit={handlePayment}>
					<div className="text-primary-blue font-medium text-lg">
						Payment Details
					</div>
					<div className="divider"></div>

					<div>
						<div>Select Currency</div>
						<p className="text-base-gray-200 text-xs pt-2 md:pt-0 md:text-sm">
							Select your preferred currency and get price equivalent
						</p>
					</div>
					<div className="grid gap-4 grid-cols-3 md:grid-cols-6 pt-3">
						{/* TODO: change this to component */}
					{countriesCurrency?.map(({currency,currency_id, flag}, i)=>(
						<span key={currency_id} onClick={()=>handleSelect({currency_id, currency})}>
							<p className={`p-2 flex items-center ${activeCurrency?.currency_id === currency_id ? "activeCard":"card"}`}>
								<div className={styles.checFlag+" mr-2"}>
								<Image src={flag} alt="flag" layout="fill" />
								</div> {currency}
								{activeCurrency?.currency_id === currency_id && <Image src={ActiveTick} alt="active" width="16" height="16" />}
							</p>
						</span>
					))}
					</div>

					<div className="pt-6">
						<div>Payment Method</div>
						<p className="text-base-gray-200 text-xs pt-2 md:pt-0 md:text-sm">
							Select your preferred payment method
						</p>
					</div>
						{/* paystack is NGN and GHS */}

						{/* only show this section if selected currency is "USD" or "GBP" */}
						{["USD", "GBP"].includes(activeCurrency?.currency) && (
							<div className="grid gap-4 grid-cols-3 pt-3">
								{paymentMethods.map(({type, icon, value})=>(
									<div
										key={value}
										onClick={()=>handlePaymentMethod(value)}
										className={`${selectedPaymentMethod === value ? "activeCard":"card"} p-2 flex justify-around items-center`}>
											<Image src={icon} alt={type} />
											{selectedPaymentMethod === value && <Image src={ActiveTick} alt="active" width="16" height="16" />}
									</div>
								))}
							</div>
						)}

					<div className="priceMenu my-6 py-3 px-8">
						<div className="flex justify-between pt-2">
							<p>SubTotal</p>
							<p>NGN 4,167</p>
						</div>
						<div className="divider"> </div>
						<div className="flex justify-between">
							<p>Total</p>
							<p className="text-primary-blue font-medium">NGN 4,167</p>
						</div>
					</div>

					<div className="w-full">
						<Button
							text="Pay NGN 4,167"
							bgColor="blue"
							style={{ width: "100%" }}
							icon={<RightArrow />}
						/>
					</div>
				</form>
			</div>

			<style jsx>{`
				.activeCard {
					border: 1px solid #2dc071;
					border-radius: 0.5rem;
					cursor: pointer;
					color: #8c8c8c;
					font-size: 12px;
				}

				.card {
					border-radius: 0.5rem;
					border: 1px solid #f0f0f0;
					cursor: pointer;
					color: #8c8c8c;
					font-size: 12px;
				}

				.priceMenu {
					box-shadow: 0px 20px 200px rgba(34, 34, 34, 0.1);
					background: #ffffff;
					color: #262626;
				}
			`}</style>
		</>
	);
};
