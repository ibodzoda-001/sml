import axios from 'axios';

function Api() {
    const axiosApi = axios.create();
    const token = '';
    token ? axiosApi.defaults.headers.common['Authorization'] = 'Bearer ' + token : delete axiosApi.defaults.headers.common['Authorization'];
    if (process.env.NODE_ENV === 'production') {
        axiosApi.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
    }
    return axiosApi;
}

export default Api
