import productColumns from '../productsColumns';

it('renders a snapshot of productColumns data', () => {
	expect(productColumns()).toMatchSnapshot();
});
