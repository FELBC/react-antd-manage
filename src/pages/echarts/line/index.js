import React from 'react';
import {
    Card
} from 'antd';
import echartTheme from './../echartTheme';
// import echarts from 'echarts'; // 整个导入会导致项目变得过于庞大
import echarts from 'echarts/lib/echarts'; // 按需加载
import 'echarts/lib/chart/line'; // 导入折线图
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

export default class Line extends React.Component{

    UNSAFE_componentWillMount(){
        echarts.registerTheme('macarons',echartTheme);
    }

    getOption = () => {
        let option = {
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis',
            },
            xAxis:{
                data:[
                    '周一','周二','周三','周四','周五','周六','周日'
                ]
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'line',
                    data:[1000,2000,2500,2100,1500,1800,3100]
                }
            ]
        };
        return option;
    }

    getOption2 = () => {
        let option = {
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis',
            },
            legend:{
                data:['OFO订单量','摩拜订单量']
            },
            xAxis:{
                data:[
                    '周一','周二','周三','周四','周五','周六','周日'
                ]
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'OFO订单量',
                    type:'line',
                    data:[1200,3000,4500,3100,2500,1100,2100]
                },
                {
                    name:'摩拜订单量',
                    type:'line',
                    data:[1000,2000,2500,2100,1500,1800,3100]
                }
            ]
        };
        return option;
    }

    getOption3 = () => {
        let option = {
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis',
            },
            xAxis:{
                type:'category',
                boundaryGap:false,
                data:[
                    '周一','周二','周三','周四','周五','周六','周日'
                ]
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'line',
                    data:[1000,2000,2500,2100,1500,1800,3100],
                    areaStyle:{}
                }
            ]
        };
        return option;
    }

    render(){
        return(
            <div style={{width:'100%'}}>
                <Card title="折线图表之一">
                    <ReactEcharts option={this.getOption()} theme="macarons" style={{height:500}} />
                </Card>
                <Card title="折线表之二" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()} theme="macarons" style={{height:500}} />
                </Card>
                <Card title="折现表之三" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption3()} theme="macarons" style={{height:500}} />
                </Card>
            </div>
        );
    }

}