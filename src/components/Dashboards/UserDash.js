import React, {Component} from 'react'
import User from '../Users/User'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class UserDash extends Component {
    state = {
        users: []
    }

    getUsers() {
        axios.get('/users').then(res => {
            this.setState({users: res.data})
        })
    }

    componentDidMount() {
        this.getUsers()
    }

    deleteUser(id) {
        axios.delete(`/users/${id}`).catch(err => alert('Unable to delete user'))
        this.getUsers()
    }

    render() {
        const users = this.state.users.map((ele, index) => {
            return <div key={index} className='user-info'>
                    <div className='user-info-cont'>
                        <User
                            id={ele.user_id}
                            username={ele.username}
                            email={ele.email}
                            phone={ele.phone}
                            firstName={ele.first_name}
                            lastName={ele.last_name}
                        />
                    </div>
                    <div className='user-info-button'>
                        <button onClick={() => this.deleteUser(ele.user_id)}>Delete this user</button>
                    </div>
                </div>
        })
        return (
            <div className='userdash-main-content'>
                <div className='top-bar'>
                    <div className="admin-bar">
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
                <div className='user-dash-display'>
                    {users}
                </div>
            </div>
        )
    }
}