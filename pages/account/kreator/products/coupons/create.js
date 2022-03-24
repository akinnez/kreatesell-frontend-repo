import AuthLayout from "../../../../../components/authlayout";
import styles from "../../../../../public/css/AllProducts.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { CreateCouponForm } from "components/products/CreateCouponForm";
import { ArrowLeft } from "utils";

const CreateCoupon = () => {
	const router = useRouter();
	
	return (
		<AuthLayout>
			<div className={styles.allProduct + " pb-10 mt-5"}>
				<div className="inline-flex justify-start cursor-pointer items-center mb-4">
                    <Image alt="" src={ArrowLeft} />
					<h3 onClick={()=>router.back()} className="uppercase text-blue-600 font-semibold text-base mb-0 ml-3">Back</h3>
				</div>

                <CreateCouponForm />
			</div>
		</AuthLayout>
	);
};

export default CreateCoupon;
