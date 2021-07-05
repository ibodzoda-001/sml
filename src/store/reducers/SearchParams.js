console.log('in param reducer');
const searchParamsReducer = (state = {
    category: '',
    subCategory: '',
    searchField: '',
    minPrice: '',
    maxPrice: '',
    range: 1
}, action) => {
    switch (action.type) {
        case 'SET_PARAMS': return action.data
        default:
            return state
    }
}

export default searchParamsReducer