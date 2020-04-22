import React from "react";
import { 
    Form, 
    Input, 
    Button, 
    Checkbox, 
    Card, 
    Select, 
    message 
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Option } = Select;

const inlineLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
const horizontalLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 3, span: 12 },
};

export default class LoginForm extends React.Component{

    inlineFormRef = React.createRef(); // 行内表单
    horizontalFormRef = React.createRef(); // 水平表单

    onFinish = values => {
        console.log(values);
    };

    handleSubmit = () => {
        let userInfo = this.horizontalFormRef.current.getFieldValue();
        // 校验表单字段
        this.horizontalFormRef.current.validateFields().then((values) => {
            message.success(`${userInfo.userName} 恭喜你,您通过本次表单组件学习,当前密码为:${userInfo.password}`)
            console.log('校验成功，开始发送登录异步请求...');
        }).catch((errorInfo => {
            console.log('校验失败');
            console.log(errorInfo);
        }));
    }

    render(){
        return(
            <div style={{width:'100%'}}>
                <Card title="登录行内表单">
                    <Form {...inlineLayout} layout="inline" ref={this.inlineFormRef} name="control-ref" onFinish={this.onFinish}>
                        <Form.Item name="userName" label="用户名" rules={[{ required: true }]}>
                            <Input placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item name="password" label="密码" rules={[{ required: true }]}>
                            <Input placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card title="登录水平表单" style={{marginTop:10}}>
                    <Form 
                        {...horizontalLayout} 
                        layout="horizontal" 
                        ref={this.horizontalFormRef} 
                        name="control-ref" 
                        onFinish={this.onFinish}
                        initialValues={{
                            'userName':'',
                            'password':'',
                            'remember':true
                        }}    
                    >
                        <Form.Item 
                            name="userName" 
                            label="用户名" 
                            rules={[
                                { 
                                    required: true,
                                    message:'用户名不能为空'
                                },
                                {
                                    min:5,max:10,
                                    message:'长度不在范围内'
                                },
                                {
                                    pattern:new RegExp('^\\w+$','g'), // /^\w/g,
                                    message:'用户名必须为字母或者为数字'
                                }
                            ]}
                        >
                            <Input 
                                prefix={<UserOutlined />} 
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
                                prefix={<LockOutlined />} 
                                placeholder="请输入密码" 
                            />
                        </Form.Item>
                        <Form.Item {...tailLayout} >
                            <Form.Item 
                                name="remember" 
                                valuePropName="checked" 
                                noStyle
                            >
                                <Checkbox>记住密码</Checkbox>
                            </Form.Item>
                            <a href="" style={{float:'right'}}>
                                忘记密码
                            </a>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}