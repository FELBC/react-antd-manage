import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';

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
            let baseApi = "https://easy-mock.com/mock/5e96cf2ed14de26af733ce8f/api/"; // easy-mock接口模拟baseApi
            // let baseApi = "/api/"; // 本地node服务路径public/api
            axios({
                url:options.url,
                method:"get",
                baseURL:baseApi,
                timeout:5000,
                params:(options.data && options.data.params) || ''
            }).then((response)=>{
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
}