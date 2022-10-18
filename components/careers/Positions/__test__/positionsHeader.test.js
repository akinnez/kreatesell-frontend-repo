import PositionsHeader from '../PositionsHeader';
import renderer from 'react-test-renderer';

const mockProps = {
	title: 'backend developer',
	roles: 'backend',
};

it('renders a snapshot of <PositionsHeader /> with mock props', () => {
	const header = renderer.create(<PositionsHeader {...mockProps} />).toJSON();
	expect(header).toMatchSnapshot();
});
