import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'

class UserWiz extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        phone: ''
    }

    createNewUser() {
        if (!this.state.username) {
            return alert('No username entered')
        }
        if (!this.state.password) {
            return alert('No password entered')
        }
        if (!this.state.phone && ! this.state.email) {
            return alert('No phone and/or email enetered')
        }
        axios.put('/users/new', {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            phone: this.state.phone,
            isAdmin: false
        }).then(res => {
            this.setState({username: '', password: '', email: '', phone: ''})
            this.props.history.push('/userdash')
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Link to={'/userdash'}>
                        <button>Back</button>
                    </Link>
                </div>
                <div>
                    <div>
                        <input placeholder={'Username'} onChange={e => this.setState({username: e.target.value})}/>
                        <input placeholder={'Password'} onChange={e => this.setState({password: e.target.value})}/>
                        <input placeholder={'email'} onChange={e => this.setState({email: e.target.value})}/>
                        <input placeholder={'Phone Number'} onChange={e => this.setState({phone: e.target.value})}/>
                    </div>
                    <div>
                        <button onClick={() => this.createNewUser()}>Add new user</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserWiz)