import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

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
        const devices = this.state.devices.map((ele)=> {
            return <option key={ele.device_id} value={ele.device_id}>
                {ele.name} {ele.type}
            </option>
        })
        return (
            <div className='form-body'>
                <div className='form-main-content'>
                    <div className='form-back-button-box'>
                        <Link to={'/'}>
                            <button>Back To Home</button>
                        </Link>
                    </div>
                    <div className='form-main-display-box'>
                        <div className='form-room-name-box'>
                            {this.state.room_name}
                        </div>
                        <div className='form-display-input'>
                            <div className='form-device-select'>
                                <select onChange={e => this.setState({device_id: e.target.value})}>
                                    <option value={0}>-Select device-</option>
                                    {devices}
                                </select>
                            </div>
                            {this.state.device_id ?
                            <div className='form-device-input-box'>
                                <div className='form-device-issue-input'>
                                    <textarea name='textarea' cols='40' rows='5' placeholder='Type issue here...'></textarea>
                                </div>
                                <div className='form-issue-select'>
                                    <select onChange={(e) => this.setState({urgency: e.target.value})}>
                                        <option value='--'>-Select urgency-</option>
                                        <option value='Crazy urgent'>Crazy urgent</option>
                                        <option value='Not so crazy urgent'>Not so crazy urgent</option>
                                        <option value='Not urgent at all'>Not urgent at all</option>
                                    </select>
                                </div>
                                <div className='form-issue-button-box'>
                                    <Link to={'/'}>
                                        <button onClick={() => this.createTicket()}>Submit Work Request</button>
                                    </Link>
                                </div>
                            </div>: <div className='form-device-unselected'>Please select a device</div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}