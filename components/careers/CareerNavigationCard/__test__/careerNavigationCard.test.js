import CareerNavigationCard from '../CareerNavigationCard';
import renderer from 'react-test-renderer';

const mockProps = {
	department: 'IT',
	description: 'mock description',
	role: 'Back-end developer',
};

it('renders a snapshot of <CareerNavigationCard />', () => {
	const card = renderer
		.create(<CareerNavigationCard {...mockProps} />)
		.toJSON();
	expect(card).toMatchSnapshot();
});
