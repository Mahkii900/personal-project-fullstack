import React, {Component} from 'react'
import Rooms from '../Rooms/Rooms'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                Dashboard
                <Rooms/>
            </div>
        )
    }
}