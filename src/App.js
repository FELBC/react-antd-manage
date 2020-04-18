/**
 * 可以嵌套任意组件，项目入口
 * 登录/主页面/订单详情多入口
*/

import React, {Component} from 'react';

class App extends Component{
  render(){
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
