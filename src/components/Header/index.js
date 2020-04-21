import React from 'react';
import { Row, Col } from 'antd';
import './index.less'
import Util from '../../utils/utils';
import axios from '../../axios';

export default class Header extends React.Component{

    UNSAFE_componentWillMount(){
        this.setState({
            userName:'LBC'
        });
        setInterval(() => {
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000);
        //this.getWeatherAPIData();
    }

    getWeatherAPIData(){
        let city = '德清';
        // axios不封装jsonp直接调用存在跨域
        // axios.get('http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2').then((res) => {
        //     console.log(res);
        // });
        axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res) => {
            console.log(res);
            if(res.status === 'success'){
                let city = res.results[0].currentCity;
                let weatherData = res.results[0].weather_data[0];
                this.setState({
                    city:city,
                    dayPictureUrl:weatherData.dayPictureUrl,
                    weather:weatherData.weather
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    render(){
        const menuType = this.props.menuType;
        return(
            <div className="header">
                <Row className="header-top">
                    {
                        menuType ? 
                            <Col span="6" className="logo">
                                <img src="logo192.png" alt="" />
                                <span>Antd Manage</span>
                            </Col>
                            :
                            ''
                    }
                    <Col span={menuType?18:24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {
                    menuType?'':
                        <Row className="breadcrumb">
                            <Col span="4" className="breadcrumb-title">
                                首页
                            </Col>
                            <Col span="20" className="weather">
                                <span className="date">{this.state.sysTime}</span>
                                <span className="weather-img">
                                    <img src={this.state.dayPictureUrl} alt="" />
                                </span>
                                <span className="weather-detail">
                                    {this.state.city}：{this.state.weather}
                                </span>
                            </Col>
                        </Row>
                }
            </div>
        );
    }
}