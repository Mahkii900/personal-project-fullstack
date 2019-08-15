import React, {Component} from 'react'
import axios from 'axios'

export default class Room extends Component {
    state = {
        devices: []
    }

    componentDidMount() {
        axios.get(`/rooms/devices/${this.props.room.room_id}`).then(res => {
            this.setState({devices: res.data})
        })
    }
    
    render() {
        return (
            <div>
                <div>{this.props.room.name}</div>
                <div></div>
            </div>
        )
    }
}