import renderer from 'react-test-renderer';
import EnableFormSwitch from '..';

const mockProps = {
	formik: {
		handleBlur: jest.fn(),
		values: {
			enable: true,
		},
	},
	customHandler: jest.fn(),
};

it('renders a snapshot of <EnableFormSwitch /> with mock props', () => {
	const form = renderer.create(<EnableFormSwitch {...mockProps} />).toJSON();
	expect(form).toMatchSnapshot();
});
