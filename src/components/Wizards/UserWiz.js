import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class UserWiz extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to={'/dashboard'}>
                        <button>Back</button>
                    </Link>
                </div>
                UserWiz
            </div>
        )
    }
}