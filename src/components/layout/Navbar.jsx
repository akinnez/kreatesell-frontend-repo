import Image from "next/image";
import { KreateSellBrand } from "assets";
import { Button } from "components";

export const Navbar = () => {
	return (
		<nav className="nav-container">
			<div className="img-cont">
				<Image src={KreateSellBrand} alt="kreatesell brand logo" />
			</div>

			<div className="links">
				<ul className="category-links">
					<li>How it works</li>
					<li>Features</li>
					<li>Pricing</li>
					<li>Blog</li>
					<li>FAQs</li>
				</ul>

				<div className="btn-links">
					<div className="login-btn">
						<Button text="Login" />
					</div>
					<div>
						<Button text="Signup" bgColor="blue" />
					</div>
				</div>
			</div>
		</nav>
	);
};
