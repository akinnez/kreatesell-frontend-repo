import { Layout, Navbar, Button, Select } from "components";
import Logo, { MobileLogo } from "components/authlayout/logo";
import Image from "next/image";
import { ArrowLeft } from "utils";
import styles from "../../public/css/product-store.module.scss";
import Link from "next/link";
import { currencyOptions } from "components/account-dashboard/partials";

const StorePage = () => {
	return (
		<div className={styles.container}>
			{/* Nav */}
			{/* <nav className="bg-white flex items-center justify-between px-40"> */}

			<div className="">
				<Navbar showMenuLink={false} />
			</div>

			{/* <nav className="bg-white flex items-center px-4 lg:px-40">
				<div className="w-1/5 red hidden lg:flex justify-start">
					<Link href="/">
						<a className="">
							<Logo />
						</a>
					</Link>
				</div>

				<div className="w-4/5 red flex justify-end">
					<div className="w-20 red mr-4">
						<Select options={currencyOptions} />
					</div>

					<div className="mr-4">
						<Button text="Login" />
					</div>

					<div>
						<Button text="Signup" bgColor="blue" />
					</div>
				</div>
			</nav> */}

			{/* <nav className="flex justify-between items-center bg-white">
				<div>
					<Link href="/">
						<a className="">
							<MobileLogo />
						</a>
					</Link>
				</div>

				<div className="">
					<Select options={currencyOptions} />
				</div>

				<div className="">
					<Button text="Login" />
				</div>

				<div>
					<Button text="Signup" bgColor="blue" />
				</div>
			</nav> */}
			{/* Nav */}

			<div className="px-40">
				<div className="cursor-pointer flex items-center red">
					<Image src={ArrowLeft} alt="go back" />{" "}
					<span className="pl-2 font-bold text-primary-blue">BACK</span>
				</div>
			</div>
		</div>
	);
};

export default StorePage;
