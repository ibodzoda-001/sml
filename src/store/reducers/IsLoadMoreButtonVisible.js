const isLoadMoreButtonVisibleReducer = (state = true, action) => {
    switch (action.type) {
        case 'SET_LOAD_MORE_BUTTON_VISIBLE':
            return true
        case 'SET_LOAD_MORE_BUTTON_INVISIBLE':
            return false
        default:
            return state
    }
}

export default isLoadMoreButtonVisibleReducer;