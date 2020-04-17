import React from 'react';
import {
    Card,
    Button,
    Table,
    Form,
    Select,
    Modal,
    Radio,
    message,
    DatePicker
} from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
import './../../mock/index';

const { Option } = Select;
const { RangePicker } = DatePicker;

const layout = {
  labelCol:{ span:8 },
  wrapperCol:{ span:16 }
};

export default class Order extends React.Component{

    formRef = React.createRef();

    state = {
        list:[]
    }
    params={
        page:1
    }

    componentDidMount(){
        this.requestList();
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

    // 重置
    onReset = () => {
        this.formRef.current.resetFields();
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
                dataIndex:'distance'
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
                <Form 
                    layout="inline"
                    ref={this.formRef} 
                    name="control-ref" 
                    onFinish={this.onFinish} 
                    initialValues={{
                        city: '0',
                        orderTime:'',
                        status:'0'
                    }}
                >
                    <Form.Item 
                        name="city" 
                        label="城市" 
                        rules={[{ required: true }]} 
                        style={{width:'120px'}}
                    >
                        <Select
                            allowClear
                        >
                            <Option value="0">全部</Option>
                            <Option value="1">北京</Option>
                            <Option value="2">天津</Option>
                            <Option value="3">深圳</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        name="orderTime" 
                        label="订单时间" 
                        rules={[{ required: true }]}
                        style={{width:'350px'}}  
                    >
                        <RangePicker />
                    </Form.Item>
                    <Form.Item 
                        name="status" 
                        label="订单状态" 
                        rules={[{ required: true }]}
                        style={{width:'200px'}}  
                    >
                        <Select
                            allowClear
                        >
                            <Option value="0">全部</Option>
                            <Option value="1">进行中</Option>
                            <Option value="2">结束行程</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" style={{margin:'0 20px'}} onClick={this.requestList}>查询</Button>
                        <Button onClick={this.onReset}>重置</Button>
                    </Form.Item>
                </Form>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button>订单详情</Button>
                    <Button>结束订单</Button>
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
