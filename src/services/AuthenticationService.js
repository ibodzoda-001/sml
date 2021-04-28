import axios from "axios";

const authenticationService = (function () {
    function authenticate(login, password, callback) {
        axios.create().post('/ecology/authenticate', {username: login, password: password}).then(res => {
            callback(res.data);
        })
    }

    return {
        authenticate: authenticate
    }
});

export default authenticationService
