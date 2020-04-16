// 异步请求拦截,返回mock数据,解决easy-mock服务器老是挂掉问题
// 真实接口有了之后可以删除该拦截获取接口数据
import './../../mock/mockTest';

import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;

export default class City extends React.Component{

    state={
        list:[],
        isShowOpenCity:false,
        mockDataTest:[]
    }
    params={
        page:1
    }
    componentDidMount(){
        this.requestList();
    }

    // 默认请求我们的接口数据
    requestList = () => {
        axios.ajax({
            url:'/getdata1',
            data:{
                params:{
                    page:this.params.page
                },
                // isShowLoading:false
            }
        }).then((res)=>{
            console.log(res);
            let mockDataTest = JSON.stringify(res.result.list);
            this.setState({
                mockDataTest
            });
        })
    }

    // 开通城市
    handleOpenCity = () => {
        this.setState({
            isShowOpenCity:true
        })
    }

    // 城市开通提交
    handleSubmit = () => {

    }

    render(){
        return(
            <div>
                {this.state.mockDataTest}
            </div>
        );
    }
}