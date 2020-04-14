import React from 'react';
import { Card, Button, notification } from 'antd';
import './ui.less';

export default class Notification extends React.Component{

    openNotification = (type,direction) => {
        if(direction){
            notification.config({
                placement:direction
            })
        }
        notification[type]({
            message:'通知',
            description:'这是一条通知，请查看'
        });
    };

    render(){
        return(
            <div className="ui-wrap">
                <div className="card">
                    <Card title="通知提醒框" className="card-wrap">
                        <Button type="primary" onClick={() => this.openNotification('success')}>Success</Button>
                        <Button type="primary" onClick={() => this.openNotification('info')}>Info</Button>
                        <Button type="primary" onClick={() => this.openNotification('warning')}>Warning</Button>
                        <Button type="primary" danger onClick={() => this.openNotification('error')}>Error</Button>
                    </Card>
                    <Card title="通知提醒框" className="card-wrap">
                        <Button type="primary" onClick={() => this.openNotification('success','topLeft')}>Success</Button>
                        <Button type="primary" onClick={() => this.openNotification('info','topRight')}>Info</Button>
                        <Button type="primary" onClick={() => this.openNotification('warning','bottomLeft')}>Warning</Button>
                        <Button type="primary" danger onClick={() => this.openNotification('error','bottomRight')}>Error</Button>
                    </Card>
                </div>
            </div>
        );
    }
}