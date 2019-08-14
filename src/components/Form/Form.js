import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import RoomDevices from './RoomDevices';

export default class Form extends Component {
    state = {
        content: '',
        room_name: '',
        devices: []
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

    render() {
        const devices = this.state.devices.map((ele )=> {
            return <RoomDevices
                name={ele.name}
                type={ele.type}
                key={ele.device_id}
            />
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
                        <input type='text' onChange={e => this.setState({content: e.target.value})} placeholder={'Type issue here...'}/>
                    </div>
                    <div>
                        {/*Put radio buttons here to select how quickly a request needs to be done*/}
                    </div>
                    <div>
                        <button>Submit Work Request</button>
                    </div>
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