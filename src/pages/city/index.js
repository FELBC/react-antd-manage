import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
// 异步请求拦截,返回mock数据,解决easy-mock服务器老是挂掉问题
// 真实接口有了之后可以删除该拦截获取接口数据
import './../../mock/index';

const FormItem = Form.Item;
const Option = Select.Option;

export default class City extends React.Component{

    state={
        list:[],
        isShowOpenCity:false,
    }
    params={
        page:1
    }
    componentDidMount(){
        this.requestList();
    }

    // 默认请求我们的接口数据
    requestList = () => {
        let _this = this
        axios.ajax({
            url:'open_city',
            data:{
                params:{
                    page:this.params.page
                },
            }
        }).then((res)=>{
            let list = res.result.item_list.map((item,index) => {
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
        const columns = [
            {
                title:'城市ID',
                dataIndex:'id'
            },
            {
                title:'城市名称',
                dataIndex:'name'
            },
            {
                title:'用车模式',
                dataIndex:'mode',
                render(mode){
                    return mode===1?'停车点':'禁停区';
                }
            },
            {
                title:'营运模式',
                dataIndex:'op_mode',
                render(op_mode){
                    return op_mode===1?'自营':'加盟'
                }
            },
            {
                title:'授权加盟商',
                dataIndex:'franchisee_name'
            },
            {
                title:'城市管理员',
                dataIndex:'city_admins',
                render(arr){
                    return arr.map((item)=>{
                        return item.user_name;
                    }).join(',');
                }
            },
            {
                title:'城市开通时间',
                dataIndex:'open_time'
            },
            {
                title:'操作时间',
                dataIndex:'update_time',
                render:Utils.formateDate
            },
            {
                title:'操作人',
                dataIndex:'sys_user_name'
            }
        ];
        return(
            <div>
                <Card>

                </Card>
                <Card style={{marginTop:10}}>
                    <Button type='primary' onClick={this.handleOpenCity}>开通城市</Button>
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