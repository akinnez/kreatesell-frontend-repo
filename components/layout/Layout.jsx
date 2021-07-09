import { Meta, Navbar, Footer } from "..";

export const Layout = ({ children, title, keywords, description }) => {
	return (
		<>
			<Meta title={title} keywords={keywords} description={description} />
			<Navbar />
			<main>{children}</main>
			<Footer />
		</>
	);
};
