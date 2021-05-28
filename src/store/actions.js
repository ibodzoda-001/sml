function Actions() {
    const setSignIn = () => {
        return localStorage.getItem('credentials') ? {
            type: 'SIGN_IN'
        } : {
            type: 'SIGN_OUT'
        }
    }

    return {
        setSignIn: setSignIn
    }
}

export default Actions;
