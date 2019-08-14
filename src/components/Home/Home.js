import React, {Component} from 'react'
import axios from 'axios'

export default class Home extends Component {
    state = {
        room_name: '',
        username: '',
        password: ''
    }

    login() {
        axios.post('/auth/login', {username: this.state.username, password: this.state.password}).then(res => {
            this.props.history.push('/dashboard')
        })
        .catch(err => alert('Username or Password Incorrect'))
    }

    goToForm() {
        axios.get(`/rooms/forms/${this.state.room_name}`).then(res => {
            this.props.history.push(`/forms/${res.data.room_id}`)
        })
        .catch(err => alert('Room not found'))
    }

    render() {
        return (
            <div>
                <div>
                    <input onChange={e => this.setState({room_name: e.target.value})}placeholder={'Room ID'}/>
                    <button onClick={() => this.goToForm()}>Go to form</button>
                </div>
                <div>
                    <input onChange={e => this.setState({username: e.target.value})}placeholder={'Username'}/>
                    <input onChange={e => this.setState({password: e.target.value})}placeholder={'Password'}/>
                    <button onClick={() => this.login()}>Log In</button>
                </div>
            </div>
        )
    }
}