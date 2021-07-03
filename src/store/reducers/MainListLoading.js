const mainListLoadingReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return true
        case 'SET_UNLOADING':
            return false
        default:
            return state
    }
}

export default mainListLoadingReducer;