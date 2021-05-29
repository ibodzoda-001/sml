import Api from '../helpers/Api'

const AuthenticationService = (function () {

    function authenticate(userInfo, success, error) {
        Api().post('/users/login', userInfo).then(res => {
                success(res.data);
            },
            err => {
                error(err.response);
            })
    }

    return {
        authenticate: authenticate
    }
});

export default AuthenticationService
