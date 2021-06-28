const currentCategoriesReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_CURRENT_CATEGORIES':
            return action.data
        default:
            return state
    }
}

export default currentCategoriesReducer