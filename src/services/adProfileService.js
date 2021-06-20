import Api from '../helpers/Api'
import baseUrl from "../helpers/BaseUrl";

function AdProfileService() {
    function getProfileInfoById(adId, success, error) {
        Api().get(baseUrl + `/products/single/${adId}`).then((response) => {
            success(response.data);
        })
    }

    function productModeration({productId, status}, success, error) {
        Api().patch(baseUrl + '/products/admin/product', {id: productId, value: status}).then(
            (response) => {
                success(response.data);
            })
    }

    return {
        getProfileInfoById: getProfileInfoById,
        productModeration: productModeration
    }
}

export default AdProfileService;