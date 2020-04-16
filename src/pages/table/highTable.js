import React from 'react';
import { Card, Table, Modal, Button, message } from 'antd';
import axios from './../../axios/index';
// 数据字典
import * as DictionaryConfig from './../../config/dictionaryConfig'
import Utils from './../../utils/utils';

export default class HighTable extends React.Component{

    state={
        dataSource:[]
    };

    params = {
        page:1
    }

    componentDidMount(){
        this.request();
    }

    // 动态获取mock数据
    request = () => {
        let _this = this;
        axios.ajax({
            // url:'table/list', // easy-mock模拟接口
            url:'tableList.json', // 本地public/api模拟json
            data:{
                params:{
                    page:this.params.page
                },
                // isShowLoading:false
            }
        }).then((res)=>{
            if(res.code === 0){
                // 动态添加key，消除控制台表格循环因为没有key红色警告
                res.result.list.map((item,index) => {
                    item.key = index;
                })
                this.setState({
                    dataSource:res.result.list
                })
            }
        })
    }

    render(){
        const columns = [
            {
                title:'id',
                width:80,
                dataIndex:'id'
            },
            {
                title:'用户名',
                width:80,
                dataIndex:'userName'
            },
            {
                title:'性别',
                width:80,
                dataIndex:'sex',
                // 字段格式化
                render(sex){
                    return sex === 1 ? '男':'女'
                }
            },
            {
                title:'状态',
                width:80,
                dataIndex:'state',
                render(state){
                    let config = DictionaryConfig.State;
                    return config[state];
                }
            },
            {
                title:'爱好',
                width:80,
                dataIndex:'interest',
                render(interest){
                    let config = DictionaryConfig.Interest;
                    return config[interest];
                }
            },
            {
                title:'生日',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'地址',
                width:120,
                dataIndex:'address'
            },
            {
                title:'早起时间',
                width:80,
                dataIndex:'time'
            }
        ];
        const columns2 = [
            {
                title:'id',
                width:80,
                fixed:'left',
                dataIndex:'id'
            },
            {
                title:'用户名',
                width:80,
                fixed:'left',
                dataIndex:'userName'
            },
            {
                title:'性别',
                width:80,
                dataIndex:'sex',
                // 字段格式化
                render(sex){
                    return sex === 1 ? '男':'女'
                }
            },
            {
                title:'状态',
                width:80,
                dataIndex:'state',
                render(state){
                    let config = DictionaryConfig.State;
                    return config[state];
                }
            },
            {
                title:'爱好',
                width:80,
                dataIndex:'interest',
                render(interest){
                    let config = DictionaryConfig.Interest;
                    return config[interest];
                }
            },
            {
                title:'生日',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'地址',
                width:120,
                dataIndex:'address'
            },
            {
                title:'早起时间',
                width:80,
                fixed:'right',
                dataIndex:'time'
            }
        ];
        return(
            <div style={{width:'100%'}}>
                <Card title="头部固定" style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        columns={columns}    
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{y:240}}
                    />
                </Card>
                <Card title="左侧固定" style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        columns={columns2}    
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{x:1800}}
                    />
                </Card>
            </div>
        )
    }
}