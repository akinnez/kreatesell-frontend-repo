import Editor from '..';
import renderer from 'react-test-renderer';

const mockProp = {
	formik: {
		values: {
			email_content: '',
		},
		setFieldTouched: jest.fn(),
		setFieldValue: jest.fn(),
	},
};

it('renders a snapshot of <Editor />', () => {
	const editor = renderer.create(<Editor {...mockProp} />).toJSON();
	expect(editor).toMatchSnapshot();
});
