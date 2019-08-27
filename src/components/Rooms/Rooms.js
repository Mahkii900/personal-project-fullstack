import React, {Component} from 'react'
import Room from './Room'
import axios from 'axios'

export default class Rooms extends Component {
    state = {
        rooms: [],
        showRoom: false,
        room: {},
        roomsAvailable: true,
        message: ''
    }

    getUserRooms() {
        axios.get('/users/rooms').then(res => {
            if (res.data === 'None available') {
                return this.setState({roomsAvailable: false, message: res.data})
            }
            this.setState({rooms: res.data, roomsAvailable: true, message: ''})
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
            <div className='room-main-content'>
                <div className='room-left-content'>
                    {this.state.message}
                    {rooms}
                </div>
                <div className='room-right-content'>
                    {this.state.showRoom ? <Room room={this.state.room}/>: this.state.roomsAvailable ? <div className='room-select-display'>Please select a room</div> : null}
                </div>
            </div>
        )
    }
}