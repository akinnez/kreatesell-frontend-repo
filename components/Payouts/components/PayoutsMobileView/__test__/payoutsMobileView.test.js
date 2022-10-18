import PayoutsMobileView from '..';
import renderer from 'react-test-renderer';

const mockProps = {
	payouts: [
		{
			id: 1,
			transaction_date: '02/11/2021',
			settlement_date: '03/12/2022',
			product_name: 'mock productName',
			customer_name: 'mock customer name',
			customer_email: 'mockEmail@gmail.com',
			currency: 'NGN',
			amount: 1000,
		},
		{
			id: 2,
			transaction_date: '02/12/2021',
			settlement_date: '23/12/2022',
			product_name: 'mock productName 2',
			customer_name: 'mock customer name 2',
			customer_email: 'mock2Email@gmail.com',
			currency: 'USD',
			amount: 4000,
		},
		{
			id: 3,
			transaction_date: '11/11/2021',
			settlement_date: '12/12/2022',
			product_name: 'mock productName3',
			customer_name: 'mock customer name3',
			customer_email: 'mock3Email@gmail.com',
			currency: 'GBP',
			amount: 13000,
		},
	],
};

describe('PayoutsMobileView : ', () => {
	it('renders a snapshot of <PayoutsMobileView /> when no payouts is supplied ', () => {
		const payoutsView = renderer
			.create(<PayoutsMobileView payouts={[]} />)
			.toJSON();
		expect(payoutsView).toMatchSnapshot();
	});
	it('renders a snapshot of <PayoutsMobileView /> when payouts data is supplied ', () => {
		const payoutsView = renderer
			.create(<PayoutsMobileView {...mockProps} />)
			.toJSON();
		expect(payoutsView).toMatchSnapshot();
	});
});
