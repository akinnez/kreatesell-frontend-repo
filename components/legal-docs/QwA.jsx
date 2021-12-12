// import PropTypes from "prop-types";
import { Item } from "./Item";

export const QwA = ({ data }) => {
	return (
		<>
			{data.map((item, index) => (
				<Item key={index} {...item} />
			))}
		</>
	);
};

// QwA.propTypes = {
// 	data: PropTypes.array,
// };
