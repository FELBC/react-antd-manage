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
            "menus": ["/admin/home", "/admin/ui/buttons", "/admin/ui/modals", "/admin/ui/loadings", "/admin/ui/notification", "/admin/ui/messages", "/admin/ui/tabs", "/admin/ui/gallery", "/admin/ui/carousel", "/admin/ui"]
        }]
    }
})

// 角色创建API
Mock.mock(/role\/create/, 'get', {
    "code":0,
    "msg":"成功或失败提示信息"
})

// 设置权限API
Mock.mock(/permission\/edit/, 'get', {
    "code":0,
    "msg":"成功或失败提示信息"
})

// 角色用户列表API
Mock.mock(/role\/user_list/, 'get', {
    "code":0,
    "msg":"成功或失败提示信息",
    "result|20":[{
        "status|0-1": 0,
        "user_id|+1": 1,
        "user_name": "@cname"
    }]
})

// 用户角色设置提交API
Mock.mock(/role\/user_role_edit/, 'get', {
    "code":0,
    "msg":"成功或失败提示信息"
})