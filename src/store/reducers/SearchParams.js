const emptySearchParams = {
    category: '',
    subCategory: '',
    searchField: '',
    minPrice: '',
    maxPrice: '',
    range: 1
}
const localStorageParams = JSON.parse(sessionStorage.getItem('searchParams'));
const searchParamsReducer = (state = localStorageParams === null ? emptySearchParams : localStorageParams, action) => {
    switch (action.type) {
        case 'SET_PARAMS': {
            sessionStorage.setItem('searchParams', JSON.stringify(action.data));
            return action.data
        }
        default:
            return state
    }
}

export default searchParamsReducer