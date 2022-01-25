import renderer from 'react-test-renderer';
import {TabItem} from '../index';

it('renders a snapshot of <TabItem /> with mock props', () => {
    const tabItem = renderer.create(<TabItem>mockChild</TabItem>).toJSON();
    expect(tabItem).toMatchSnapshot()
})