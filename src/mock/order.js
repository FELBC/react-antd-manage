import Mock from 'mockjs'

// 订单列表API
const OrderList = Mock.mock(/api\/order\/list/, 'get', {
    "code":0,
    "msg":"成功或失败提示信息",
    "result":{
        "page|1-9":1,
        "page_size":10,
        "total":100,
        "page_count":10,
        "item_list|10":[{
            "id":2959165,
            "order_sn":/T180[0-9]{6}/,
            "bike_sn":"800116090",
            "user_id":908352,
            "user_name":"@cname",
            "mobile":/1[0-9]{10}/,
            "distance":2000,
            "total_time":4000,
            "status|1-2":1,
            "start_time":"@datetime",
            "end_time":"@datetime",
            "total_fee":1000,
            "user_pay":300
        }]
    }
})

export default {
    OrderList
};