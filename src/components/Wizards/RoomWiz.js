import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class RoomWiz extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to={'/dashboard'}>
                        <button>Back</button>
                    </Link>
                </div>
                RoomWiz
            </div>
        )
    }
}