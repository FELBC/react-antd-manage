import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'; // 通过connect连接器将redux和react组件连接起来
import { switchMenu } from './../../redux/action';
import MenuConfig from './../../config/menuConfig';
import './index.less';

const { SubMenu } = Menu;

class NavLeft extends React.Component{

    state = {
        currentKey:''
    }

    handleClick = ({item, key}) => {
        /**
         * dispatch派发action，将当前点击菜单传递进switchMenu action,
         * swtichMenu action接收到当前传递进来的菜单，返回对应action type和menuName组成的对象,
         * 这个对象会触发reducer，reducer接收state和action，
         * 通过判断action type，进行逻辑操作更改返回新的state，从而实现修改store数据源，
         * 数据源获取监听器触发，最后把状态传递到页面，从而更新视图
        */
        const { dispatch } = this.props;
        dispatch(switchMenu(item.props.title));

        this.setState({
            currentKey:key
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
                    title={item.title} 
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

export default connect()(NavLeft);