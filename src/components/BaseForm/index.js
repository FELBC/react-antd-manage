import React from 'react';
import {
    Button,
    Form,
    Select,
    DatePicker,
    Input
} from 'antd';
import Utils from './../../utils/utils';

const { RangePicker } = DatePicker;

export default class FilterForm extends React.Component{

    formRef = React.createRef();

    // 查询
    handleFilterSubmit = () => {
        let fieldsValue = this.formRef.current.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    // 重置
    onReset = () => {
        this.formRef.current.resetFields();
    }

    // 初始化表单列表
    initFormList = () => {
        const formList = this.props.formList;
        const formItemList = [];
        if(formList && formList.length>0){
            formList.forEach((item) => {
                if(item.type === 'DATERANGE'){
                    const DATERANGE = 
                        <Form.Item 
                            key={item.name}
                            name={item.name}
                            label={item.label}
                            rules={[{ required: item.required }]}
                            style={{width:item.width}}  
                        >
                            <RangePicker  
                                format={item.format}
                                placeholder={item.placeholder} 
                            />
                        </Form.Item>
                    formItemList.push(DATERANGE);
                }else if(item.type === 'INPUT'){
                    const INPUT = 
                        <Form.Item 
                            key={item.name}
                            name={item.name}
                            label={item.label}
                            rules={[{ required: item.required }]} 
                            style={{width:item.width}}  
                        >
                            <Input type="text" placeholder={item.placeholder} />
                        </Form.Item>
                    formItemList.push(INPUT);
                }else if(item.type === 'SELECT'){
                    const SELECT = 
                        <Form.Item 
                            key={item.name}
                            name={item.name}
                            label={item.label}
                            rules={[{ required: item.required }]} 
                        >
                            <Select 
                                style={{width:item.width}}
                                allowClear>
                                {Utils.getOptionList(item.list)}
                            </Select>
                        </Form.Item>
                    formItemList.push(SELECT);
                }else if(item.type === 'DATE'){
                    const DATE = 
                        <Form.Item 
                            key={item.name}
                            name={item.name}
                            label={item.label}
                            rules={[{ required: item.required }]}
                            style={{width:item.width}}  
                        >
                            <DatePicker  
                                format={item.format}
                                placeholder={item.placeholder} 
                            />
                        </Form.Item>
                    formItemList.push(DATE);
                }
            });
        }
        return formItemList;
    }

    render(){
        return(
            <Form 
                layout="inline"
                ref={this.formRef} 
                name="control-ref" 
                onFinish={this.onFinish} 
            >
                {this.initFormList()}
                <Form.Item>
                    <Button type="primary" style={{margin:'0 20px'}} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.onReset}>重置</Button>
                </Form.Item>
            </Form>
        );
    }
}