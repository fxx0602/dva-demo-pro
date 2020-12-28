import React from 'react';
import { Route, Link } from 'dva/router';

export default class Topics extends React.Component{
    render(){
        return (
            <div>
                <h1>this is Topics page</h1>
                <hr/>
                <div>
                    
                    <li>
                        <Link to={`${this.props.match.path}/topic1`}>topic1</Link>
                    </li>
                    <li>
                        <Link to={`${this.props.match.path}/topic2`}>topic2</Link>
                    </li>
                    <li>
                        <Link to={`${this.props.match.path}/topic3`}>topic3</Link>
                    </li>
                </div>
                <hr/>
                <div>
                    <Route path={`${this.props.match.url}/:topicName`} component={Topic}/>
                </div>
            </div>
        )
    }
}

class Topic extends React.Component{
    constructor(props){
        super(props);
        console.log(props)
    }
    render(){
        return <p>here is {this.props.match.params.topicName}</p>
    }
}

class Topic1 extends React.Component{
    constructor(props){
        super(props);
        console.log(props)
    }
    render(){
        return <p>here is topic1</p>
    }
}
class Topic2 extends React.Component{
    render(){
        return <p>here is topic2</p>
    }
}
class Topic3 extends React.Component{
    render(){
        return <p>here is topic3</p>
    }
}