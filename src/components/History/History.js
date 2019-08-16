import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class History extends Component {
    state = {
        history: []
    }

    componentDidMount() {
        axios.get(`/rooms/history/${this.props.match.params.room_id}`).then(res => {
            this.setState({history: res.data})
        })
    }

    render() {
        let history = this.state.history.map((ele) => {
            return (<div key={ele.id}>
                <div>{ele.date}</div>
                <div>{ele.content}</div>
                <div>{ele.name}</div>
                <div>{ele.type}</div>
            </div>)
        })
        return (
            <div>
                <div>
                    <Link to={'/dashboard'}>
                        <button>Back to rooms</button>
                    </Link>
                </div>
                {history}
            </div>
        )
    }
}