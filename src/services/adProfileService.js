import Api from '../helpers/Api'

function AdProfileService() {
    function getProfileInfoById(adId, success, error) {
        Api().get(`/products/single/${adId}`).then((response) => {
            success(response.data);
        })
    }

    return {
        getProfileInfoById: getProfileInfoById
    }
}

export default AdProfileService;