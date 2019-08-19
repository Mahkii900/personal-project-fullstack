import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class RoomWiz extends Component {
    state = {
        name: ''
    }

    createNewRoom() {
        axios.post('/rooms/new', {name: this.state.name}).catch(err => alert('Unable to assign room to user'))
    }

    render() {
        return (
            <div>
                <div>
                    <Link to={'/dashboard'}>
                        <button>Back</button>
                    </Link>
                </div>
                <div>
                    <div>
                        <input type="text" placeholder={'Room name'} onChange={(e) => this.setState({name: e.target.value})} value={this.state.name}/>
                    </div>
                    <div>
                        <button onClick={() => this.createNewRoom()}>Create new room</button>
                    </div>
                </div>
                RoomWiz
            </div>
        )
    }
}