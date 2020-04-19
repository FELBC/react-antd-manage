import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
import Utils from './../utils/utils';

export default class Axios{

    static jsonp(options){
        // Promise封装，返回jsonp调用
        return new Promise((resolve,reject) => {
            JsonP(options.url,{
                param:'callback'
            },function(err,response){
                // 打断点调试
                // debugger;
                if(response.status === 'success'){
                    resolve(response);
                }else{
                    reject(response.message);
                }
            });
        })
    }

    static ajax(options){
        return new Promise((resolve,reject) => {
            let loading;
            if(options.data && options.data.isShowLoading !== false){
                loading = document.getElementById('ajaxLoading');
                loading.style.display = 'block';
            }
            // isMock判断，走不同地址
            let baseApi = '';
            if(options.data.isMock){
                baseApi = "https://easy-mock.com/mock/5e96cf2ed14de26af733ce8f/api/"; // easy-mock接口模拟baseApi
                baseApi = "/api/"; // 本地node服务路径public/api
            }else{
                baseApi = "/api/"; // 真实请求地址
            }
            axios({
                url:options.url,
                method:"get",
                baseURL:baseApi,
                timeout:5000,
                params:(options.data && options.data.params) || ''
            }).then((response)=>{
                if(options.data && options.data.isShowLoading !== false){
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if(response.status === 200){
                    // 业务code 0：成功
                    if(response.data.code === 0){
                        resolve(response.data);
                    }else{
                        Modal.info({
                            title:'提示',
                            content:response.data.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        });
    }

    // 列表请求统一封装(存在大量业务代码复用)
    static  requestList(_this,url,params,isMock){
        var data = {
            params:params,
            isMock
        }
        this.ajax({
            url,
            data,
        }).then((data)=>{
            if(data && data.result){
                let list = data.result.item_list.map((item,index)=>{
                    item.key = index;
                    return item;
                });
                _this.setState({
                    list,
                    pagination:Utils.pagination(data,(current)=>{
                        _this.params.page = current;
                        _this.requestList();
                    })
                });
            }
        });
    }
}