import React, {Component} from 'react'
import Rooms from '../Rooms/Rooms'
import {Link} from 'react-router-dom'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <div>
                    Dashboard
                    <Rooms/>
                </div>
                <div>
                    <Link to={'/wizard/users'}>
                        <button>Add new user</button>
                    </Link>
                    <Link to={'/wizard/rooms'}>
                        <button>Add new room</button>
                    </Link>
                    <Link to={'/wizard/devices'}>
                        <button>Add new device</button>
                    </Link>
                </div>
            </div>
        )
    }
}