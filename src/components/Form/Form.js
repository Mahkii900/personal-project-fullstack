import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import RoomDevices from './RoomDevices';

export default class Form extends Component {
    state = {
        content: '',
        room_name: '',
        devices: [],
        device: '',
        device_id: 0,
        urgency: '--'
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
        if (this.state.urgency === '--') {
            return alert('Please select urgency of issue')
        }
       if (this.state.urgency === 'Crazy urgent' || this.state.urgency === 'Not so crazy urgent') {
           axios.post('/forms/new/urgent', {
               room: this.state.room_name,
               content: this.state.content,
               room_id: this.props.match.params.room_id,
               device_id: this.state.device_id,
               urgency: this.state.urgency
            })
           .catch(err => alert('Request failed to submit'))
       } else {
           axios.post('/forms/new', {
               room: this.state.room_name,
               content: this.state.content,
               room_id: this.props.match.params.room_id,
               device_id: this.state.device_id,
               urgency: this.state.urgency
           })
           .catch(err => alert('Request failed to submit'))
       }
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
                            <select onChange={(e) => this.setState({urgency: e.target.value})}>
                                <option value='--'>--</option>
                                <option value='Crazy urgent'>Crazy urgent</option>
                                <option value='Not so crazy urgent'>Not so crazy urgent</option>
                                <option value='Not urgent at all'>Not urgent at all</option>
                            </select>
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