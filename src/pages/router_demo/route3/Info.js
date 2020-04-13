import React from 'react';

export default class Info extends React.Component{
    render(){
        // console.log(this.props.match);
        return(
             <div>
                这里是设置动态路由功能.
                动态路由的值是：{this.props.match.params.MainId}
            </div>
        );
    }
}