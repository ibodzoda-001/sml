const userTypeReducer = (state = localStorage.getItem('userType'), action) => {
    switch (action.type) {
        case 'administrator':
            return 'administrator'
        case 'user':
            return 'user'
        default:
            return state
    }
}

export default userTypeReducer