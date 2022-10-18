import PromotionalMaterials from '..';
import renderer from 'react-test-renderer';

it('renders a snapshot of <PromotionalMaterials />', () => {
	const materials = renderer.create(<PromotionalMaterials />).toJSON();
	expect(materials).toMatchSnapshot();
});
