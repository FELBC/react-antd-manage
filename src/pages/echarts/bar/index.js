import React from 'react';
import {
    Card
} from 'antd';
import echartTheme from './../echartTheme';
// import echarts from 'echarts'; // 整个导入会导致项目变得过于庞大
import echarts from 'echarts/lib/echarts'; // 按需加载
import 'echarts/lib/chart/bar'; // 导入柱形图
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

export default class Bar extends React.Component{

    UNSAFE_componentWillMount(){
        echarts.registerTheme('macarons',echartTheme);
    }

    getOption = () => {
        let option = {
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'bar',
                    data:[1000,2000,1500,3000,2000,1200,800]
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
            legend:{
                data:['OFO','膜拜','小蓝']
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'OFO',
                    type:'bar',
                    data:[2000,3000,1600,3200,1000,2200,1800]
                },
                {
                    name:'膜拜',
                    type:'bar',
                    data:[12000,2000,1500,3000,2000,1200,800]
                },
                {
                    name:'小蓝',
                    type:'bar',
                    data:[2000,3000,1200,3000,4500,2200,5300]
                }
            ]
        };
        return option;
    }

    render(){
        return(
            <div style={{width:'100%'}}>
                <Card title="柱形图表之一">
                    <ReactEcharts option={this.getOption()} theme="macarons" style={{height:500}} />
                </Card>
                <Card title="柱形图表之二" style={{marginTop:10}}>
                <ReactEcharts option={this.getOption2()} theme="macarons" style={{height:500}} />
                </Card>
            </div>
        );
    }

}