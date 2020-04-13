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
                    <li>
                        <Link to="/NoMatch1">NoMatch1</Link>
                    </li>
                    <li>
                        <Link to="/NoMatch2">NoMatch2</Link>
                    </li>
                    <li>
                        <Link to="/About/Abc">Abc</Link>
                    </li>
                </ul>
                <hr />
                {this.props.children}
            </div>
        );
    }
}