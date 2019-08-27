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
            return (<div key={ele.id} className='history-display-box'>
                <div className='history-issue-date'>{ele.date}</div>
                <div className='history-issue-content'>{ele.content}</div>
                <div className='history-issue-name'>
                    <div>{ele.name}</div>
                    <div>{ele.type}</div>
                </div>
            </div>)
        })
        return (
            <div className='history-body'>
                <div className='history-main-content'>
                    <div className='history-back-button'>
                        <Link to={'/dashboard'}>
                            <button>Back to rooms</button>
                        </Link>
                    </div>
                    <div className='history-content-display'>
                        {history}
                    </div>
                </div>
            </div>
        )
    }
}