import React, {Component} from 'react'
import Device from '../Devices/Device'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class DeviceDash extends Component {
    state = {
        devices: []
    }

    getDevices() {
        axios.get('/devices').then(res => {
            this.setState({devices: res.data})
        })
    }

    componentDidMount() {
        this.getDevices()
    }

    deleteDevice(device_id) {
        axios.delete(`/devices/${device_id}`).then(res => {
            this.getDevices()
        })
    }

    render() {
        const devices = this.state.devices.map((ele, index) => {
            return <div key={index} className='device-display-info-container'>
                    <div className='device-info-device-container'>
                        <Device name={ele.name}
                        type={ele.type}/>
                    </div>
                    <div className='device-display-delete-button'>
                        <button onClick={() => this.deleteDevice(ele.device_id)}>Delete {ele.name}</button>
                    </div>
                </div>
        })
        return (
            <div className='device-dash'>
                <div className='device-top-bar'>
                    <div className="admin-bar">
                        <Link to={'/userdash'}>
                            <button>View users</button>
                        </Link>
                        <Link to={'/wizard/devices'}>
                            <button>Add new device</button>
                        </Link>
                        <Link to={'/dashboard'}>
                            <button>View rooms</button>
                        </Link>
                    </div>
                </div>
                <div className='device-main-content'>
                    {devices}
                </div>
            </div>
        )
    }
}