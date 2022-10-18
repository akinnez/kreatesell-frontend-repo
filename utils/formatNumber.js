const formatNumber = (number) => {
	const formatter = new Intl.NumberFormat('en-US');
	const numString = number.toString();

	if (numString.includes('.')) {
		const [num, decimals] = numString.split('.');
		return `${formatter.format(+num)}.${decimals}`;
	}

	return formatter.format(number);
};

export default formatNumber;
