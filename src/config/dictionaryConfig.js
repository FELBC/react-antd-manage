// 数据字典
import React from 'react';
import { Badge } from 'antd';

const State = {
    '1':'咸鱼一条',
    '2':'风华浪子',
    '3':'北大才子',
    '4':'百度FE',
    '5':'创业者'
};
const Interest = {
    '1':'游泳',
    '2':'打篮球',
    '3':'踢足球',
    '4':'跑步',
    '5':'爬山',
    '6':'骑行',
    '7':'桌球',
    '8':'麦霸'
};
//状态徽标
const BadgeInterest = {
    '1':<Badge status="success" text="成功" />,
    '2':<Badge status="error" text="报错" />,
    '3':<Badge status="default" text="正常" />,
    '4':<Badge status="processing" text="进行中" />,
    '5':<Badge status="warning" text="警告" />
};

export { State, Interest, BadgeInterest };