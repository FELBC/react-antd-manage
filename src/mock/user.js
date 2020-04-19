import Mock from 'mockjs'

// 用户列表API
Mock.mock(/user\/list/, 'get', {
    "code":0,
    "msg":"成功或失败提示信息",
    "result":{
        "page|1-9":1,
        "page_size":10,
        "total":30,
        "item_list|10":[{
            "id|+1":1,
            "username":"@cname",
            "sex|1-2":1,
            "state|1-5":1,
            "interest|1-8":1,
            "isMarried|0-1":1,
            "birthday":"2000-01-01",
            "address":"北京市海淀区",
            "time":"09:00:00"
        }]
    }
})