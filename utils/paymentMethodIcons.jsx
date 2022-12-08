import React from 'react';
import Image from 'next/image';

import {
	ActiveStripe,
	AdvancedBitcoin,
	AdvancedPaypal,
	FlutterwaveLogo,
	PaystackLogo,
} from 'utils';

const paymentMethod = {
	paystack: <Image src={PaystackLogo} alt="paystack logo" />,
	crypto: <Image src={AdvancedBitcoin} alt="crypto logo" />,
	flutterwave: <Image src={FlutterwaveLogo} alt="flutterwave logo" />,
	stripe: <Image src={ActiveStripe} alt="stripe logo" />,
	paypal: <Image src={AdvancedPaypal} alt="paypal logo" />,
};
const PaymentMethodIcons = (payment_method) => {
	return (
		<div style={{textAlign: 'center'}}>
			{paymentMethod[payment_method] || '-'}
		</div>
	);
};

export default PaymentMethodIcons;
