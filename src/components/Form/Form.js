import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import RoomDevices from './RoomDevices';

export default class Form extends Component {
    state = {
        content: '',
        room_name: '',
        devices: [],
        device_id: 0
    }

    getDevices() {
        axios.get(`/rooms/devices/${this.props.match.params.room_id}`).then(res => {
            this.setState({devices: res.data})
        })
        .catch(err => {
            alert('This room has no devices')
            this.setState({devices: []})    
        })
    }

    componentDidMount() {
        axios.get(`/rooms/${this.props.match.params.room_id}`).then(res => {
            this.setState({room_name: res.data.name})
        })
        this.getDevices()
    }

    displaySelectedDevice = () => {
        let [device] = this.state.devices.filter((ele) => {return ele.device_id === this.state.device_id})
        return <div>{device.name} {device.type}</div>
    }

    createTicket() {
        axios.put('/rooms/forms', {room_id: this.props.match.params.room_id, device_id: this.state.device_id, content: this.state.content}).then(res => {
        })
        .catch(err => alert('Request failed to submit'))
    }

    render() {
        const devices = this.state.devices.map((ele )=> {
            return <div key={ele.device_id}>
                <RoomDevices
                    name={ele.name}
                    type={ele.type}
                />
                <div>
                    <button onClick={() => this.setState({device_id: ele.device_id})}>Select Device</button>
                </div>
            </div>
        })
        return (
            <div>
                <div>
                    Room: {this.state.room_name}
                </div>
                <div>
                    <div>
                        {/*Put in device selection here*/}
                        {devices}
                    </div>
                    <div>
                        <div>-----Selected Device------</div>
                        {this.state.device_id ? this.displaySelectedDevice(): null}
                    </div>
                    {this.state.device_id ?
                    <div>
                        <div>
                            <input type='text' onChange={e => this.setState({content: e.target.value})} placeholder={'Type issue here...'}/>
                        </div>
                        <div>
                            {/*Put radio buttons here to select how quickly a request needs to be done*/}
                        </div>
                        <div>
                            <Link to={'/'}>
                                <button onClick={() => this.createTicket()}>Submit Work Request</button>
                            </Link>
                        </div>
                    </div>: <div>Please select a device</div>}
                </div>
                <div>
                    <Link to={'/'}>
                        <button>Back To Home</button>
                    </Link>
                </div>
            </div>
        )
    }
}