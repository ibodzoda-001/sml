const searchParamsReducer = (state = {
    category: '',
    subCategory: '',
    searchField: '',
    minPrice: '',
    maxPrice: '',
    range: 0
}, action) => {
    switch (action.type) {
        case 'SET_PARAMS':
            return action.data
        default:
            return state
    }
}

export default searchParamsReducer