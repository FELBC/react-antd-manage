import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component{
    render(){
        return(
            <div>
                <ul>
                    <li>
                        <Link to="/Main">Home2</Link>
                    </li>
                    <li>
                        <Link to="/About">About2</Link>
                    </li>
                    <li>
                        <Link to="/Topic">Topics2</Link>
                    </li>
                </ul>
                <hr />
                {this.props.children}
            </div>
        );
    }
}