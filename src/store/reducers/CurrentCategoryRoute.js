
const currentCategoriesRouteReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_ROUTES':
            return action.data
        default:
            return state
    }
}

export default currentCategoriesRouteReducer