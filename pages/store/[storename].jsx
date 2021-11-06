import { Button, Select } from "components";
import Logo, { MobileLogo } from "components/authlayout/logo";
import Image from "next/image";
import { ArrowLeft, StoryTellingPNG } from "utils";
import styles from "../../public/css/product-store.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { currencyOptions } from "components/account-dashboard/partials";
import { ProtectedStoreHeader } from "components/store/storeHeader";
import { useSelector } from "react-redux";
import { ListSingleStoreProduct } from "redux/actions";
import { useEffect } from "react";

const StorePage = () => {
	const {
		query: { storename },
	} = router;

	const router = useRouter();
	const listStoreProduct = ListSingleStoreProduct();

	const { singleStoreDetails, singleStoreProducts } = useSelector(
		(state) => state.store
	);

	useEffect(() => {
		listStoreProduct(storename);
	}, [storename]);

	return (
		<div className={styles.container}>
			<nav className="bg-white hidden lg:flex items-center px-4 lg:px-40">
				<div className="w-1/5 hidden lg:flex justify-start">
					<Link href="/">
						<a className="">
							<Logo />
						</a>
					</Link>
				</div>

				<div className="w-4/5 flex justify-end">
					<div className="w-20 mr-4">
						<Select options={currencyOptions} border="none" />
					</div>

					<div className="mr-4" onClick={() => router.push("/login")}>
						<Button text="Login" />
					</div>

					<div onClick={() => router.push("/signup")}>
						<Button text="Signup" bgColor="blue" />
					</div>
				</div>
			</nav>

			<nav className="bg-white lg:hidden flex items-center px-4">
				<div className="w-30">
					<Link href="/">
						<a className="">
							<MobileLogo />
						</a>
					</Link>
				</div>

				<div className="w-70 flex justify-end items-center mx-auto">
					<div className={styles.select}>
						<Select options={currencyOptions} border="none" />
					</div>

					<div className="mr-2" onClick={() => router.push("/login")}>
						<Button
							text="Login"
							className={`${styles.login} ${styles.loginBtnStyle}`}
						/>
					</div>

					<div onClick={() => router.push("/signup")}>
						<Button text="Signup" bgColor="blue" className={styles.login} />
					</div>
				</div>
			</nav>

			<div className="px-4 lg:px-40">
				<div className="cursor-pointer flex items-center py-10">
					<Image src={ArrowLeft} alt="go back" />{" "}
					<span className="pl-2 font-semibold text-primary-blue">BACK</span>
				</div>

				<div>
					<ProtectedStoreHeader
						publicStore={true}
						publicStoreInfo={singleStoreDetails}
					/>

					<p className="px-2 md:px-6 lg:px-32 mt-4 md:mt-16 text-base-gray-200 text-sm text-center">
						{singleStoreDetails?.bio_data}
					</p>
				</div>

				<div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8 pb-20 mt-6">
					{singleStoreProducts?.map((productDetails) => (
						<ProductCard
							productDetails={productDetails}
							key={productDetails?.id}
						/>
					))}
					{/* <ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard /> */}
				</div>
			</div>
		</div>
	);
};

const ProductCard = ({ productDetails }) => {
	return (
		<div className="bg-white w-full rounded-lg">
			<div>
				<Image
					src={productDetails?.product_cover_picture || StoryTellingPNG}
					width="320"
					height="300"
					className="rounded-t-lg"
				/>
			</div>

			<div className="w-full px-2 md:px-4">
				<p className="pt-2 text-sm md:text-base">
					{productDetails?.product_name}
				</p>
				<div className="flex justify-between items-center pb-4">
					<p className="text-base-gray pt-2 text-sm md:text-base">
						#{productDetails?.minimum_price ?? "0.00"}
					</p>
					<Button text="Buy Now" className={styles.productCardBtn} />
				</div>
			</div>
		</div>
	);
};

export default StorePage;
