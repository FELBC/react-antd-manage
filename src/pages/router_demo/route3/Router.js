import React from 'react';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import Main from './Main';
import About from './../route1/About';
import Info from './Info';
import Topic from './../route1/Topic';
import Home from './Home';
import NoMatch from './NoMatch';
import Abc from './Abc';

export default class IRouter extends React.Component{
    render(){
        return(
            <Router>
                <Home>
                    {/*Switch只加载第一个匹配到的组件*/}
                    <Switch>
                        <Route path="/Main" render={() => 
                            <Main>
                                {/*嵌套路由*/}
                                <Route path="/Main/:MainId" component={Info}></Route>
                            </Main>
                        }></Route>
                        <Route exact={true}  path="/About" component={About}></Route>
                        {/*精准匹配*/}
                        <Route exact={true} path="/About/Abc" component={Abc}></Route>
                        <Route path="/Topic" component={Topic}></Route>
                        {/*如果没有匹配到就访问404页面*/}
                        <Route component={NoMatch}></Route>
                    </Switch>
                </Home>
            </Router>
        );
    }
}