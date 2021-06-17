import Api from "../helpers/Api";

function AdModerationService() {
    function getAllAds(success, error) {
        Api().get('/products/admin').then((response) => {
            success(response.data.products);
        })
    }

    return {
        getAllAds: getAllAds
    };
}

export default AdModerationService;