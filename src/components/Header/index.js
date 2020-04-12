import React from 'react';
import { Row, Col } from 'antd';
import './index.less'

export default class Header extends React.Component{

    UNSAFE_componentWillMount(){
        this.setState({
            userName:'蔡利斌'
        })
    }

    render(){
        return(
            <div className="header">
                <Row className="header-top">
                    <Col span="24">
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">
                        首页
                    </Col>
                    <Col span="20" className="weather">
                        <span className="date">2018-05-04</span>
                        <span className="weather-detail">晴转多云</span>
                    </Col>
                </Row>
            </div>
        );
    }
}