import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class UserRooms extends Component {
    state = {
        rooms: []
    }

    getRooms() {
        axios.get(`/rooms/users/${this.props.match.params.user_id}`).then(res => {
            this.setState({rooms: res.data})
        })
        .catch(err => alert('Could not find rooms for this user'))
    }

    componentDidMount() {
        this.getRooms()
    }

    render() {
        let rooms = this.state.rooms.map((ele, index) => {
            return <div key={index}>
                <div>
                    {ele.name}
                </div>
                <div>
                    <Link to={`/rooms/${ele.room_id}`}>
                        <button>Go to this room</button>
                    </Link>
                </div>
            </div>
        })
        return (
            <div>
                <div>
                    <Link to={'/userdash'}>
                        <button>Back</button>
                    </Link>
                </div>
                {rooms}
            </div>
        )
    }
}