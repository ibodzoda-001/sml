import Api from '../helpers/Api'

const AuthorizationService = (function () {
    function createUser(userInfo, callback) {
        Api().post('/users/signup', userInfo).then(res => {
            callback(res.data);
        })
    }

    function confirmUser(userCredentials, callback) {
        Api().post('/users/signup/code', userCredentials).then(res => {
            callback(res.data);
        })
    }

    return {
        createUser: createUser,
        confirmUser: confirmUser
    }
});

export default AuthorizationService
