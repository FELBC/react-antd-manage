import React from 'react';
import { Card, Table } from 'antd';
import axios from './../../axios/index';
// 数据字典
import * as DictionaryConfig from './../../config/dictionaryConfig'
import Modal from 'antd/lib/modal/Modal';

export default class BasicTable extends React.Component{

    state={
        dataSource2:[]
    };

    componentDidMount(){
        const dataSource = [
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'浙江杭州西湖区',
                time:'09:00'
            },
            {
                id:'1',
                userName:'Fack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'浙江杭州西湖区',
                time:'09:00'
            },
            {
                id:'2',
                userName:'Tack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'浙江杭州西湖区',
                time:'09:00'
            }
        ];
        dataSource.map((item,index) => {
            item.key = index;
        });
        this.setState({
            dataSource
        });
        this.request();
    }

    // 动态获取mock数据
    request = () => {
        axios.ajax({
            url:'table/list', // easy-mock模拟接口
            // url:'tableList.json', // 本地public/api模拟json
            data:{
                params:{
                    page:1
                },
                // isShowLoading:false
            }
        }).then((res)=>{
            if(res.code === 0){
                // 动态添加key，消除控制台表格循环因为没有key红色警告
                res.result.map((item,index) => {
                    item.key = index;
                })
                this.setState({
                    dataSource2:res.result
                })
            }
        })
    }

    // 表格行点击获取单行数据
    onRowClick = (record,index)=>{
        let selectKey = [index];
        Modal.info({
            title:'选择行信息：',
            content: JSON.stringify(record)//`用户名：${record.userName},用户爱好：${record.interest}`
        });
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        });
    }

    render(){
        const columns = [
            {
                title:'id',
                dataIndex:'id'
            },
            {
                title:'用户名',
                dataIndex:'userName'
            },
            {
                title:'性别',
                dataIndex:'sex',
                // 字段格式化
                render(sex){
                    return sex === 1 ? '男':'女'
                }
            },
            {
                title:'状态',
                dataIndex:'state',
                render(state){
                    let config = DictionaryConfig.State;
                    return config[state];
                }
            },
            {
                title:'爱好',
                dataIndex:'interest',
                render(interest){
                    let config = DictionaryConfig.Interest;
                    return config[interest];
                }
            },
            {
                title:'生日',
                dataIndex:'birthday'
            },
            {
                title:'地址',
                dataIndex:'address'
            },
            {
                title:'早起时间',
                dataIndex:'time'
            }
        ];
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type:'radio',
            selectedRowKeys
        }
        return(
            <div style={{width:'100%'}}>
                <Card title="基础表格" style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        columns={columns}    
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据渲染表格-Mock" style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        columns={columns}    
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="单选-Mock">
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record,index) => {
                            return {
                              onClick: ()=>{
                                  this.onRowClick(record,index);
                              }
                            };
                          }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
            </div>
        );
    }
}