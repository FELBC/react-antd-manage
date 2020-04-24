import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';
import MenuConfig from './../../config/menuConfig';
import './index.less';

const { SubMenu } = Menu;

export default class NavLeft extends React.Component{

    state = {
        currentKey:''
    }

    handleClick = (item) => {
        this.setState({
            currentKey:item.key
        });
    }
    

    UNSAFE_componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig);
        let currentKey = window.location.hash.replace(/#|\?.*$/g,'');
        this.setState({
            currentKey,
            menuTreeNode
        })
    }

    // 菜单渲染
    renderMenu = (data) => {
        return data.map((item) => {
            if(item.children){
                 return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                 )
            }
            return (
                <Menu.Item 
                    title={
                        <span>
                            <MailOutlined />
                            <span>item.title</span>
                        </span>
                    } 
                    key={item.key}>
                    <NavLink to={item.key}>{item.title}</NavLink>
                </Menu.Item>
            )
        })
    }

    render(){
        return(
            <div>
                <div className="logo">
                    <img src="/logo192.png" alt="" />
                    <h1>Antd Manage</h1>
                </div>
                <Menu 
                    selectedKeys={this.state.currentKey}
                    theme="dark" 
                    onClick={this.handleClick} 
                    mode="vertical"
                >
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        );
    }
}