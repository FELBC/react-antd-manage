import React from "react";
import { 
    Form, 
    Input, 
    Button, 
    Checkbox, 
    Card, 
    Select, 
    message,
    Radio,
    Switch,
    DatePicker,
    TimePicker,
    Upload,
    InputNumber
} from 'antd';
import { UserOutlined, LockOutlined,PlusOutlined } from '@ant-design/icons';
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;
const layout = {
    labelCol: { 
        xs:24,
        sm:4    
    },
    wrapperCol: { 
        xs:24,
        sm:12
    },
};
const offsetLayout = {
    wrapperCol:{
        xs:24,
        sm:{
            span:12,
            offset:4
        }
    }
};

export default class FormRigister extends React.Component{

    state={}

    formRef = React.createRef();

    // 注册
    handleSubmit = () => {
        let userInfo = this.formRef.current.getFieldValue();
        // 校验表单字段
        this.formRef.current.validateFields().then((values) => {
            message.success(`${userInfo.userName} 恭喜你,您通过本次表单组件学习,当前密码为:${userInfo.password}`)
            console.log('校验成功，开始发送注册异步请求...');
        }).catch((errorInfo => {
            console.log('校验失败');
            console.log(errorInfo);
        }));
    }

    // 重置
    handleReset = () => {
        this.formRef.current.resetFields();
    }

    // 图片阅读返回结果解析成base64
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result)); // reader.result base64图片格式地址
        reader.readAsDataURL(img);
    }

    // 上传图片大小限制
    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      }

    // 图片上传
    handleChange = (info) => {
        if(info.file.status === 'uploading'){
            this.setState({loading:true});
            return;
        }
        if (info.file.status === 'done') {
            // 真实开发将getBase64方法去掉，替换成接收服务端返回图片URL地址
            this.getBase64(info.file.originFileObj, 
                imageUrl =>
                    this.setState({
                        userImg:imageUrl,
                        loading: false,
                    })
            )
        }
    };

    onFinish = values => {
        console.log(values);
    };

    render(){
        return(
            <div style={{width:'100%'}}>
                <Card title="注册表单">
                    <Form 
                        {...layout} 
                        layout="horizontal" 
                        ref={this.formRef} 
                        name="control-ref" 
                        onFinish={this.onFinish}
                        initialValues={{
                            'userName':'',
                            'password':'',
                            'sex':0,
                            'age':1,
                            'state':0,
                            'interest':[0],
                            'isMarried':true,
                            'birthday':moment(),
                            'address':'北京市海淀区奥林匹克公园',
                            'time':moment('00:00:00', 'HH:mm:ss'),
                            'userImg':'',
                            'agreement':true
                        }}    
                    >
                        <Form.Item 
                            name="userName" 
                            label="用户名" 
                            rules={[
                                { 
                                    required: true,
                                    message:'用户名不能为空'
                                }
                            ]}
                        >
                            <Input 
                                placeholder="请输入用户名" 
                            />
                        </Form.Item>
                        <Form.Item 
                            name="password" 
                            label="密码" 
                            rules={[{ 
                                required: true, 
                                message:'密码不能为空'
                            }]}
                        >
                            <Input 
                                type="password"
                                placeholder="请输入密码" 
                            />
                        </Form.Item>
                        <Form.Item 
                            name="sex" 
                            label="性别" 
                            rules={[{ required: true }]}
                        >
                            <Radio.Group>
                                <Radio value={0}>男</Radio>
                                <Radio value={1}>女</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item 
                            name="age" 
                            label="年龄" 
                            rules={[{ required: true }]}
                        >
                            <InputNumber min={1} max={100} />
                        </Form.Item>
                        <Form.Item 
                            name="state" 
                            label="当前状态" 
                            rules={[{ required: true }]}
                        >
                            <Select
                                allowClear
                            >
                                <Option value={0}>咸鱼一条</Option>
                                <Option value={1}>风华浪子</Option>
                                <Option value={2}>北大才子一枚</Option>
                                <Option value={3}>百度FE</Option>
                                <Option value={4}>创业者</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item 
                            name="interest" 
                            label="爱好" 
                            rules={[{ required: true }]}
                        >
                            <Select
                                allowClear
                                mode='multiple'
                            >
                                <Option value={0}>游泳</Option>
                                <Option value={1}>打篮球</Option>
                                <Option value={2}>踢足球</Option>
                                <Option value={3}>跑步</Option>
                                <Option value={4}>爬山</Option>
                                <Option value={5}>骑行</Option>
                                <Option value={6}>桌球</Option>
                                <Option value={7}>麦霸</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item 
                            name="isMarried" 
                            label="是否已婚" 
                            valuePropName="checked" 
                        >
                            <Switch  />
                        </Form.Item>
                        <Form.Item 
                            name="birthday"
                            label="生日"
                            rules={[{ required: true }]}
                        >
                            <DatePicker  
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                            />
                        </Form.Item>
                        <Form.Item 
                            name="address"
                            label="联系地址"
                            rules={[{ required: true }]}
                        >
                            <TextArea
                                autoSize={{
                                    minRows:2,
                                    maxRows:6
                                }}
                            />
                        </Form.Item>
                        <Form.Item 
                            name="time"
                            label="早起时间"
                            rules={[{ required: true }]}
                        >
                            <TimePicker />
                        </Form.Item>
                        <Form.Item 
                            name="userImg"
                            label="头像"
                            valuePropName='fileList'
                        >
                            <Upload
                                listType="picture-card"
                                showUploadList={true}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={this.beforeUpload}
                                onChange={this.handleChange}
                            >
                                {this.state.userImg?<img style={{width:'128px',height:'128px'}} alt='' src={this.state.userImg} />:<PlusOutlined />}
                            </Upload>
                        </Form.Item>
                        <Form.Item 
                            {...offsetLayout}
                            name="agreement"
                            valuePropName="checked" 
                        >
                            <Checkbox>我已阅读过<a href="">平台协议</a></Checkbox>
                        </Form.Item>
                        <Form.Item {...offsetLayout}>
                            <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{marginRight:'10px'}}>
                                注 册
                            </Button>
                            <Button htmlType="reset" onClick={this.handleReset}>
                                重 置
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}