import React from 'react';
import { Link } from 'react-router-dom';

export default class Main extends React.Component{
    render(){
        return(
             <div>
                This is main page.
                <Link to="/Main/About">嵌套路由</Link>
                <hr />
                {this.props.children}
            </div>
        );
    }
}