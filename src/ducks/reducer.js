//INITIAL STATE
const intialState = {
    devices: [],
    rooms: [],
    history: []
}
//ACTION CONSTS

//ACTION BUILDERS

//REDUCER
export default (state = intialState, action) => {
    const {type, payload} = action
    switch(type) {
        default: return state
    }
}