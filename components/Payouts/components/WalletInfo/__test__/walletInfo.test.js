import WalletInfo from '..';
import renderer from 'react-test-renderer';

const mockProps = {
	children: <h1>mock children</h1>,
	title: 'mock title',
	currency: 'NGN',
	balance: 1000,
};

it('renders a snapshot of <WalletInfo /> with mock props', () => {
	const wallet = renderer.create(<WalletInfo {...mockProps} />).toJSON();
	expect(wallet).toMatchSnapshot();
});
