import {CreateProductTab} from '../CreateProduct'
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { initializeStore } from "../../../redux/store";

const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };


it('renders a snapshot of <CreateProductTab />', () => {
    // const createProductTab = renderer.create(
    //     <Provider store={initializeStore(mockState)}>
    //         <CreateProductTab />
    //         </Provider>
    // ).toJSON();
    // expect(createProductTab).toMatchSnapshot()
})