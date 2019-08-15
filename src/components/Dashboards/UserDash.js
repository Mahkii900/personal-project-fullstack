import React, {Component} from 'react'
import User from '../Users/User'
import {Link} from 'react-router-dom'

export default class UserDash extends Component {
    render() {
        return (
            <div>
                UserDash!
                <User/>
                <div>
                    <Link to={'/devicedash'}>
                        <button>View devices</button>
                    </Link>
                    <Link to={'/wizard/users'}>
                        <button>Add new user</button>
                    </Link>
                    <Link to={'/dashboard'}>
                        <button>View rooms</button>
                    </Link>
                </div>
            </div>
        )
    }
}