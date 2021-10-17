import React, { useState } from "react";
import AuthLayout from "../../../../components/authlayout";
import { Card, Tabs } from "antd";
import style from "../../../../public/css/Settings.module.scss";
import Currency from "../../../../components/settings/Currency";
import Account from "../../../../components/settings/Account";
import StoreSettings from "components/settings/Store";
import Billing from "components/settings/Billing";
import Domain from "components/settings/Domain/Domain";

const Index = () => {
	const { TabPane } = Tabs;

	return (
		<>
			<AuthLayout mobilePadding={true}>
				<Card bordered={false} className={style.card}>
					<Tabs defaultActiveKey="1" centered size="large">
						<TabPane tab="Currencies" key="1">
							<Currency />
						</TabPane>
						<TabPane tab="Account" key="2">
							<Account />
						</TabPane>
						<TabPane tab="Store" key="3">
							<StoreSettings />
						</TabPane>
						<TabPane tab="Domain" key="4">
							<Domain />
						</TabPane>
						<TabPane tab="Billing" key="5">
							<Billing />
						</TabPane>
						<TabPane tab="Advanced" key="6">
							Content of Tab Pane 3
						</TabPane>
					</Tabs>
				</Card>
			</AuthLayout>
		</>
	);
};

export default Index;
