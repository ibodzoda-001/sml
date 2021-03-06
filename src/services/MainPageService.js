import Api from "../helpers/Api";
import baseUrl from "../helpers/BaseUrl";

function MainPageService() {
    function getAllAds(searchParams, success, getBeforeRange, error) {
        Api().get(baseUrl + `/products/all?category=${searchParams.category}&subCategory=${searchParams.subCategory}&searchField=${searchParams.searchField}&minPrice=${searchParams.minPrice}&maxPrice=${searchParams.maxPrice}&range=${searchParams.range}&getAllBeforeRange=${getBeforeRange}`)
            .then((response) => {
                success(response.data);
            })
    }

    return {
        getAllAds: getAllAds
    }
}

export default MainPageService;