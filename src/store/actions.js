export const setSignIn = () => {
    return localStorage.getItem('user') ? {
        type: 'SIGN_IN'
    } : {
        type: 'SIGN_OUT'
    }
}
