import React from 'react';
import { Card, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import './ui.less';

export default class Modals extends React.Component{

    state = {
        showModal1:false,
        showModal2:false,
        showModal3:false,
        showModal4:false
    };

    handleOpen = (type) => {
        this.setState({
            [type]:true
        })
    };

    handleOk = (type) => {
        this.setState({
            [type]:false
        })
    };

    handleCancle = (type) => {
        this.setState({
            [type]:false
        })
    };

    handleConfirm = (type) => {
        Modal[type]({
            title:'确认？',
            content:'你确定你学会React了吗？',
            // icon: <ExclamationCircleOutlined />,
            onOk(){
                console.log('ok');
            },
            onCancel(){
                console.log('Cancel');
            }
        });
    }

    render(){
        return(
            <div className="ui-wrap">
                <div className="card">
                    <Card title="基础模态框" className="card-wrap">
                        <Button type="primary" onClick={() => this.handleOpen('showModal1')}>open</Button>
                        <Button type="primary" onClick={() => this.handleOpen('showModal2')}>自定义页脚</Button>
                        <Button type="primary" onClick={() => this.handleOpen('showModal3')}>顶部20px弹框</Button>
                        <Button type="primary" onClick={() => this.handleOpen('showModal4')}>水平垂直居中</Button>
                    </Card>
                    <Card title="信息确认框" className="card-wrap">
                        <Button type="primary" onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
                        <Button type="primary" onClick={() => this.handleConfirm('info')}>Info</Button>
                        <Button type="primary" onClick={() => this.handleConfirm('success')}>Success</Button>
                        <Button type="primary" onClick={() => this.handleConfirm('warning')}>Warning</Button>
                    </Card>
                    <Modal
                        title="React Modal"
                        visible={this.state.showModal1}   
                        onOk={() => this.handleOk('showModal1')}
                        onCancel={() => this.handleCancle('showModal1')}
                    >
                        <p>基础模态框</p>
                    </Modal>
                    <Modal
                        title="React Modal"
                        visible={this.state.showModal2}
                        okText="好的"
                        cancelText="算了"
                        onOk={() => this.handleOk('showModal2')}
                        onCancel={() => this.handleCancle('showModal2')}
                    >
                        <p>自定义页脚模态框</p>
                    </Modal>
                    <Modal
                        title="React Modal"
                        style={{top:20}}
                        visible={this.state.showModal3}
                        onOk={() => this.handleOk('showModal3')}
                        onCancel={() => this.handleCancle('showModal3')}
                    >
                        <p>距离顶部20px模态框</p>
                        <p>修改antd Modal自带样式</p>
                    </Modal>
                    <Modal
                        title="React Modal"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.showModal4}
                        onOk={() => this.handleOk('showModal4')}
                        onCancel={() => this.handleCancle('showModal4')}
                    >
                        <p>水平垂直居中</p>
                    </Modal>
                </div>
            </div>
        );
    }
}