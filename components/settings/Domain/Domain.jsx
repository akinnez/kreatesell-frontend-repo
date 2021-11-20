import { useEffect } from "react";
import { useSelector } from "react-redux";
import { GetDomains, SetDomainScreen } from "redux/actions";
import { EmptyDomain, AllDomains, CustomDomain } from "./";

const Domain = () => {
	/**
	 * Domain Screens Config
	 * 1. Empty Screen
	 * 2. All Domains
	 * 3. Create Domain
	 */
	const getDomains = GetDomains();
	const setDomainScreen = SetDomainScreen();

	const { domains, domainScreen, loading } = useSelector(
		(state) => state.domain
	);

	useEffect(() => {
		getDomains();
	}, []);

	useEffect(() => {
		if (domains.length > 0) {
			setDomainScreen(2);
		}
	}, [domains]);

	return (
		<div>
			{domainScreen === 1 && <EmptyDomain />}
			{domainScreen === 2 && <AllDomains />}
			{domainScreen === 3 && <CustomDomain />}
		</div>
	);
};

export default Domain;
