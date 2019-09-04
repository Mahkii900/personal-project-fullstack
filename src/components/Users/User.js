import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class User extends Component {
    render() {
        return (
            <div className='user-info-container'>
            <Link to={`/users/${this.props.id}`} className='user-info-link'>
                <div className='user-info-details-container'>                   
                   <div>{this.props.username}</div>
                   <div>{this.props.firstName} {this.props.lastName}</div>
                   <div className='email'>{this.props.email}</div>
                   <div>{this.props.phone}</div>
                </div>
            </Link>
            </div>
        )
    }
}