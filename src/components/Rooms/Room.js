import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class Room extends Component {
    state = {
        devices: []
    }

    getDevices() {
        axios.get(`/rooms/devices/${this.props.room.room_id}`).then(res => {
            this.setState({devices: res.data})
        })
    }

    componentDidMount() {
        this.getDevices()
        this.setState({room_id: this.props.room.room_id})
    }

    render() {
        //------Maybe add recent ticket dates to devices--------
        let devices = this.state.devices.map((ele) => <div key={ele.device_id}>{ele.name} {ele.type}</div>)
        return (
            <div>
                <div>{this.props.room.name}</div>
                <div>
                    <Link to={`/rooms/${this.props.room.room_id}`}>
                        <button>Go to {this.props.room.name} view</button>
                    </Link>
                </div>
                <div>{devices}</div>
            </div>
        )
    }

    componentDidUpdate() {
        if (this.state.room_id !== this.props.room.room_id) {
            this.getDevices()
            this.setState({room_id: this.props.room.room_id})
        }
    }
}