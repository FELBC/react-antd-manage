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

    handleChange = (pagination,filters,sorter) => {
        this.setState({
            sortOrder:sorter.order
        })
    }

    //删除操作
    handleDelete = (item) => {
        let id = item.id;
        Modal.confirm({
            title:'确认',
            content:`您确认要删除${id}这条数据吗？`,
            onOk:()=>{
                message.success('删除成功');
                this.request();
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
        const columns3 = [
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
                title:'年龄',
                dataIndex:'age',
                sorter:(a,b)=>{
                    return a.age-b.age;
                },
                sorterOrder:this.state.sortOrder
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
        const columns4 = [
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
                title:'年龄',
                dataIndex:'age',
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
                    let config = DictionaryConfig.BadgeInterest;
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
                title:'操作',
                // 不使用箭头函数会有this指针拿不到产生的错误
                // 使用箭头函数将作用域指向调用方法本身
                render:(text,item) => {
                    return (
                        <Button 
                            type="primary" 
                            danger size="small" 
                            onClick={() => {this.handleDelete(item)}}>
                            删除
                        </Button>
                    )
                }
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
                <Card title="表格排序" style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        columns={columns3}    
                        dataSource={this.state.dataSource}
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="操作按钮" style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        columns={columns4}    
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}