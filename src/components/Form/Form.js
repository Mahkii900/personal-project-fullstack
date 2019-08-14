import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class Form extends Component {
    state = {
        content: '',
        room_name: ''
    }

    componentDidMount() {
        axios.get(`/rooms/${this.props.match.params.room_id}`).then(res => {
            this.setState({room_name: res.data.name})
        })
    }

    render() {
        return (
            <div>
                <div>
                    Room: {this.state.room_name}
                </div>
                <div>
                    <div>
                        {/*Put in device selection here*/}
                    </div>
                    <div>
                        <input type='text' onChange={e => this.setState({content: e.target.value})} placeholder={'Type issue here...'}/>
                    </div>
                    <div>
                        {/*Put radio buttons here to select how quickly a request needs to be done*/}
                    </div>
                    <div>
                        <button>Submit Work Request</button>
                    </div>
                </div>
                <div>
                    <Link to={'/'}>
                        <button>Back To Home</button>
                    </Link>
                </div>
            </div>
        )
    }
}