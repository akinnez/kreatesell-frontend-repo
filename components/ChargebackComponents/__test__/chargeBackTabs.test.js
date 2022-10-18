import ChargeBackTabs from '../ChargeBackTabs';
import renderer from 'react-test-renderer';

const mockProps = {
	active: '',
	setActive: jest.fn(),
};

it('renders a snapshot of <ChargeBackTabs />', () => {
	const tabs = renderer.create(<ChargeBackTabs {...mockProps} />).toJSON();
	expect(tabs).toMatchSnapshot();
});
