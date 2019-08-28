//INITIAL STATE
const intialState = {
    devices: []
}
//ACTION CONSTS
const SET_DEVICES = 'SET_DEVICES'

//ACTION BUILDERS
export function setDevices(devices) {
    return {
        type: SET_DEVICES,
        payload: {devices}
    }
}

//REDUCER
export default (state = intialState, action) => {
    switch(action.type) {
        case SET_DEVICES:
            return action.payload
        default: return state
    }
}