import AffiliateAvatar from '..';
import renderer from 'react-test-renderer';

const mockProps = {
	image: 'https://www.mockImageUrl',
	affiliateName: 'mockAffiliateName',
};

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

describe('AffiliateAvatar : ', () => {
	it('renders a snapshot of <AffiliateAvatar /> with no props passed', () => {
		const avatar = renderer.create(<AffiliateAvatar />).toJSON();
		expect(avatar).toMatchSnapshot();
	});
	it('renders a snapshot of <AffiliateAvatar /> with mock props passed', () => {
		const avatar = renderer
			.create(<AffiliateAvatar {...mockProps} />)
			.toJSON();
		expect(avatar).toMatchSnapshot();
	});
});
