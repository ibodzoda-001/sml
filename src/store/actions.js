function Actions() {
    const setSignIn = () => {
        return localStorage.getItem('user') ? {
            type: 'SIGN_IN'
        } : {
            type: 'SIGN_OUT'
        }
    }

    const setUserType = () => {
        return {
            administrator: {type: 'administrator'},
            user: {type: 'user'}
        }
    }

    return {
        setSignIn: setSignIn,
        setUserType: setUserType
    }
}

export default Actions;
