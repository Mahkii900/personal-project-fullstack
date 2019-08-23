import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Nav extends Component {
    state = {
        username: ''
    }

    logout() {
        axios.post('/auth/logout')
    }

    componentDidMount() {
        axios.get('/auth/username').then(res => {
            this.setState({username: res.data.username})
        })
    }

    render() {
        return (
            <div className="nav-bar">
                <div className="nav-bar-content">
                    <div className="nav-bar-username">
                        <div className='nav-bar-username-container'>
                            User: {this.state.username}
                        </div>
                    </div>
                    <div className="nav-bar-logout">
                        <Link to={'/'}>
                            <button onClick={() => this.logout()}>Log Out</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default Nav