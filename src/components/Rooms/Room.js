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
        let devices = this.state.devices.map((ele) => <div key={ele.device_id}>{ele.name} {ele.type}</div>)
        return (
            <div>
                <div>{this.props.room.name}</div>
                <div>
                    <button>Go to {this.props.room.name} view</button>
                </div>
                <div>{devices}</div>
            </div>
        )
    }
}