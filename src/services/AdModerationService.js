import Api from "../helpers/Api";
import baseUrl from "../helpers/BaseUrl";

function AdModerationService() {
    function getAllAds(success, error) {
        Api().get(baseUrl + '/products/admin').then((response) => {
            success(response.data.products);
        })
    }

    return {
        getAllAds: getAllAds
    };
}

export default AdModerationService;