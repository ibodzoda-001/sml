import Api from "../helpers/Api";
import baseUrl from "../helpers/BaseUrl";

function MainPageService() {
    function getAllProducts(searchText, success, error) {
        Api().get(baseUrl + `/products/all?subCategory&category&searchField=${searchText}&minPrice&maxPrice&range`)
            .then((response) => {
                success(response.data);
            })
    }

    return {
        getAllProducts: getAllProducts
    }
}

export default MainPageService;