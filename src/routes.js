import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home/Home'
import Form from './components/Form/Form'
import Dashboard from './components/Dashboards/Dashboard'
import UserDash from './components/Dashboards/UserDash'
import DeviceDash from './components/Dashboards/DeviceDash'
import UserRooms from './components/Users/UserRooms'
import History from './components/History/History'
import RoomWiz from './components/Wizards/RoomWiz'
import DeviceWiz from './components/Wizards/DeviceWiz'
import UserWiz from './components/Wizards/UserWiz'

export default <Switch>
    <Route component={Home} exact path={'/'}/>
    <Route component={Form} path={'/forms/:room_id'}/>
    <Route component={Dashboard} path={'/dashboard'}/>
    <Route component={UserDash} path={'/userdash'}/>
    <Route component={DeviceDash} path={'/devicedash'}/>
    <Route component={UserRooms} path={'/users/:user_id'}/>
    <Route component={History} path={'/rooms/:room_id'}/>
    <Route component={RoomWiz} path={'/wizard/rooms'}/>
    <Route component={DeviceWiz} path={'/wizard/devices'}/>
    <Route component={UserWiz} path={'/wizard/users'}/>
</Switch>