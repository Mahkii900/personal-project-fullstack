import React, {Component} from 'react'

export default class Device extends Component {
    render() {
        return (
            <div>
                <div>{this.props.type}</div>
                <div>{this.props.name}</div>
            </div>
        )
    }
}