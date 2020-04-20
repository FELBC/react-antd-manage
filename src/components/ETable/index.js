import React from 'react';
import Utils from './../../utils/utils';
import { Table } from 'antd';
import './index.less';

export default class ETable extends React.Component{
    
    state = {}

    // 处理行点击事件
    onRowClick = (record,index) => {
        let rowSelectionType = this.props.rowSelectionType;
        let selectedRowKeys = this.props.selectedRowKeys;
        let selectedIds = this.props.selectedIds;
        let selectedItem = this.props.selectedItem || [];
        if(rowSelectionType === 'checkbox'){
            if(selectedIds){
                if(selectedIds.indexOf(record.id) === -1){
                    selectedIds.push(record.id);
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                }
                else{
                    selectedIds.splice(index,1);
                    selectedRowKeys.splice(index,1);
                    selectedItem.splice();
                }
            }else{
                selectedIds = [record.id];
                selectedRowKeys = [index];
                selectedItem = [record];
            }
            this.props.updateSelectedItem(selectedRowKeys,selectedItem,selectedIds);
        }else{
            if(selectedRowKeys && selectedRowKeys[0] === index){return;}
            this.props.updateSelectedItem([index],record||{});
        }
    };

    // 选择框变更
    onSelectChange = (selectedRowKeys,selectedRows) => {
        let rowSelectionType = this.props.rowSelectionType;
        let selectedIds = [];
        if(rowSelectionType === 'checkbox'){
            selectedRows.map((item) => {
                selectedIds.push(item.id);
            });
            this.props.updateSelectedItem(selectedRowKeys,selectedRows,selectedIds);
        }else{
            this.props.updateSelectedItem(selectedRowKeys,selectedRows[0]);
        }
    };

    // 全选
    onSelectAll = (selected,selectedRows,changeRows) => {
        let selectedIds = [];
        let selectKey = [];
        selectedRows.forEach((item,index) => {
            selectedIds.push(item.id);
            selectKey.push(index);
        });
        this.props.updateSelectedItem(selectKey,selectedRows,selectedIds);
    };

    // 单选/复选/不选，表格配置项，渲染表格
    getOptions = () => {
        let p = this.props;
        const name_list = {
            "订单编号":170,
            "车辆编号":80,
            "手机号码":96,
            "用户姓名":70,
            "密码":70,
            "运维区域":300,
            "车型":42,
            "故障编号":76,
            "代理商编码":97,
            "角色ID":64
        };
        if(p.columns && p.columns.length > 0){
            p.columns.forEach((item) => {
                // 开始/结束 时间
                if(!item.title){
                    return
                }
                if(!item.width){
                    if(item.title.indexOf("时间") > -1 && item.title.indexOf("持续时间") < 0){
                        item.width = 132;
                    }else if(item.title.indexOf("图片") > -1){
                        item.width = 86;
                    }else if(item.title.indexOf("权限") > -1 || item.title.indexOf("负责城市") > -1){
                        item.width = '40%';
                        item.className = "text-left";
                    }else{
                        if(name_list[item.title]){
                            item.width = name_list[item.title];
                        }
                    }
                }
                item.bordered = true;
            });
        }
        const { selectedRowKeys } = this.props;
        let rowSelectionType = this.props.rowSelectionType; // 选择类型
        const rowSelection = {
            type:rowSelectionType,
            selectedRowKeys,
            onChange:this.onSelectChange,
            onSelect:(record,selected,selectedRows) => {
                console.log('...');
            },
            onSelectAll:this.onSelectAll
        };        
        return (
            <Table 
                className="card-wrap page-table"
                bordered 
                {...this.props}
                rowSelection={rowSelectionType?rowSelection:null}
                onRow={(record,index) => ({
                    onClick:()=>{
                        if(!rowSelectionType){
                            return;
                        }
                        this.onRowClick(record,index)
                    }
                })}
            />
        )
    }

    render = () =>{
        return(
            <div>
                {this.getOptions()}
            </div>
        )
    }
}