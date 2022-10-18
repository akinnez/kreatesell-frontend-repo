import Dashboard from '../KreatorDashboard';
import renderer from 'react-test-renderer';
import * as nextRouter from 'next/router';

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
	route: '/',
	pathname: '/mock/pathname',
}));

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

it('renders a snapshot of <KreatorDashboard />', () => {
	const dashboard = renderer.create(<Dashboard />).toJSON();
	expect(dashboard).toMatchSnapshot();
});
