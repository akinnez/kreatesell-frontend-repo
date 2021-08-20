import React from 'react'
import {Layout,Menu} from 'antd'
import style from './Header.module.scss'
import {PageDot,ProfileIcon,Cog,Bell} from '../IconPack'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const Profile = ()=>{

    const {user} = useSelector(state=>state.utils) || {}

    return(
        <>
        <div className="profile-wrapper">
            <div id="profile-content">
                <h4>{user?.brand_name}</h4>
                <p>Account</p>
            </div>
            <div className="profile"><ProfileIcon /></div>
        </div>
        <style jsx>{`
            .profile-wrapper{
                display:flex;
                align-items:center;
                gap:10px;
            }

            #profile-content h4, #profile-content p{
                margin:0;
                line-height:1.1;
                text-align:right;
            }

            #profile-content h4{
                color:rgba(89, 89, 89, 1);
            }

            #profile-content p{
                color:rgba(140, 140, 140, 1)
            }

            .profile{
                box-shadow: 0px 20px 27px rgba(0, 0, 0, 0.05);
                border-radius: 8px;
                width: 42px;
                height: 42px;
                background-color:#ffffff;
                display:flex;
                align-items:center;
                justify-content:center;
            }
        `}</style>
        </>
    )
}


const Nav = ()=>{
    const {Header} = Layout
    const {SubMenu} = Menu

    const {pathname} = useRouter()

    const pageTitle = pathname?.split("/")
    const title = pageTitle.length >= 4 ? pageTitle[3].toLocaleUpperCase():"Home"
    

    return(
        <>
        <Header className={style.header}>
            <div className={style.nav_left}>
                <PageDot />
                <h2>{title}</h2>
            </div>
            <div className={style.nav_right}>
                <Menu  mode="horizontal" style={{backgroundColor:"transparent"}}>
                <Menu.Item key="setting" icon={<Cog />}/>
                <Menu.Item key="notification" icon={<Bell />}/>
                    <SubMenu key="SubMenu" icon={<Profile />}>
                        <Menu.ItemGroup title="Item 1">
                            <Menu.Item key="setting:1">Option 1</Menu.Item>
                            <Menu.Item key="setting:2">Option 2</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="Item 2">
                            <Menu.Item key="setting:3">Option 3</Menu.Item>
                            <Menu.Item key="setting:4">Option 4</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
      
                </Menu>
            </div>
        </Header>
        
        
        </>
    )
}

export default Nav