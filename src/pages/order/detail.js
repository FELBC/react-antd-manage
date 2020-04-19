import React from 'react';
import {
    Card
} from 'antd';
import axios from './../../axios';
import './detail.less';
import './../../mock/index';
import API from './../../api/index';

export default class Order extends React.Component{

    state = {}

    componentDidMount(){
        // match为空对象，不清楚原因，只能通过location来截取orderId
        let path = this.props.location.pathname;
        let orderId = path.substring(path.lastIndexOf("/")+1,path.length);
        this.getDetailInfo(orderId);
    }

    // 获取订单详情
    getDetailInfo = (orderId) => {
        axios.ajax({
            url:API.orderDetailApi,
            data:{
                params:{
                    orderId:orderId
                }
            }
        }).then((res)=>{
            if(res.code === 0){
                let orderInfo = res.result;
                this.setState({
                    orderInfo:orderInfo
                });
                console.log(this.state.orderInfo.status);
            }
        });
    }

    render(){
        const info = this.state.orderInfo || {};
        return(
            <div style={{width:'100%'}}>
                <Card>
                    <div id="orderDetailMap"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode === 1 ? '服务区':'停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行驶起点</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{info.distance/1000}公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        );
    }
}