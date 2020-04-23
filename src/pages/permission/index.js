import React from 'react';
import { 
    Card, 
    Button, 
    Form, 
    Input, 
    Select,
    message, 
    Modal, 
    Tree,
    Transfer
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
import menuConfig from './../../config/menuConfig';
import mock from './../../mock';

const { Option } = Select;
const { TreeNode } = Tree;
const layout = {
    labelCol:{ span:5 },
    wrapperCol:{ span:16 }
};

export default class PermissionUser extends React.Component{

    params = {
        page:1
    }
    
    state = {
        list:[],
        isRoleVisible:false,
        isPermVisible:false,
        detailInfo:{},
        isUserVisible:false
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
        let data = this.refs.createRole.createRoleFormRef.current.getFieldValue();
        if(!data.roleName){
            message.warning('请输入角色名称');
        }else if(!data.status){
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
                    this.refs.createRole.createRoleFormRef.current.resetFields();
                }else{
                    message.error('创建角色失败');
                }
            });
        }
    }

    // 设置权限模态
    handlePermission = () => {
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'提示',
                content:'请选择一个角色'
            });
            return;
        }
        this.setState({
            isPermVisible:true,
            detailInfo:item,
            menuInfo:item.menus
        });
        // initialValues 不能被 setState 动态更新，需要用 setFieldsValue 来更新
        // 修改子组件模态表单值
        this.refs.permEdit.permEditFormRef.current.setFieldsValue({
            roleName:item.role_name,
            status:item.status,
        });
    }

    // 设置权限提交
    handlePermEditSubmit = () => {
        let data = this.refs.permEdit.permEditFormRef.current.getFieldValue();
        data.role_id = this.state.selectedItem.id;
        data.menus = this.state.menuInfo
        axios.ajax({
            url:API.permissionEditApi,
            data:{
                params:{
                    ...data
                }
            }
        }).then((res) => {
            if(res.code === 0){
                message.success('设置权限成功!');
                this.requestList();
                setTimeout(()=>{
                    this.setState({
                        isPermVisible:false
                    });
                },500);    
            }else{
                message.error('设置权限失败! ');
            }
        });
    }

    // 用户授权
    handleUserAuth = () => {
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'提示',
                content:'请选择一个角色'
            });
            return;
        }
        this.setState({
            isUserVisible:true,
            detailInfo:item
        });
        this.refs.roleAuth.roleAuthFormRef.current.setFieldsValue({
            roleName:item.role_name,
            status:item.status,
        });
        this.getRoleUserList(item.id);
    }

    // 获取角色用户列表
    getRoleUserList = (id) => {
        axios.ajax({
            url:'/role/user_list',
            data:{
                params:{
                    id
                }
            }
        }).then((res)=>{
            if(res){
                this.getAuthUserList(res.result);
            }
        });
    }

    // 筛选目标用户
    getAuthUserList = (dataSource) => {
        const mockData = [];
        const targetKeys = [];
        if(dataSource && dataSource.length>0){
            for(let i = 0; i < dataSource.length; i++){
                const data = {
                    key:dataSource[i].user_id,
                    title:dataSource[i].user_name,
                    status:dataSource[i].status
                };
                if(data.status === 1){
                    targetKeys.push(data.key);
                }
                mockData.push(data);
            }
            this.setState({
                mockData,targetKeys
            });
        }
    }

    // 用户授权提交
    handleUserSubmit = () => {
        let data = {};
        data.user_ids = this.state.targetKeys;
        data.role_id = this.state.selectedItem.id;
        axios.ajax({
            url:'/role/user_role_edit',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res){
                message.success("用户授权提交成功！");
                setTimeout(()=>{
                    this.setState({
                        isUserVisible:false
                    })
                },500);
                this.requestList();
            }else{
                message.error("用户授权提交失败！");
            }
        });
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
                    return status === 1?'开启':'关闭'
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
                    <Button type="primary" style={{marginRight:'10px'}} onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
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
                        this.refs.createRole.createRoleFormRef.current.resetFields(); //这是一个屎坑
                        this.setState({
                            isRoleVisible:false
                        })
                    }}
                    width={600}
                >
                    <CreateRoleForm 
                        ref='createRole' 
                    />
                </Modal>
                <Modal
                    // 屎坑
                    // 在调用 form 方法时，Modal 还未初始化导致 form 没有关联任何 Form 组件。
                    // 你可以通过给 Modal 设置 forceRender 将其预渲染。
                    forceRender 
                    title='设置权限'
                    visible={this.state.isPermVisible}
                    onOk={this.handlePermEditSubmit}
                    onCancel={()=>{
                        this.setState({
                            isPermVisible:false
                        });
                    }}
                    width={600}
                >
                    <PermEditForm 
                        ref='permEdit' 
                        detailInfo={this.state.detailInfo}
                        menuInfo={this.state.menuInfo}
                        patchMenuInfo={(checkedKeys)=>{
                            this.setState({
                                menuInfo:checkedKeys
                            });
                        }}
                    />
                </Modal>
                <Modal
                    forceRender 
                    title="用户授权"
                    visible={this.state.isUserVisible}
                    onOk={this.handleUserSubmit}
                    onCancel={()=>{
                        this.setState({
                            isUserVisible:false
                        });
                    }}
                    width={800}
                >
                    <RoleAuthForm 
                        ref='roleAuth' 
                        detailInfo={this.state.detailInfo}
                        targetKeys={this.state.targetKeys}
                        mockData={this.state.mockData}
                        patchUserInfo={(targetKeys)=>{
                            this.setState({
                                targetKeys
                            });
                        }}
                    />
                </Modal>
            </div>
        );
    }
}

class CreateRoleForm extends React.Component{

    createRoleFormRef = React.createRef();

    state = {
        userInfo:{
            roleName:'',
            status:1,
        }
    }

    render(){
        return(
            <Form 
                {...layout} 
                layout="horizontal"
                ref={this.createRoleFormRef} 
                name="control-ref" 
                onFinish={this.onFinish} 
                initialValues={{
                    roleName:this.state.userInfo.roleName,
                    status:this.state.userInfo.status,
                }}
            >
                <Form.Item 
                    name="roleName"
                    label="角色名称"
                    rules={[{ required: true }]} 
                >
                    <Input type="text" placeholder="请输入角色名称" />
                </Form.Item>
                <Form.Item name="status" label="状态" rules={[{ required: true }]}>
                    <Select
                        allowClear
                    >
                        <Option value={1}>开启</Option>
                        <Option value={0}>关闭</Option>
                    </Select>
                </Form.Item>
            </Form>
        );
    }
}

class PermEditForm extends React.Component{

    permEditFormRef = React.createRef();

    state = {
        // menuInfo:['/admin/home']
    }

    // 递归渲染menuConfig
    renderTreeNodes = (data)=>{
        return data.map((item) => {
            if(item.children){
                return <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            }else{
                return <TreeNode {...item} />
            }
        });
    }
      
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };
      
    onCheck = (checkedKeys, info) => {
        // console.log('onCheck', checkedKeys, info);
        this.props.patchMenuInfo(checkedKeys);
    };

    render(){
        return(
            <div>
                {JSON.stringify(this.props.menuInfo)}
                <Form 
                    {...layout} 
                    layout="horizontal"
                    ref={this.permEditFormRef} 
                    name="control-ref" 
                    onFinish={this.onFinish} 
                    initialValues={{
                        roleName:this.props.detailInfo.role_name,
                        status:this.props.detailInfo.status,
                    }}
                >
                    <Form.Item 
                        name="roleName"
                        label="角色名称"
                        rules={[{ required: true }]} 
                    >
                        <Input type="text" disabled  />
                    </Form.Item>
                    <Form.Item name="status" label="状态" rules={[{ required: true }]}>
                        <Select
                            allowClear
                        >
                            <Option value={1}>开启</Option>
                            <Option value={0}>关闭</Option>
                        </Select>
                    </Form.Item>
                    <Tree
                        checkable
                        defaultExpandAll={true}
                        defaultCheckedKeys={this.props.menuInfo}
                        onCheck={this.onCheck}
                        treeData={menuConfig}
                    />
                </Form>
            </div>
        );
    }
}

class RoleAuthForm extends React.Component{
    
    roleAuthFormRef = React.createRef();

    state = {}

    filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;

    // 单项数据流例子说明，
    // 子组件onChange，调用handleChange方法，handleChane调用父组件patchUserInfo,
    // 父组件调用方法更新state中targetKeys，
    // 父组件再将state中targetKeys通过props流向子组件
    handleChange = (targetKeys) => {
        this.props.patchUserInfo(targetKeys);
    }

    render(){
        return(
            <div>
                <Form 
                    {...layout} 
                    layout="horizontal"
                    ref={this.roleAuthFormRef} 
                    name="control-ref" 
                    onFinish={this.onFinish} 
                    initialValues={{
                        roleName:this.props.detailInfo.role_name,
                        status:this.props.detailInfo.status,
                    }}
                >
                    <Form.Item 
                        name="roleName"
                        label="角色名称"
                        rules={[{ required: true }]} 
                    >
                        <Input type="text" disabled  />
                    </Form.Item>
                    <Form.Item
                        label="选择用户"
                    >
                        <Transfer
                            listStyle={{width:200,height:400}}
                            dataSource={this.props.mockData}
                            titles={['待选用户','已选用户']}
                            showSearch
                            searchPlaceholder='请输入用户名'
                            filterOption={this.filterOption}
                            targetKeys={this.props.targetKeys}
                            onChange={this.handleChange}
                            render={item=>item.title}
                        />
                    </Form.Item>
                </Form>
            </div>
        );
    }
}