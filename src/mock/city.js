import Mock from 'mockjs'

// 城市管理列表API
Mock.mock(/open_city/, 'get', {
    "code":0,
    "msg":"成功或失败提示信息",
    "result":{
        "page":1,
        "page_size":10,
        "total":100,
        "page_count":10,
        "item_list|10":[{
            "id|+1":1,
            "name":"@city",
            "mode|1-2":1,
            "op_mode|1-2":1,
            "franchisee_id":77,
            "franchisee_name":"松果自营",
            "city_admins|1-2":[{
                "user_name":"@cname",
                "user_id|+1":10001
            }],
            "open_time":"@datetime",
            "sys_user_name":"@cname",
            "update_time":1520476737000
        }]
    }
})

// 开通城市API
Mock.mock(/city\/open/, 'get', {
    "code":0,
    "result":"开通成功!"
});
