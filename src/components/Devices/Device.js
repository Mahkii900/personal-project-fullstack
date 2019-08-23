import React, {Component} from 'react'

export default class Device extends Component {
    render() {
        return (
            <div className='devicedash-name-container'>
                <div>{this.props.name}</div>
                <div className='device-name-container-model'>
                    <div>
                        {this.props.type}
                    </div>
                </div>
            </div>
        )
    }
}