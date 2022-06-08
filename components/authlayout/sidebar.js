import Link from "next/link";
import { Menu } from "antd";
import style from "./sidebar.module.scss";
import Router, { useRouter } from "next/router";
import { SetProductDefault, SetProductID } from "redux/actions";

import {
  Shop,
  Dashboard,
  Product,
  Wallet,
  Ticket,
  Setting,
  Logout,
  CloseSubMenu,
  AffiliatesIcon,
  KreatorsIcon,
  SalesIcon,
} from "../IconPack";
import { Logout as LogoutAction } from "../../redux/actions/auth.actions";

const menuItemStyle = {
  display: "flex",
  alignItems: "center",
};

const MenuItem = ({ Icon = () => <></>, title, target = "#", ...rest }) => {
  const { pathname } = useRouter();
  const isPath = target.split("/")[3] == pathname.split("/")[3];

  return (
    <Menu.Item
      {...rest}
      style={menuItemStyle}
      icon={
        <Icon className={style.icon} active={isPath} height={20} width={20} />
      }
      title={title}
      className={isPath ? style.active : style.menuitem}
    >
      <Link href={target}>
        <a>{title}</a>
      </Link>
    </Menu.Item>
  );
};

const LogoutItem = ({ Icon = () => <></>, title, target = "#", ...rest }) => {
  const { pathname } = useRouter();
  const logout = LogoutAction();
  const isPath = target.split("/")[3] == pathname.split("/")[3];

  return (
    <Menu.Item
      {...rest}
      style={{ background: "#0072EF", color: "white", ...menuItemStyle }}
      icon={
        <Icon className={style.icon} active={true} height={20} width={20} />
      }
      title={title}
      className={style.active}
      onClick={() => logout()}
    >
      {title}
    </Menu.Item>
  );
};

const Sidebar = () => {
  const { SubMenu } = Menu;
  const router = useRouter();
  const setProductId = SetProductID();
  const setProductDefault = SetProductDefault();
  return (
    <div className={style.sidebar}>
      <Menu mode="inline" theme="light" className={style.menu}>
        <MenuItem
          key={1}
          Icon={Dashboard}
          title="Dashboard"
          target="/account/dashboard"
        />
        <MenuItem
          key={2}
          Icon={Shop}
          title="Store"
          target="/account/kreator/store"
        />
        {/* <MenuItem
					key={3}
					Icon={Product}
					title="Products"
					target="/account/kreator/products"
				/> */}
        <SubMenu
          key="sub1"
          icon={<Product className={style.icon} height={20} width={20} />}
          title="Products"
          className={style.subMenu}
          expandIcon={<CloseSubMenu />}
        >
          <Menu.Item key={35}>
            <Link href="/account/kreator/products/all">
              <a>All Products</a>
            </Link>
          </Menu.Item>
          <Menu.Item key={36}>
            <Link href="/account/kreator/products/create">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setProductId("");
                  setProductDefault();
                  console.log("ytrfghjuytrdfgh");
                  router.push("/account/kreator/products/create");
                }}
              >
                Create Product
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key={37}>
            <Link href="/account/kreator/products/coupons">
              <a>Coupon Codes</a>
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="kreators-menu"
          icon={<KreatorsIcon className={style.icon} height={20} width={20} />}
          title="Kreators"
          className={style.subMenu}
          expandIcon={<CloseSubMenu />}
        >
          <Menu.Item key={41}>
            <Link href="/account/kreator/affiliates-requests">
              <a>Affiliates Requests</a>
            </Link>
          </Menu.Item>
          <Menu.Item key={40}>
            <Link href="/account/kreator/abandoned-carts">
              <a>Abandoned Carts</a>
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="affiliates-menu"
          icon={
            <AffiliatesIcon className={style.icon} height={20} width={20} />
          }
          title="Affiliates"
          className={style.subMenu}
          expandIcon={<CloseSubMenu />}
        >
          <Menu.Item key={38}>
            <Link href="/account/affiliate/market-place">
              <a>Market Place</a>
            </Link>
          </Menu.Item>
          <Menu.Item key={39}>
            <Link href="/account/affiliate/requests">
              <a>Requests</a>
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sales-menu"
          icon={<SalesIcon className={style.icon} height={20} width={20} />}
          title="Sales"
          className={style.subMenu}
          expandIcon={<CloseSubMenu />}
        >
          <Menu.Item key="sales-payouts">
            <Link href="/account/sales/payouts">
              <a>Payouts</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="sales-transactions">
            <Link href="/account/sales/transactions">
              <a>Transactions</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="sales-revenue">
            <Link href="/account/sales/revenue">
              <a>Revenue</a>
            </Link>
          </Menu.Item>
        </SubMenu>
        <MenuItem
          key={5}
          Icon={Ticket}
          title="Integrations"
          target="/account/kreator/integrations"
        />{" "}
        <MenuItem
          key={6}
          Icon={Ticket}
          title="Help"
          target="/account/kreator/help"
        />
        <MenuItem
          key={7}
          Icon={Setting}
          title="Settings"
          target="/account/kreator/settings"
        />
        <LogoutItem key={8} Icon={Logout} title="Logout" />
      </Menu>
      <div className={style.businessBg}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, dolorem
        voluptates, ab debitis enim odio quas repellat minus modi provident
        veniam illo illum eveniet nesciunt atque eaque beatae autem? Quisquam,
        blanditiis rerum nulla excepturi aspernatur aliquam repellendus, modi,
        quasi natus doloremque ab quos incidunt libero est exercitationem.
      </div>
    </div>
  );
};

export default Sidebar;
