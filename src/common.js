/**
 * 作为通用页面结构进行设计的，
 * 订单详情，骑车详情，凡是用第三方页面打开的页面都可以用它进行嵌套，
 * 作为父组件，承载体，承载所有详情页面，分发
*/
import React from 'react';
import { Row, Col } from 'antd';
import Header from './components/Header';
import './style/common.less';

export default class Common extends React.Component{
    render(){
        return(
            <div>
                <Row className="container">
                    <Header menType="second" />
                </Row>
                <Row>
                    {this.props.children}
                </Row>
            </div>
        );
    }
}