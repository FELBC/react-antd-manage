import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './admin';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import Notification from './pages/ui/notification';
import Messages from './pages/ui/messages';
import Tabs from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousel from './pages/ui/carousel';
import FormLogin from './pages/form/login';
import FormDemo from './pages/form/formDemo';
import LoginDemo from './pages/form/loginDemo';
import RegDemo from './pages/form/regDemo';
import NoMatch from './pages/nomatch';
import Home from './pages/home';
import BasicTable from './pages/table/basicTable';
import HighTable from './pages/table/highTable';
import City from './pages/city/index';
import Order from './pages/order/index';
import Common from './common';
import OrderDetail from './pages/order/detail';

export default class IRouter extends React.Component{

    render(){
        return (
            <HashRouter>
                <App>
                    {/*登录/主页面/订单详情多入口*/}
                    <Route path="/login" component={Login} />
                    <Route path="/admin" render={() => 
                        <Admin>
                            <Switch>
                                <Route path="/admin/home" component={Home} />
                                <Route path="/admin/ui/buttons" component={Buttons} />
                                <Route path="/admin/ui/modals" component={Modals} />
                                <Route path="/admin/ui/loadings" component={Loadings} />
                                <Route path="/admin/ui/notification" component={Notification} />
                                <Route path="/admin/ui/messages" component={Messages} />
                                <Route path="/admin/ui/tabs" component={Tabs} />
                                <Route path="/admin/ui/gallery" component={Gallery} />
                                <Route path="/admin/ui/carousel" component={Carousel} />
                                <Route path="/admin/form/login" component={FormLogin} />
                                <Route path="/admin/form/formDemo" component={FormDemo} />
                                <Route path="/admin/form/loginDemo" component={LoginDemo} />
                                <Route path="/admin/form/regDemo" component={RegDemo} />
                                <Route path="/admin/table/basic" component={BasicTable} />
                                <Route path="/admin/table/high" component={HighTable} />
                                <Route path="/admin/city" component={City} />
                                <Route path="/admin/order" component={Order} />
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    } />
                    <Route path="/common" render={()=>
                        <Common>
                            {/* 嵌套各种详情 */}
                            <Route pat="/common/order/detail/:orderId" component={OrderDetail} />
                        </Common>
                    }
                    />
                </App>
            </HashRouter>
        );
    }
}