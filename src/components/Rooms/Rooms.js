import React, {Component} from 'react'
import Room from './Room'
import axios from 'axios'

export default class Rooms extends Component {
    state = {
        rooms: [],
        showRoom: false,
        room: {}
    }

    getUserRooms() {
        axios.get('/users/rooms').then(res => {
            this.setState({rooms: res.data})
        })
    }

    componentDidMount() {
        this.getUserRooms()
    }

    displayRoomInfo(room) {
        this.setState({showRoom: true, room: room})
    }

    render() {
        let rooms = this.state.rooms.map((ele) => {
            return <button onClick={() => this.displayRoomInfo(ele)} key={ele.room_id}>{ele.name}</button>
        })
        return (
            <div>
                <div>
                    {rooms}
                </div>
                <div>
                    {this.state.showRoom ? <Room room={this.state.room}/>:<div>Select a room</div>}
                </div>
            </div>
        )
    }
}