import React from 'react';
import { Card, Table } from 'antd';
import axios from './../../axios/index';

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
                }
            }
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    dataSource2:res.result
                })
            }
        })
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
                dataIndex:'sex'
            },
            {
                title:'状态',
                dataIndex:'state'
            },
            {
                title:'爱好',
                dataIndex:'interest'
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
                <Card title="动态数据渲染表格">
                    <Table
                        bordered
                        columns={columns}    
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
            </div>
        );
    }
}