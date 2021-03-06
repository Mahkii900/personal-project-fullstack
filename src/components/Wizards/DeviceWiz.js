import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'

class DeviceWiz extends Component {
    state = {
        name: '',
        model: ''
    }

    createNewDevice() {
        if (!this.state.name) {
            return alert('Please type in the device name')
        }
        if (!this.state.model) {
            return alert('Please type in the device model or use N/A')
        }
        axios.put('/devices/new', {name: this.state.name, type: this.state.model}).then(res => {
            this.setState({name: '', model: ''})
            this.props.history.push('/devicedash')
        })
    }

    render() {
        return (
            <div className='device-wiz-body'>
                <div className='wizard-main-content device-wiz'>
                    <div className='back-button'>
                        <Link to={'/devicedash'}>
                            <button>Back</button>
                        </Link>
                    </div>
                    <div className='device-wiz-main-content'>
                        <div className='device-wiz-input'>
                            <input placeholder={'Device Name...'} onChange={e => this.setState({name: e.target.value})}/>
                        </div>
                        <div className='device-wiz-input'>
                            <input placeholder={'Device Model...'} onChange={e => this.setState({model: e.target.value})}/>
                        </div>
                        <div className='device-wiz-add-button'>
                            <button onClick={() => this.createNewDevice()}>Add device</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(DeviceWiz)