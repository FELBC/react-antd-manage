import React from 'react';
import { Card, Button, Spin, Icon, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import './ui.less';

export default class Loadings extends React.Component{

    render(){
        const icon = <LoadingOutlined style={{fontSize:24}} />;
        return(
            <div className="ui-wrap">
                <div className="card">
                    <Card title="Spin的用法" className="card-wrap">
                        <Spin size="small" />
                        <Spin style={{margin:'0 10px'}} />
                        <Spin size="large" />
                        <Spin indicator={icon} style={{marginLeft:10}} />
                    </Card>
                    <Card title="内容遮罩" className="card-wrap">
                        <Alert
                            meassage="React"
                            description="react学习"
                            type="info"
                            style={{marginBottom:10}}
                        />
                        <Spin>
                            <Alert
                                meassage="React"
                                description="react学习"
                                type="warning"
                                style={{marginBottom:10}}
                            />
                        </Spin>
                        <Spin tip="加载中...">
                            <Alert
                                meassage="React"
                                description="react学习"
                                type="success"
                            />
                        </Spin>
                    </Card>
                </div>
            </div>
        );
    }
}