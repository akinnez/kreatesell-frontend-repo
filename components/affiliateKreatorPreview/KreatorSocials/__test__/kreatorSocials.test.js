import KreatorSocials from '..';
import renderer from 'react-test-renderer';

const mockProps = {
	facebook: 'mockFacebook-url',
	instagram: 'mockInstagram-url',
	linkedIn: 'mockIinstagram - url',
	mobile: 'mockMobile - url',
	twitter: 'mockTwitter-url',
};

it('renders a snapshot of <KreatorSocials />', () => {
	const socials = renderer.create(<KreatorSocials {...mockProps} />).toJSON();
	expect(socials).toMatchSnapshot();
});
