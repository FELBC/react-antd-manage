import React from 'react';
import { Card, Tabs, message } from 'antd';
import { 
    AppleOutlined,
    AndroidOutlined
} from '@ant-design/icons'
import './ui.less';

const { TabPane } = Tabs;

export default class Tab extends React.Component{
    
    newTabIndex = 0;

    UNSAFE_componentWillMount(){
        const panes = [
            {
                title:'Tab 1',
                content:'Tab 1',
                key:'1'
            },
            {
                title:'Tab 2',
                content:'Tab 2',
                key:'2'
            },
            {
                title:'Tab 3',
                content:'Tab 3',
                key:'3'
            }
        ];
        this.setState({
            activeKey:panes[0].key,
            panes
        });
    };

    handleCallback = (key) => {
        message.info("选择了"+ key)
    };

    onChange = (activeKey) => {
        this.setState({
            activeKey
        })
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };
    
    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    };
    
    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    };

    render(){
        return(
            <div className="ui-wrap">
                <div className="card">
                    <Card title="Tab页签" className="card-wrap"> 
                        <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                            <TabPane tab="Tab 1" key="React">React</TabPane>
                            <TabPane tab="Tab 2" key="Vue" disabled>Vue</TabPane>
                            <TabPane tab="Tab 3" key="Angular">Angular</TabPane>
                        </Tabs>
                    </Card>
                </div>
                <div className="card">
                    <Card title="Tab带icon的页签" className="card-wrap"> 
                        <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                            <TabPane tab={<span><AppleOutlined />Tab 1</span>} key="React">React</TabPane>
                            <TabPane tab={<span><AndroidOutlined />Tab 2</span>} key="Vue">Vue</TabPane>
                        </Tabs>
                    </Card>
                </div>
                <div className="card">
                    <Card title="新增和关闭页签" className="card-wrap">
                        <Tabs 
                            onChange={this.onChange}
                            activeKey={this.state.activeKey}
                            type="editable-card"
                            onEdit={this.onEdit}
                        >
                            {
                                this.state.panes.map((panel) => {
                                    return (
                                        <TabPane 
                                            tab={panel.title} 
                                            key={panel.key}>
                                            {panel.content}
                                        </TabPane>
                                    );
                                })
                            }
                        </Tabs>
                    </Card>
                </div>
            </div>
        );
    }
}