import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class Nav extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                {this.props.location.pathname === '/' ? null: (
                    <div>
                        Nav
                    </div>
                )}
            </div>
        )
    }
}
export default withRouter(Nav)