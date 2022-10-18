import PositionsCard from '../PositionsCard';
import renderer from 'react-test-renderer';

const mockProps = {
	title: 'product designer',
	description: 'mock description',
	roles: ['graphic designer, product designer'],
	path: '/',
};

it('renders a snapshot of <PositionsCard /> with mockprops', () => {
	const card = renderer.create(<PositionsCard {...mockProps} />).toJSON();
	expect(card).toMatchSnapshot();
});
