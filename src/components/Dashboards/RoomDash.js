import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

export default class RoomDash extends Component {
    state = {
        rooms: [],
        showAssignment: false,
        id: 0,
        users: [],
        user_id: 0
    }

    getAllRooms() {
        axios.get('/rooms').then(res => {
            this.setState({rooms: res.data})
        })
        .catch(err => alert('Unable to retrieve room data'))
    }

    getAllUsers() {
        axios.get('/users').then(res => {
            this.setState({users: res.data})
        })
    }
    
    componentDidMount() {
        this.getAllRooms()
        this.getAllUsers()
    }

    assignRoom(room_id, user_id) {
        axios.post('/rooms/users/assign', {room_id: room_id, user_id: user_id}).then(res => {
            this.setState({showAssignment: false, id: 0})
            this.getAllRooms()
        })
        .catch(err => alert('Unable to successfully assign user to room'))
    }

    render() {
        let users = this.state.users.map((ele, index) => {
            return <option key={index} value={ele.user_id}>{ele.first_name} {ele.last_name}</option>
        })

        let rooms = this.state.rooms.map((ele) => {
            return <div key={ele.room_id}>
                <div>
                    {ele.name}
                </div>
                <div>
                    {ele.first_name} {ele.last_name}
                </div>
                {this.state.showAssignment && ele.room_id === this.state.id ? 
                (
                    <div>
                        <div>
                            <select onChange={(e) => this.setState({user_id: e.target.value})}>
                                {users}
                            </select>
                        </div>
                        <div>
                            <button onClick={() => this.assignRoom(ele.room_id, this.state.user_id)}>Confirm</button>
                        </div>
                    </div>
                )
                :(
                    <div>
                        <button onClick={() => this.setState({showAssignment: true, id: ele.room_id})}>Assign user to this room</button>
                    </div>
                )}
            </div>
        })
        return (
            <div>
                <div>
                    <Link to={'/dashboard'}>
                        <button>Back</button>
                    </Link>
                </div>
                {rooms}
            </div>
        )
    }
}