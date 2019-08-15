import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class History extends Component {
    render() {
        return (
            <div>
                History
                <div>
                    <Link to={'/dashboard'}>
                        <button>Back to rooms</button>
                    </Link>
                </div>
            </div>
        )
    }
}