import React from 'react';
import {
    Card,
    Button,
    Table,
    Form,
    Select,
    Modal,
    message,
    DatePicker
} from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
import './../../mock/index';
import BaseForm from './../../components/BaseFrom';

const { Option } = Select;
const { RangePicker } = DatePicker;

const layout = {
  labelCol:{ span:8 },
  wrapperCol:{ span:16 }
};

export default class Order extends React.Component{

    state = {
        list:[],
        orderInfo:{},
        orderConfirmVisible:false
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
        let _this = this;
        axios.ajax({
            url:'/order/list',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            let list = res.result.item_list.map((item,index)=>{
                item.key = index;
                return item;
            });
            this.setState({
                list,
                pagination:Utils.pagination(res,(current)=>{
                    _this.params.page = current;
                    _this.requestList();
                })
            });
        })
    }

    onFinish = values => {
        console.log(values);
    };

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
                    />
                </div>
            </div>
        );
    }
}
