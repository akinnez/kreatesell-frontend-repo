import Toolbar from '../Toolbar';
import renderer from 'react-test-renderer';

it('renders a snapshot of <Toolbar />', () => {
	const toolBar = renderer.create(<Toolbar />).toJSON();
	expect(toolBar).toMatchSnapshot();
});
