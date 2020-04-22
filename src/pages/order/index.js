import React from 'react';
import {
    Card,
    Button,
    Table,
    Form,
    Modal,
    message
} from 'antd';
import axios from './../../axios';
import Utils from './../../utils/utils';
import './../../mock';
import BaseForm from './../../components/BaseForm';
import API from './../../api';

export default class Order extends React.Component{

    state = {
        list:[],
        orderInfo:{},
        orderConfirmVisible:false // 订单确认
    }
    params={
        page:1
    }
    formList = [
        {
            type:'SELECT',
            name:'city',
            label:'城市',
            placeholder:'全部',
            initialValue:'1',
            required:true,
            width:120,
            list:[
                {id:'0',name:'全部'},
                {id:'1',name:'北京'},
                {id:'2',name:'天津'},
                {id:'3',name:'上海'}
            ]
        },
        {
            type:'DATERANGE',
            name:'orderTime',
            label:'订单时间',
            placeholder:['开始时间','结束时间'],
            required:true,
            width:350,
            format:'YYYY-MM-DD'
        },
        {
            type:'SELECT',
            name:'status',
            label:'订单状态',
            placeholder:'全部',
            initialValue:"1",
            required:true,
            width:80,
            list:[
                {id:"0",name:'全部'},
                {id:'1',name:'进行中'},
                {id:'2',name:'结束行程'}
            ]
        }
    ]

    componentDidMount(){
        this.requestList();
    }

    // 查询
    handleFilter = (params) => {
        this.params = params;
        if(this.params.city === undefined){
            message.warning('请选择城市')
        }else if(this.params.orderTime === undefined){
            message.warning('请选择开始时间和结束时间')
        }else if(this.params.status === undefined){
            message.warning('请选择订单状态')
        }else{
            this.requestList();
        }
    }

    // 订单列表
    requestList = () => {
        axios.requestList(this,API.orderListApi,this.params,true);
    }

    // 表格行点击
    onRowClick = (record,index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        });
    }

    // 订单结束确认
    handleConfirm = () => {
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'信息',
                content:'请选择一条订单进行结束'
            })
            return;
        }
        axios.ajax({
            url:API.orderEbikeInfoApi,
            data:{
                params:{
                    orderId:item.id
                }
            }
        }).then((res) => {
            if(res.code === 0){
                let orderInfo = res.result;
                this.setState({
                    orderInfo,
                    orderConfirmVisible:true
                });
            }
        });
    }

    // 结束订单
    handleFinishOrder = ()=> {
        let item = this.state.selectedItem;
        axios.ajax({
            url:API.orderFinishOrderApi,
            data:{
                params:{
                    orderId:item.id
                }
            }
        }).then((res)=>{
            if(res.code === 0){
                message.success("订单结束成功");
                this.setState({
                    orderConfirmVisible:false
                });
                this.requestList();
            }
        });
    }

    // 订单详情
    openOrderDetail = ()=>{
        let item = this.state.selectedItem;
        console.log(item);
        if(!item){
            Modal.info({
                title:'信息',
                content:'请先选择一条订单'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`,'_blank');
    }

    render(){
        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title:'车辆编号',
                dataIndex:'bike_sn'
            },
            {
                title:'用户名',
                dataIndex:'user_name'
            },
            {
                title:'手机号',
                dataIndex:'mobile'
            },
            {
                title:'里程',
                dataIndex:'distance',
                render(distance){
                    return distance/1000 + 'Km';
                }
            },
            {
                title:'行驶时长',
                dataIndex:'total_time'
            },
            {
                title:'状态',
                dataIndex:'status'
            },
            {
                title:'开始时间',
                dataIndex:'start_time'
            },
            {
                title:'结束时间',
                dataIndex:'end_time'
            },
            {
                title:'订单金额',
                dataIndex:'total_fee'
            },
            {
                title:'实付金额',
                dataIndex:'user_pay'
            }

        ];
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type:'radio',
            selectedRowKeys
        };
        return (
            <div style={{width:"100%"}}>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft:10}} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record,index) => {
                            return{
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            };
                        }}
                    />
                </div>
                <Modal
                        title="结束订单"
                        visible={this.state.orderConfirmVisible}
                        onCancel={()=>{
                            this.setState({
                                orderConfirmVisible:false
                            })
                        }}
                        onOk={this.handleFinishOrder}
                        width={600}
                >
                        <Form
                            layout="horizontal">
                            <Form.Item label="车辆编号" >
                                {this.state.orderInfo.bike_sn}
                            </Form.Item>
                            <Form.Item label="剩余电量" >
                                {this.state.orderInfo.battery + '%'}
                            </Form.Item>
                            <Form.Item label="行程开始时间" >
                                {this.state.orderInfo.start_time}
                            </Form.Item>
                            <Form.Item label="当前位置" >
                                {this.state.orderInfo.location}
                            </Form.Item>
                        </Form>
                        
                </Modal>
            </div>
        );
    }
}
