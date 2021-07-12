import { Meta, Navbar, Footer, SubFooter } from "..";

export const Layout = ({
	children,
	title,
	keywords,
	description,
	subFooter = false,
}) => {
	return (
		<>
			<Meta title={title} keywords={keywords} description={description} />
			<Navbar />
			<main>{children}</main>
			{subFooter && <SubFooter />}
			<Footer />
		</>
	);
};
