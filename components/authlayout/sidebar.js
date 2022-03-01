import Link from "next/link";
import { Menu } from "antd";
import style from "./sidebar.module.scss";
import Router, { useRouter } from "next/router";
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
  return (
    <>
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
              <a>Create Product</a>
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
              <a>Find Products</a>
            </Link>
          </Menu.Item>
          <Menu.Item key={39}>
            <Link href="/account/affiliate/requests">
              <a>Requests</a>
            </Link>
          </Menu.Item>
        </SubMenu>
        <MenuItem
          key={4}
          Icon={Wallet}
          title="Payouts"
          target="/account/kreator/payouts"
        />
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
    </>
  );
};

export default Sidebar;
