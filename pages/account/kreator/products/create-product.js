import React, { useState } from "react";
import {
	Input,
	Button,
	CreateProductTab,
	CheckoutProductTab,
} from "components";
import Tab, { TabItem } from "components/tab";
import AuthLayout from "../../../../components/authlayout";
import { Card } from "components/card";

const CreateProduct = () => {
	const [tab, setTab] = useState(0);

	return (
		<AuthLayout>
			<Card>
				<Tab
					titles={["Product Design", "Checkout", "Design and Content"]}
					active={tab}
					onSelect={(e) => setTab(e)}
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
