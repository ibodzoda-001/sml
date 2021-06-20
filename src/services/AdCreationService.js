import Api from "../helpers/Api";
import baseUrl from "../helpers/BaseUrl";

function AdCreationService() {
    function getCategories(success, error) {
        Api().get(baseUrl + '/products/categories').then(res => {
                success(res.data);
            },
            err => {
                error(err.response);
            })
    }

    function uploadImage(formData, success) {
        Api().post(baseUrl + '/products/picture', formData).then(res => {
                success(res.data);
            },
            err => {

            })
    }

    function deleteImage(imageId) {
        Api().get(baseUrl + `/products/image/${imageId}`).then(res => {

            },
            err => {

            })
    }

    function createNewAd(ad, success, error) {
        Api().post(baseUrl + '/products', ad).then((response) => {
            success(response.data);
        })
    }

    return {
        getCategories: getCategories,
        createNewAd: createNewAd,
        uploadImage: uploadImage,
        deleteImage: deleteImage,
    }
}

export default AdCreationService;