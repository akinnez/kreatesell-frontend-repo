import {ChargeBackCard} from '../ChargeBackCard';
import renderer from 'react-test-renderer';

const mockProps = {
	pending: 'mockText',
	won: 0,
	lost: 0,
	declined: 0,
};

it('renders a snapshot of <ChargeBackCard /> with mock props', () => {
	const card = renderer.create(<ChargeBackCard {...mockProps} />).toJSON();
	expect(card).toMatchSnapshot();
});
