import React, {Component} from 'react'

export default class RoomDevices extends Component {
    render() {
        return(
            <div>
                <div>{this.props.name} {this.props.type}</div>
            </div>
        )
    }
}