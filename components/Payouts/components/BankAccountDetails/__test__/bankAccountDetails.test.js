import BankAccountDetails from '../index';
import renderer from 'react-test-renderer';

describe('BankAccountDetails: ', () => {
	it('renders a snapshot of <BankAccountDetails /> when bankDetails is false', () => {
		const details = renderer
			.create(<BankAccountDetails bankDetails={false} />)
			.toJSON();
		expect(details).toMatchSnapshot();
	});

	it('renders a snapshot of <BankAccountDetails /> when bankDetails is true', () => {
		const details = renderer
			.create(<BankAccountDetails bankDetails={true} />)
			.toJSON();
		expect(details).toMatchSnapshot();
	});
});
