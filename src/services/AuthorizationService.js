import Api from '../helpers/Api'
import baseUrl from "../helpers/BaseUrl";

const AuthorizationService = (function () {
    function createUser(userInfo, callback) {
        Api().post(baseUrl + '/users/signup', userInfo).then(res => {
            callback(res.data);
        })
    }

    function confirmUser(userCredentials, callback) {
        Api().post(baseUrl + '/users/signup/code', userCredentials).then(res => {
            callback(res.data);
        })
    }

    return {
        createUser: createUser,
        confirmUser: confirmUser
    }
});

export default AuthorizationService
