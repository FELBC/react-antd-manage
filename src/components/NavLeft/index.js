import React from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import './index.less';

const { SubMenu } = Menu;

function handleClick(e) {
    console.log('click', e);        
}

export default class NavLeft extends React.Component{

    render(){
        return(
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>Antd Manage</h1>
                </div>
                <Menu theme="dark" onClick={handleClick} mode="vertical">
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                            <MailOutlined />
                            <span>Navigation One</span>
                            </span>
                        }
                    >
                        <Menu.Item key="1">Option 1</Menu.Item>
                        <Menu.Item key="2">Option 2</Menu.Item>
                        <Menu.Item key="3">Option 3</Menu.Item>
                        <Menu.Item key="4">Option 4</Menu.Item>
                    </SubMenu>
                </Menu>,
            </div>
        );
    }
}