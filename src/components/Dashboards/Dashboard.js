import React, {Component} from 'react'
import Rooms from '../Rooms/Rooms'
import {Link} from 'react-router-dom'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to={'/userdash'}>
                        <button>View users</button>
                    </Link>
                    <Link to={'/wizard/rooms'}>
                        <button>Add new room</button>
                    </Link>
                    <Link to={'/devicedash'}>
                        <button>View devices</button>
                    </Link>
                </div>
                <div>
                    <Rooms/>
                </div>
            </div>
        )
    }
}