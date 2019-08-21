import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class Room extends Component {
    state = {
        devices: [],
        showDevices: false,
        device_id: 0,
        unAssigned: []
    }

    getDevices() {
        axios.get(`/rooms/devices/${this.props.room.room_id}`).then(res => {
            this.setState({devices: res.data})
        })
    }

    getUnassignedDevices() {
        axios.get('/rooms/unassigned/devices').then(res => {
            this.setState({unAssigned: res.data})
        })
    }

    componentDidMount() {
        this.getDevices()
        this.getUnassignedDevices()
        this.setState({room_id: this.props.room.room_id})
    }

    assignDeviceToRoom = (room_id) => {
        if (!this.state.device_id) {
            return alert('please select a device...')
        }
        axios.post(`/rooms/devices/${room_id}`, {device: this.state.device_id}).then(res => {
            this.setState({showDevices: false})
            this.getUnassignedDevices()
        })
        .catch(err => alert('Unable to assign device to room'))
    }

    render() {
        //------Maybe add recent ticket dates to devices--------
        let devices = this.state.devices.map((ele) => <div key={ele.device_id}>{ele.name} {ele.type}</div>)
        let unassigned = this.state.unAssigned.map((ele) => <option key={ele.device_id} value={ele.device_id}>{ele.name} {ele.type}</option>)
        return (
            <div>
                <div>{this.props.room.name}</div>
                <div>
                    <Link to={`/rooms/${this.props.room.room_id}`}>
                        <button>Go to {this.props.room.name} view</button>
                    </Link>
                </div>
                <div>{devices}</div>
                <div>
                    {this.state.showDevices ? (
                        <div>
                            <select onChange={(e) => this.setState({device_id: e.target.value})}>
                                <option value={0}>--</option>
                                {unassigned}
                            </select>
                            <button onClick={() => this.assignDeviceToRoom(this.props.room.room_id)}>Add device</button>
                        </div>
                    ):
                    <button onClick={() => this.setState({showDevices: true})}>Add devices to room</button>
                    }
                </div>
            </div>
        )
    }

    componentDidUpdate() {
        if (this.state.room_id !== this.props.room.room_id) {
            this.getDevices()
            this.getUnassignedDevices()
            this.setState({room_id: this.props.room.room_id})
        }
    }
}