import React from "react";
import { CreateProductTab, CheckoutProductTab } from "components";
import Tab, { TabItem } from "components/tab";
import AuthLayout from "../../../../components/authlayout";
import { Card } from "components/card";
import { useSelector } from "react-redux";
import { SetProductTab } from "redux/actions";

const CreateProduct = () => {
	const setProductTab = SetProductTab();
	const { productTab } = useSelector((state) => state.product);

	return (
		<AuthLayout>
			<Card style={{ padding: "25px" }}>
				<Tab
					titles={["Product Design", "Checkout", "Design and Content"]}
					active={productTab}
					onSelect={(e) => setProductTab(e)}
				>
					<TabItem>
						<CreateProductTab />
					</TabItem>

					<TabItem>
						<CheckoutProductTab />
					</TabItem>

					<TabItem>
						<h3>hello Design and Content</h3>
					</TabItem>
				</Tab>
			</Card>
		</AuthLayout>
	);
};

export default CreateProduct;
