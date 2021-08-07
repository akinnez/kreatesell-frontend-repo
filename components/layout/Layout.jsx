import { Meta, Navbar, Footer, SubFooter } from "..";

export const Layout = ({
	children,
	title,
	keywords,
	description,
	subFooter = false,
	defaultMarginTop,
}) => {
	return (
		<>
			<Meta title={title} keywords={keywords} description={description} />
			<Navbar />
			<main className={defaultMarginTop && "mt-10"}>{children}</main>
			{subFooter && <SubFooter />}
			<Footer />
		</>
	);
};
