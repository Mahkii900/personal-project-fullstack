import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

export default class RoomDash extends Component {
    state = {
        rooms: []
    }

    componentDidMount() {
        axios.get('/rooms').then(res => {
            this.setState({rooms: res.data})
        })
        .catch(err => alert('Unable to retrieve room data'))
    }

    render() {
        let rooms = this.state.rooms.map((ele) => {
            return <div key={ele.room_id}>
                <div>
                    {ele.name}
                </div>
                <div>
                    {ele.username}
                </div>
            </div>
        })
        return (
            <div>
                <div>
                    <Link to={'/dashboard'}>
                        <button>Back</button>
                    </Link>
                </div>
                <div>
                    <button>Assign users to rooms</button>
                </div>
                {rooms}
            </div>
        )
    }
}