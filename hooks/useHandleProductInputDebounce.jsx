import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const useHandleProductInputDebounce = () => {
	const [data, setData] = useState([]);

	const handleDebounce = useDebouncedCallback((e) => {
		const { name, value } = e.target;
		setData((data) => [
			...data,
			{
				currency_name: name,
				currency_value: value,
			},
		]);
	}, 1000);

	return { data, handleDebounce };
};
