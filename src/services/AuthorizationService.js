import Api from '../helpers/Api'

const authorizationService = (function () {
    function createUser(userInfo, callback) {
        Api().post('/users/signup', userInfo).then(res => {
            callback(res.data);
        })
    }

    return {
        createUser: createUser
    }
});

export default authorizationService
