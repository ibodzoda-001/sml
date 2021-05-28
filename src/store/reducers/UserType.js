const credentials = JSON.parse(localStorage.getItem('credentials'));

const userTypeReducer = (state = credentials !== null ? credentials.userType : null, action) => {
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