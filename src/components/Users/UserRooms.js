import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class UserRooms extends Component {
    state = {
        rooms: []
    }

    getRooms() {
        let id = 1
        axios.get(`/rooms/users/${id}`).then(res => {
            this.setState({rooms: res.data})
        })
        .catch(err => alert('Could not find rooms for this user'))
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <div>
                    <Link to={'/userdash'}>
                        <button>Back</button>
                    </Link>
                </div>
                UserRooms
            </div>
        )
    }
}