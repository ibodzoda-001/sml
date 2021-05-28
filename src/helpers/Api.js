import axios from 'axios';

function Api() {
    const userCredentials = JSON.parse(localStorage.getItem('credentials'));
    const axiosApi = axios.create();

    // For GET requests
    axiosApi.interceptors.request.use(
        (req) => {
            return req;
        },
        (err) => {
            if(err.status === 405 || err.stat === 500) {
                console.log('logout')
            }
            return Promise.reject(err);
        }
    );

// For POST requests
    axiosApi.interceptors.response.use(
        (res) => {
            return res;
        },
        (err) => {
            if(err.status === 405 || err.stat === 500) {
                console.log('logout')
            }
            return Promise.reject(err);
        }
    );

    const token = userCredentials !== null ? userCredentials.token : '';
    token ? axiosApi.defaults.headers.common['Authorization'] = 'Bearer ' + token : delete axiosApi.defaults.headers.common['Authorization'];
    if (process.env.NODE_ENV === 'production') {
        axiosApi.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
    }

    return axiosApi;
}

export default Api
