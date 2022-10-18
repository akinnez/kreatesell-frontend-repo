import {ProductsTableData} from '../dummyTableData';

it('renders a snapshot of the productsTable mock data', () => {
	expect(ProductsTableData).toMatchSnapshot();
});
