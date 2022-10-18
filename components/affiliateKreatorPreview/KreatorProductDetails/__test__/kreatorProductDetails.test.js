import KreatorProductDetails from '..';
import renderer from 'react-test-renderer';

const mockProps = {
	stock: true,
	productName: 'mock Product',
};

describe('KreatorProductDetails: ', () => {
	it('renders a snapshot of <KreatorProductDetails /> with no props', () => {
		const el = renderer.create(<KreatorProductDetails />).toJSON();
		expect(el).toMatchSnapshot();
	});
	it('renders a snapshot of <KreatorProductDetails /> with mock props and sold at 0', () => {
		const el = renderer
			.create(<KreatorProductDetails {...mockProps} sold={0} />)
			.toJSON();
		expect(el).toMatchSnapshot();
	});
	it('renders a snapshot of <KreatorProductDetails /> with mock props and sold > 0', () => {
		const el = renderer
			.create(<KreatorProductDetails {...mockProps} sold={10} />)
			.toJSON();
		expect(el).toMatchSnapshot();
	});
});
