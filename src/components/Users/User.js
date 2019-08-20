import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class User extends Component {
    render() {
        return (
            <Link to={`/users/${this.props.id}`}>
                <div>
                   <div>{this.props.username}</div>
                   <div>{this.props.firstName}</div>
                   <div>{this.props.lastName}</div>
                   <div>{this.props.email}</div>
                   <div>{this.props.phone}</div>
                </div>
            </Link>
        )
    }
}