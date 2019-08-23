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
            this.getDevices()
            this.getUnassignedDevices()
        })
        .catch(err => alert('Unable to assign device to room'))
    }

    removeDeviceFromRoom = (device_id) => {
        axios.post(`/devices/rooms/${device_id}`).then(res => {
            this.getDevices()
            this.getUnassignedDevices()
        })
        .catch(err => alert('Unable to remove device'))
    }

    render() {
        //------Maybe add recent ticket dates to devices--------
        let devices = this.state.devices.map((ele) => <div className='room-bottom-device-container' key={ele.device_id}>
                <div className='room-device-name-container'>
                    {ele.name}
                </div>
                <div className='room-device-model-container'>
                    {ele.type}
                </div>
                <div className='room-device-button-container'>
                    <button onClick={() => this.removeDeviceFromRoom(ele.device_id)}>Remove {ele.name}</button>
                </div>
            </div>
        )
        let unassigned = this.state.unAssigned.map((ele) => <option key={ele.device_id} value={ele.device_id}>{ele.name} {ele.type}</option>)
        return (
            <div>
                <div className='room-top-container'>
                    <div className='room-top-roomname'>{this.props.room.name}</div>
                    <div className='room-top-nav-button'>
                        <Link to={`/rooms/${this.props.room.room_id}`}>
                            <button>Go to {this.props.room.name} view</button>
                        </Link>
                    </div>
                </div>
                <div className='room-bottom-container'>
                    <div className='room-bottom-devices'>
                        {devices}
                    </div>
                    <div className='room-bottom-selection'>
                        {this.state.showDevices ? (
                            <div className='room-bottom-selection-selected'>
                                <div className='room-bottom-selection-selection'>
                                    <select onChange={(e) => this.setState({device_id: e.target.value})}>
                                        <option value={0}>--</option>
                                        {unassigned}
                                    </select>
                                </div>
                                <div className='room-bottom-selection-buttons'>
                                    <div className='room-bottom-selection-add'>
                                        <button onClick={() => this.assignDeviceToRoom(this.props.room.room_id)}>Add device</button>
                                    </div>
                                    <div classNam='room-bottom-selection-cancel'>
                                        <button onClick={() => this.setState({showDevices: false})}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        ):
                        <div className='room-bottom-selection-show'>
                            <button onClick={() => this.setState({showDevices: true})}>Add devices to room</button>
                        </div>
                        }
                    </div>
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