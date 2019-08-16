import React, {Component} from 'react'
import Device from '../Devices/Device'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class DeviceDash extends Component {
    state = {
        devices: []
    }

    componentDidMount() {
        axios.get('/devices').then(res => {
            this.setState({devices: res.data})
        })
    }

    render() {
        const devices = this.state.devices.map((ele, index) => {
            return <Device key={index} name={ele.name} type={ele.type}/>
        })
        return (
            <div>
                <div>
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
                <div>
                    {devices}
                </div>
            </div>
        )
    }
}