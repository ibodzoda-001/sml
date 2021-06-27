let adsListType = localStorage.getItem('adsListType');
adsListType = adsListType === null ? 'gallery' : adsListType;

const categoriesReducer = (state = adsListType, action) => {
    switch (action.type) {
        case 'SET_GALLERY':
            return 'gallery'
        case 'SET_LIST':
            return 'list'
        default:
            return state
    }
}

export default categoriesReducer