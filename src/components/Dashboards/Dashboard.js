import React, {Component} from 'react'
import Rooms from '../Rooms/Rooms'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class Dashboard extends Component {
    state = {
        isAdmin: false
    }

    isAdmin() {
        axios.get('/auth/admin').then((res) => {
            this.setState({isAdmin: res.data})
        })
    }

    componentDidMount() {
        this.isAdmin()
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.isAdmin ? 
                    <div>

                    <Link to={'/userdash'}>
                        <button>View users</button>
                    </Link>
                    <Link to={'/wizard/rooms'}>
                        <button>Add new room</button>
                    </Link>
                    <Link to={'/roomdash'}>
                        <button>View all rooms</button>
                    </Link>
                    <Link to={'/devicedash'}>
                        <button>View devices</button>
                    </Link>
                    </div>
                    : null}
                </div>
                <div>
                    <Rooms/>
                </div>
            </div>
        )
    }
}