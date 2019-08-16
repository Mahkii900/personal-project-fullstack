import React, {Component} from 'react'

export default class User extends Component {
    render() {
        return (
            <div>
               <div>{this.props.username}</div>
               <div>{this.props.email}</div>
               <div>{this.props.phone}</div>
            </div>
        )
    }
}