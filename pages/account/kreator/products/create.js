import { useEffect, useState } from "react";
import { CreateProductTab, CheckoutProductTab } from "components";
import Tab, { TabItem } from "components/tab";
import AuthLayout from "../../../../components/authlayout";
import { Card } from "components/card";
import { useSelector } from "react-redux";
import { SetProductTab } from "redux/actions";

const CreateProduct = () => {
  const setProductTab = SetProductTab();
  const { productTab } = useSelector(state => state.product);
  const [titles, setTitles] = useState(["Product Design", "Checkout"])
  return (
    <AuthLayout>
      <Card style={{ padding: "5px 25px 0", marginBottom: "1em" }}>
        <Tab
          titles={titles}
          active={productTab}
          onSelect={e => setProductTab(e)}
          key={productTab}
        >
        </Tab>
      </Card>
      <Card style={{ padding: "25px" }}>
        {productTab === 0 && <CreateProductTab titles={titles} setTitles={setTitles}/>}
        {productTab === 1 && <CheckoutProductTab />}
        {/* {productTab === 2 && <h3>hello Design and Content</h3>} */}
      </Card>

    </AuthLayout>
  );
};

export default CreateProduct;

// import { useState } from "react";
// import { Tabs, Card } from "antd";
// import CreateProductTab from "components/products/components/CreateProductTab";
// import CheckoutProductTab from "components/products/components/CheckoutProductTab";
// import AuthLayout from "../../../../components/authlayout";

// const { TabPane } = Tabs;

// const CreateProduct = () => {
//   const [activeTab, setActiveTab] = useState("1");
//   const [product, setProduct] = useState({});

//   return (
//     <AuthLayout>
//       <Card style={{ padding: "25px", borderRadius: "8px" }}>
//         <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
//           <TabPane tab="Product Design" key="1">
//             <CreateProductTab
//               activeTab={activeTab}
//               setActiveTab={setActiveTab}
//             />
//           </TabPane>
//           <TabPane tab="Checkout" key="2" disabled={activeTab < 2}>
//             <CheckoutProductTab />
//           </TabPane>
//           <TabPane tab="Design and Content" key="3" disabled={activeTab < 3}>
//             <h3>hello Design and Content</h3>
//           </TabPane>
//         </Tabs>
//       </Card>
//     </AuthLayout>
//   );
// };

// export default CreateProduct;
