import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class Nav extends Component {
    render() {
        return (
            <div>
                {(this.props.location.pathname === '/' || this.props.location.pathname.includes('/forms/'))? null: (
                    <div>
                        Nav
                    </div>
                )}
            </div>
        )
    }
}
export default withRouter(Nav)