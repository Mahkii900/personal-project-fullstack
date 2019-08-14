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
    //eslint-disable-next-line
    const {type, payload} = action
    switch(type) {
        default: return state
    }
}