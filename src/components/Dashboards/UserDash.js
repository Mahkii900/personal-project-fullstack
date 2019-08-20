import React, {Component} from 'react'
import User from '../Users/User'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class UserDash extends Component {
    state = {
        users: []
    }

    componentDidMount() {
        axios.get('/users').then(res => {
            this.setState({users: res.data})
        })
    }

    render() {
        const users = this.state.users.map((ele, index) => {
            return <div key={index}>
                    <User
                        id={ele.user_id}
                        username={ele.username}
                        email={ele.email}
                        phone={ele.phone}
                        firstName={ele.first_name}
                        lastName={ele.last_name}
                    />
                </div>
        })
        return (
            <div>
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
                {users}
            </div>
        )
    }
}