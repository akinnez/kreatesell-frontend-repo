import SuccessMessage from '..';
import renderer from 'react-test-renderer';

it('renders a snapshot of <SuccessMessage />', () => {
	const message = renderer.create(<SuccessMessage />).toJSON();
	expect(message).toMatchSnapshot();
});
