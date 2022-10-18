import renderer from 'react-test-renderer';
import EmailTags from '..';

it('renders a snapshot of <Emailtags />', () => {
	const tag = renderer.create(<EmailTags />).toJSON();
	expect(tag).toMatchSnapshot();
});
