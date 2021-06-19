const credentials = JSON.parse(localStorage.getItem('credentials'));

const userCredentialsReducer = (state = credentials, action) => {
    switch (action.type) {
        case 'SET_USER_CREDENTIALS':
            return action.data
        case 'REMOVE_USER_CREDENTIALS':
            return null
        default:
            return state
    }
}

export default userCredentialsReducer