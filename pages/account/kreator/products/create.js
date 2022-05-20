import { useState } from "react";
import { CreateProductTab, CheckoutProductTab } from "components";
import Tab from "components/tab";
import AuthLayout from "../../../../components/authlayout";
import { Card } from "components/card";
import { useSelector } from "react-redux";
import { SetProductTab } from "redux/actions";
import MembershipTab from "components/products/BusinessSection/MembershipTab";

const CreateProduct = () => {
  const setProductTab = SetProductTab();
  const { productTab } = useSelector(state => state.product);
  const [titles, setTitles] = useState(["Product Design", "Checkout"])
  const [isTabsActive, setIsTabsActive] = useState(true)
  const [selectedTab, setSelectedTab]= useState(1)

  return (
    <AuthLayout>
      {isTabsActive && <Card style={{ padding: "5px 25px 0", marginBottom: "1em" }}>
        <Tab
          titles={titles}
          active={productTab}
          onSelect={e =>{

            setProductTab(e)}}
          key={productTab}
        >
        </Tab>
      </Card>}
        {productTab === 0 && <Card style={{ padding: "60px 48px 60px 48px " }}>
          <CreateProductTab  setSelectedTab={setSelectedTab} titles={titles} setTitles={setTitles}/>
        </Card>
        }
        {productTab === 1 && <Card style={{ padding: "60px 48px 60px 48px " }}>
          <CheckoutProductTab />
      </Card>
        }
        {productTab === 2 && <MembershipTab setIsTabsActive={setIsTabsActive} />}
    </AuthLayout>
  );
};

export default CreateProduct;
