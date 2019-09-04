import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class RoomWiz extends Component {
    state = {
        name: ''
    }

    createNewRoom() {
        axios.put('/rooms/new', {name: this.state.name}).catch(err => alert('Unable to create room'))
    }

    render() {
        return (
            <div className='main-content wizard'>
                <div className='wizard-main-content room-wiz'>
                    <div className='back-button'>
                        <Link to={'/dashboard'}>
                            <button>Back</button>
                        </Link>
                    </div>
                    <div className='room-wiz-main-content'>
                            <div>
                                <input type="text" placeholder={'Room name'} onChange={(e) => this.setState({name: e.target.value})} value={this.state.name}/>
                            </div>
                            <div>
                                <Link to={'/dashboard'}>
                                    <button onClick={() => this.createNewRoom()}>Create new room</button>
                                </Link>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}