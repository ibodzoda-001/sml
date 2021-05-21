import Api from '../helpers/Api'

const authenticationService = (function () {
    function authenticate(userInfo, callback) {
        Api().post('/users/login', userInfo).then(res => {
            callback(res.data);
        })
    }

    return {
        authenticate: authenticate
    }
});

export default authenticationService
