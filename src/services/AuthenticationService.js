import Api from '../helpers/Api'
import baseUrl from "../helpers/BaseUrl";

const AuthenticationService = (function () {

    function authenticate(userInfo, success, error) {
        Api().post(baseUrl + '/users/login', userInfo).then(res => {
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
