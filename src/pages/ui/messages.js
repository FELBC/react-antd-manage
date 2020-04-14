import React from 'react';
import { Card, Button, message } from 'antd';
import './ui.less';

export default class Messages extends React.Component{

    showMessage = (type,msg) => {
        message[type](msg);
    };

    render(){
        return(
            <div className="ui-wrap">
                <div className="card">
                    <Card title="全局提示框" className="card-wrap"> 
                        <Button onClick={() => this.showMessage('success','添加成功！')}>Success</Button>
                        <Button onClick={() => this.showMessage('info','提示！')}>Info</Button>
                        <Button onClick={() => this.showMessage('warning','警告!')}>Warning</Button>
                        <Button onClick={() => this.showMessage('error','这是一条错误信息')}>Error</Button>
                        <Button onClick={() => this.showMessage('loading','loading')}>Loading</Button>
                    </Card>
                </div>
            </div>
        );
    }
}