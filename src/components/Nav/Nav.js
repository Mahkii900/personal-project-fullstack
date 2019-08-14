import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Nav extends Component {
    logout() {
        axios.post('/auth/logout').then(res => {
            this.props.history.push('/')
        })
    }

    render() {
        return (
            <div>
                {(this.props.location.pathname === '/' || this.props.location.pathname.includes('/forms/'))? null: (
                    <div>
                        <div></div>
                        <div>
                            <button onClick={() => this.logout()}>Log Out</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
export default withRouter(Nav)