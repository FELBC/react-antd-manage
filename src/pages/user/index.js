import React from 'react';
import {
    Card, 
    Button, 
    Form, 
    Input, 
    Select,
    Radio, 
    message, 
    Modal, 
    DatePicker
} from 'antd';
import axios from './../../axios';
import Utils from './../../utils/utils';
import ETable from './../../components/ETable';
import moment from 'moment';
import BaseForm from './../../components/BaseForm';
import API from './../../api';
import {
    State,
    Interest
} from './../../config/dictionaryConfig';
import { 
    PlusOutlined,
    EditOutlined,
    DeleteOutlined    
} from '@ant-design/icons';

const { Option } = Select;
const layout = {
    labelCol:{ span:5 },
    wrapperCol:{ span:16 }
};

export default class User extends React.Component{
    
    params = {
        page:1
    }

    state = {
        list:[],
        isVisible:false,
        userInfo:{},
    }

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

    // 创建员工提交
    handleSubmit = () => {
        let type = this.state.type;
        let data = this.refs.userCrud.formRef.current.getFieldValue();
        if(!data.userName){
            message.warning('请输入姓名');
        }else if(!data.sex){
            message.warning('请选择性别');
        }else if(!data.state){
            message.warning('请选择状态');
        }else if(!data.birthday){
            message.warning('请选择生日');
        }else if(!data.address){
            message.warning('请输入联系地址');
        }else{
            axios.ajax({
                url:type === 'create'?API.userAddApi:API.userEditApi,
                data:{
                    params:{
                        ...data
                    }
                }
            }).then((res)=>{
                if(res.code === 0){
                    message.success(type === 'create'?'创建员工成功!':'编辑员工成功');
                    this.setState({
                        isVisible:false
                    });
                    this.requestList();
                    this.refs.userCrud.formRef.current.resetFields();
                }else{
                    message.error(type === 'create'?'创建员工失败!':'编辑员工失败');
                }
            });
        }
    }

    // 用户CRUD
    handleOperate = (type) => {
        let item = this.state.selectedItem;
        if(type === 'create'){
            this.setState({
                type,
                isVisible:true,
                title:'创建员工',
                userInfo:{}
            });
            this.refs.userCrud.formRef.current.resetFields();
        }else if(type==='edit' || type==='detail'){
            if(!item){
                Modal.info({
                    title:'信息',
                    content:'请选择一个用户'
                })
                return;
            }
            this.setState({
                title:type==='edit'?'编辑用户':'查看详情',
                isVisible:true,
                // userInfo:item,
                type
            });
            this.refs.userCrud.formRef.current.setFieldsValue({
                userName:item.userName,
                sex:item.sex,
                state:item.state,
                birthday:moment(item.birthday),
                address:item.address
            });
        }else{
            if(!item){
                Modal.info({
                    title:'信息',
                    content:'请选择一个用户'
                })
                return;
            }
            // Modal this作用域发生变化，需要修改
            let _this = this;
            Modal.confirm({
                title:'确认删除',
                content:'是否要删除当前选中的员工？',
                onOk(){
                    axios.ajax({
                        url:API.userDeleteApi,
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then((res)=>{
                        if(res.code===0){
                            message.success(`员工${item.id}删除成功！`);
                            _this.requestList();
                            setTimeout(_this.setState({
                                isVisible:false
                            }),500);
                        }
                    });
                }
            });
        }
    }

    onFinish = values => {
        console.log(values);
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
                <Card style={{marginTop:10}} className="operate-wrap">
                    <Button type="primary" icon={<PlusOutlined />} onClick={()=>this.handleOperate('create')}>创建员工</Button>
                    <Button type="primary" icon={<EditOutlined />} onClick={()=>this.handleOperate('edit')}>编辑员工</Button>
                    <Button type="primary" onClick={()=>this.handleOperate('detail')}>员工详情</Button>
                    <Button type="primary" danger icon={<DeleteOutlined />} onClick={()=>this.handleOperate('delete')}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable 
                        columns = {columns}
                        updateSelectedItem = {Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys = {this.state.selectedRowKeys}
                        selectedItem = {this.state.selectedItem}
                        dataSource = {this.state.list}
                        pagination = {this.state.pagination}
                        rowSelectionType = "radio" // 单选/复选/没有就不加
                    />
                </div>
                <Modal
                    forceRender
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.refs.userCrud.formRef.current.resetFields();
                        this.setState({
                            isVisible:false
                        })
                    }}
                    width={600}
                >
                    <UserForm
                        ref='userCrud' 
                        userInfo={this.state.userInfo}
                    />
                </Modal>
            </div>
        );
    }
}

class UserForm extends React.Component{

    formRef = React.createRef();

    state = {}

    render(){
        return(
            <div>
                <Form 
                    {...layout} 
                    layout="horizontal"
                    ref={this.formRef}  
                    name="control-ref" 
                    onFinish={this.onFinish} 
                    initialValues={{
                        userName:this.props.userInfo.userName,
                        sex:this.props.userInfo.sex,
                        state:this.props.userInfo.state,
                        birthday:moment(this.props.userInfo.birthday),
                        address:this.props.userInfo.address
                    }}
                >
                    <Form.Item 
                        name="userName"
                        label="姓名"
                        rules={[{ required: true }]} 
                    >
                        <Input type="text" placeholder="请输入姓名" />
                    </Form.Item>
                    <Form.Item 
                        name="sex"
                        label="性别"
                        rules={[{ required: true }]} 
                    >
                        <Radio.Group>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="state" label="状态" rules={[{ required: true }]}>
                        <Select
                            allowClear
                        >
                            <Option value={1}>咸鱼一条</Option>
                            <Option value={2}>风华浪子</Option>
                            <Option value={3}>北大才子一枚</Option>
                            <Option value={4}>百度FE</Option>
                            <Option value={5}>创业者</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        name="birthday"
                        label="生日"
                        rules={[{ required: true }]}
                    >
                        <DatePicker  
                            format='YYYY-MM-DD'
                        />
                    </Form.Item>
                    <Form.Item 
                        name="address"
                        label="联系地址"
                        rules={[{ required: true }]} 
                    >
                        <Input.TextArea row={3} placeholder="请输入联系地址" />
                    </Form.Item>
                </Form>
            </div>
        );
    }
}