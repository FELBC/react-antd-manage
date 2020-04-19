import React from 'react';
import { 
  Card, 
  Button, 
  Table, 
  Form, 
  Select, 
  Modal, 
  Radio,
  message
} from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
// 异步请求拦截,返回mock数据,解决easy-mock服务器老是挂掉问题
// 真实接口有了之后可以删除该拦截获取接口数据
import './../../mock/index';
import API from './../../api';

const { Option } = Select;
const layout = {
  labelCol:{ span:8 },
  wrapperCol:{ span:16 }
};

export default class City extends React.Component{

    formRef = React.createRef();

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

    // 城市列表
    requestList = () => {
        let _this = this
        axios.ajax({
            url:API.openCityApi,
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

    // 重置
    onReset = () => {
      this.formRef.current.resetFields();
    }

    // 开通城市
    handleOpenCity = () => {
        this.setState({
            isShowOpenCity:true
        })
    }

    // 城市开通提交
    handleSubmit = () => {
      // 获取到form表单的值
      let cityInfo = this.formRef.current.getFieldValue();
      axios.ajax({
        url:API.cityOpenApi,
        data:{
          params:cityInfo
        }
      }).then((res)=>{
        if(res.code===0){
          message.success(res.result);
          setTimeout(()=>{
            this.setState({
              isShowOpenCity:false
            })
          },1000);
          this.requestList();
        }
      });
    }

    onFinish = values => {
      console.log(values);
    };

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
            <div style={{width:"100%"}}>
                <Card>
                    <Form 
                        layout="inline"
                        ref={this.formRef} 
                        name="control-ref" 
                        onFinish={this.onFinish} 
                        initialValues={{
                          city: '0',
                          operate: '0',
                          useCar:'0',
                          jms:'0'
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
                          name="useCar" 
                          label="用车模式" 
                          rules={[{ required: true }]}
                          style={{width:'220px'}}  
                        >
                          <Select
                            allowClear
                          >
                            <Option value="0">全部</Option>
                            <Option value="1">指定停车点模式</Option>
                            <Option value="2">禁停区模式</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item 
                          name="operate" 
                          label="营运模式" 
                          rules={[{ required: true }]}
                          style={{width:'150px'}}  
                        >
                          <Select
                            allowClear
                          >
                            <Option value="0">全部</Option>
                            <Option value="1">自营</Option>
                            <Option value="2">加盟</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item 
                          name="jms" 
                          label="加盟商授权状态" 
                          rules={[{ required: true }]}
                          style={{width:'200px'}}  
                        >
                          <Select
                            allowClear
                          >
                            <Option value="0">全部</Option>
                            <Option value="1">已授权</Option>
                            <Option value="2">未授权</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" style={{margin:'0 20px'}} onClick={this.requestList}>查询</Button>
                            <Button onClick={this.onReset}>重置</Button>
                        </Form.Item>
                      </Form>
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
                <Modal 
                    title="开通城市"
                    visible={this.state.isShowOpenCity}
                    onCancel={()=>{
                        this.setState({
                            isShowOpenCity:false
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                    <Form 
                      {...layout} 
                      ref={this.formRef} 
                      name="control-ref" 
                      onFinish={this.onFinish} 
                      initialValues={{
                        city: '0',
                        operate: '0',
                        useCar:'0'
                      }}
                    >
                      <Form.Item name="city" label="选择城市" rules={[{ required: true }]}>
                        <Select
                          placeholder="请选择城市"
                          allowClear
                        >
                          <Option value="0">全部</Option>
                          <Option value="1">北京</Option>
                          <Option value="2">天津</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="operate" label="营运模式" rules={[{ required: true }]}>
                        <Radio.Group>
                          <Radio value="0">自营</Radio>
                          <Radio value="1">加盟</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item name="useCar" label="用车模式" rules={[{ required: true }]}>
                        <Radio.Group>
                          <Radio value="0">指定停车点模式</Radio>
                          <Radio value="1">禁停区模式</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}