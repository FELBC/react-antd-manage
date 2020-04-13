import JsonP from 'jsonp';

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
}