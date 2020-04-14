import React from 'react';
import { Card, Button, Radio } from 'antd';
import { 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined, 
    SearchOutlined, 
    DownloadOutlined,
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons'
import './ui.less';

export default class Buttons extends React.Component{

    state = {
        loading:false,
        size:"default"
    };

    enterLoading = () => {
        this.setState({loading:true});
        setTimeout(() => {
            this.setState({loading:false});
        },5000);
    };

    handleChange = (e) => {
        this.setState({
            size:e.target.value
        });
    }

    render(){
        return(
            <div className="button-wrap">
                <div className="card">
                    <Card title="基础按钮" className="card-wrap"> 
                        <Button type="primary">按钮1</Button>
                        <Button>按钮2</Button>
                        <Button type="dashed">按钮3</Button>
                        <Button type="danger">按钮4</Button>
                        <Button disabled>按钮5</Button>
                    </Card>
                </div>
                <div className="card">
                    <Card title="图形按钮" className="card-wrap">
                        <Button icon={<PlusOutlined />}>创建</Button>
                        <Button icon={<EditOutlined />}>编辑</Button>
                        <Button icon={<DeleteOutlined />}>删除</Button>
                        <Button shape="circle" icon={<SearchOutlined />}></Button>
                        <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
                        <Button type="primary" icon={<DownloadOutlined />}>下载</Button>
                    </Card>
                </div>
                <div className="card">
                    <Card title="Loading按钮" className="card-wrap">
                        <Button type="primary" loading={true}>确定</Button>
                        <Button type="primary" shape="circle" loading={true}></Button>
                        <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>点击加载</Button>
                        <Button shape="circle" loading={true}></Button>
                    </Card>
                </div>
                <div className="card">
                    <Card title="按钮组">
                        <Button.Group>
                            <Button type="primary" icon={<LeftOutlined />}>返回</Button>
                            <Button type="primary" icon={<RightOutlined />}>前进</Button>
                        </Button.Group>
                    </Card>
                </div>
                <div className="card">
                    <Card title="按钮尺寸" className="card-wrap"> 
                        <Radio.Group value={this.state.size} onChange={this.handleChange}>
                            <Radio value="small">小</Radio>
                            <Radio value="default">中</Radio>
                            <Radio value="large">大</Radio>
                        </Radio.Group>
                        <Button type="primary" size={this.state.size}>按钮1</Button>
                        <Button size={this.state.size}>按钮2</Button>
                        <Button type="dashed" size={this.state.size}>按钮3</Button>
                        <Button type="danger" size={this.state.size}>按钮4</Button>
                    </Card>
                </div>
            </div>
        );
    }
}