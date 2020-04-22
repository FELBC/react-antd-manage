import React from 'react';
import { 
    Card, 
    Button, 
    Form, 
    Input, 
    Checkbox,
    Select,
    Radio, 
    message, 
    Modal, 
    DatePicker
} from 'antd';
import ETable from './../../components/ETable';
import Utils from './../../utils/utils';
import axios from './../../axios';
import './../../mock';
import API from './../../api';
import moment from 'moment';
import { 
    PlusOutlined
} from '@ant-design/icons';

const { Option } = Select;
const layout = {
    labelCol:{ span:5 },
    wrapperCol:{ span:16 }
};

export default class PermissionUser extends React.Component{

    formRef = React.createRef();

    params = {
        page:1
    }
    
    state = {
        list:[],
        isRoleVisible:false,
        userInfo:{
            roleName:'',
            state:1,
        },
    }

    UNSAFE_componentWillMount(){
        this.requestList();
    }

    requestList = () => {
        axios.requestList(this,'/role/list',{},true);
    }

    // 打开创建角色弹框
    handleRole = () => {
        this.setState({
            isRoleVisible:true
        });
    }

    // 创建角色提交
    handleRoleSubmit = () => {
        let data = this.formRef.current.getFieldValue();
        if(!data.roleName){
            message.warning('请输入角色名称');
        }else if(!data.state){
            message.warning('请选择状态');
        }else{
            axios.ajax({
                url:API.roleCreateApi,
                data:{
                    params:{
                        ...data
                    }
                }
            }).then((res)=>{
                if(res.code === 0){
                    message.success('创建角色成功');
                    this.setState({
                        isRoleVisible:false
                    });
                    this.requestList();
                    this.formRef.current.resetFields();
                }else{
                    message.error('创建角色失败');
                }
            });
        }
    }

    render(){
        const columns = [
            {
                title:'角色ID',
                dataIndex:'id'
            },
            {
                title:'角色名称',
                dataIndex:'role_name'
            },
            {
                title:'创建时间',
                dataIndex:'create_time'
            },
            {
                title:'使用状态',
                dataIndex:'status',
                render(status){
                    return status === 1?'启用':'停用'
                }
            },
            {
                title:'授权时间',
                dataIndex:'authorize_time',
                render:Utils.formateDate
            },
            {
                title:'授权人',
                dataIndex:'authorize_user_name'
            }
        ];
        return(
            <div style={{width:'100%'}}>
                <Card>
                    <Button type="primary" icon={<PlusOutlined />} style={{marginRight:'10px'}} onClick={()=>this.handleRole()}>创建角色</Button>
                    <Button type="primary" style={{marginRight:'10px'}}>设置权限</Button>
                    <Button type="primary" >用户授权</Button>
                </Card>
                <div className="content-wrap">
                    <ETable 
                        columns = {columns}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys = {this.state.selectedRowKeys}
                        selectedItem = {this.state.selectedItem}
                        dataSource={this.state.list}
                        pagination = {this.state.pagination}
                        rowSelectionType = "radio" // 单选/复选/没有就不加
                    />
                </div>
                <Modal
                    title='创建角色'
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={()=>{
                        this.formRef.current.resetFields();
                        this.setState({
                            isRoleVisible:false
                        })
                    }}
                    width={600}
                >
                    <Form 
                        {...layout} 
                        layout="horizontal"
                        ref={this.formRef} 
                        name="control-ref" 
                        onFinish={this.onFinish} 
                        initialValues={{
                            roleName:this.state.userInfo.roleName,
                            state:this.state.userInfo.state,
                        }}
                    >
                        <Form.Item 
                            name="roleName"
                            label="角色名称"
                            rules={[{ required: true }]} 
                        >
                            <Input type="text" placeholder="请输入角色名称" />
                        </Form.Item>
                        <Form.Item name="state" label="状态" rules={[{ required: true }]}>
                            <Select
                                allowClear
                            >
                                <Option value={1}>开启</Option>
                                <Option value={0}>关闭</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}