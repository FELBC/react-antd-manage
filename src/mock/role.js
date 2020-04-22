import Mock from 'mockjs'

// 角色列表API
Mock.mock(/role\/list/, 'get', {
    "code":0,
    "msg":"成功或失败提示信息",
    "result":{
        "page|1-9":1,
        "page_size":10,
        "total":100,
        "page_count":10,
        "item_list|10":[{
            "id|+1": 1,
            "role_name": /(管理人员)|(客服专员)|(财务专员)|(市场专员)|(人力专员)|(研发)|(测试)|(系统管理员)/,
            "status|0-1": 1,
            "authorize_user_name": "@cname",
            "authorize_time": 1521270166000,
            "create_time": 1499305790000,
            "menus": ["/home", "/ui/buttons", "/ui/modals", "/ui/loadings", "/ui/notification", "/ui/messages", "/ui/tabs", "/ui/gallery", "/ui/carousel", "/ui"]
        }]
    }
})

// 角色创建API
Mock.mock(/role\/create/, 'get', {
    "code":0,
    "msg":"成功或失败提示信息"
})