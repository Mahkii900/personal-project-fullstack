import React, {Component} from 'react'
import Device from '../Devices/Device'
import {Link} from 'react-router-dom'

export default class DeviceDash extends Component {
    render() {
        return (
            <div>
                DeviceDash
                <Device/>
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
            </div>
        )
    }
}