import ProductImages from '..';
import renderer from 'react-test-renderer';

const mockProps = {
	productFiles: [
		{
			file_type: 1,
			filename: 'mock file name',
		},
		{
			file_type: 2,
			filename: 'mock file name 2',
		},
		{
			file_type: 3,
			filename: 'mock file name 3',
		},
		{
			file_type: 4,
			filename: 'mock file name 4',
		},
	],
	productName: 'mock product name',
};
it('renders a snapshot of <ProductImages /> with mock props', () => {
	const productImages = renderer
		.create(<ProductImages {...mockProps} />)
		.toJSON();
	expect(productImages).toMatchSnapshot();
});
