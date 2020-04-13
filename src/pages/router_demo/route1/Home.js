import React from 'react';
import { HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Main from './Main';
import About from './About';
import Topic from './Topic';

export default class Home extends React.Component{
    render(){
        return(
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/About">About</Link>
                        </li>
                        <li>
                            <Link to="/Topic">Topics</Link>
                        </li>
                    </ul>
                    <hr />
                    <Switch>
                        <Route exact={true} path="/" component={Main}></Route>
                        <Route path="/About" component={About}></Route>
                        <Route path="/Topic" component={Topic}></Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}