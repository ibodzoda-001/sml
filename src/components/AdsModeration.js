import React, {useEffect, useState} from 'react'
import AdModerationService from "../services/AdModerationService";
import AdsList from "./AdsList";
import AdsListConverter from "../helpers/AdsListConverter";

function AdsModeration() {
    const [listOfAds, setListOfAds] = useState([]);
    const [listLoading, setListLoading] = useState(false);

    function getAllAds() {
        setListLoading(true);
        AdModerationService().getAllAds((ads) => {
            setListOfAds(AdsListConverter(ads));
            setListLoading(false);
        })
    }

    useEffect(() => {
        getAllAds();
    }, []);

    return (
        <AdsList listOfAds={listOfAds} listLoading={listLoading} purpose={'moderation'}/>
    )
}

export default AdsModeration;