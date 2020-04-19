import React from 'react';
import {
    Card,
    Button,
    message
} from 'antd';
import axios from './../../axios';
import Utils from './../../utils/utils';
import BaseForm from './../../components/BaseForm';
import API from './../../api';
import {
    State,
    Interest
} from './../../config/dictionaryConfig';

export default class User extends React.Component{

    params = {
        page:1
    }

    state = {}

    formList = [
        {
            type:'INPUT',
            name:'user_name',
            label:'用户名',
            placeholder:'请输入用户名称',
            required:true,
            width:220
        },
        {
            type:'INPUT',
            name:'user_mobile',
            label:'用户手机号',
            placeholder:'请输入用户手机号',
            required:true,
            width:255
        },
        {
            type:'DATE',
            name:'user_date',
            label:'请选择入职日期',
            placeholder:'请输入日期',
            required:true,
            width:255,
            format:'YYYY-MM-DD'
        }
    ]

    componentDidMount(){
        this.requestList();
    }

    // 查询
    handleFilter = (params) => {
        this.params = params;
        if(this.params.user_name === undefined){
            message.warning('请输入用户名');
        }else if(this.params.user_mobile === undefined){
            message.warning('请输入用户手机号');
        }else if(this.params.user_date === undefined){
            message.warning("请选择入职日期");
        }else{
            this.requestList();
        }
    }

    // 用户列表
    requestList = () => {
        axios.requestList(this,'user/list',this.params);
    }

    render(){
        const columns = [
            {
                title:'id',
                dataIndex:'id'
            },
            {
                title:'用户名',
                dataIndex:'username'
            },
            {
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex === 1 ? '男':'女'
                }
            },
            {
                title:'状态',
                dataIndex:'state',
                render(state){
                    return State[state]
                }
            },
            {
                title:'爱好',
                dataIndex:'interest',
                render(interest){
                    return Interest[interest]
                }
            },
            {
                title:'生日',
                dataIndex:'birthday'
            },
            {
                title:'联系地址',
                dataIndex:'address'
            },
            {
                title:'早起时间',
                dataIndex:'time'
            }
        ];
        return(
            <div style={{width:'100%'}}>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <div className="content-wrap">
                    {JSON.stringify(this.state.list)}
                </div>
            </div>
        );
    }
}