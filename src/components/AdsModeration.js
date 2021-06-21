import React, {useEffect, useState} from 'react'
import AdModerationService from "../services/AdModerationService";
import AdsList from "./AdsList";

function AdsModeration() {
    const [listOfAds, setListOfAds] = useState([]);
    const [listLoading, setListLoading] = useState(false);

    function getAllAds() {
        setListLoading(true);
        AdModerationService().getAllAds((ads) => {
            const listOfData = [];
            ads.forEach((ad) => {
                listOfData.push({
                    id: ad.productID,
                    title: (<div style={{display: 'flex'}}>
                        <h3>{ad.title}</h3>
                        <div style={{marginLeft: 'auto'}}>
                            <h4 style={{fontSize: '23px', color: 'dimgray'}}>{ad.price} TJS{ad.bargain ? '. Торг.' : ''}</h4>
                        </div>
                    </div>),
                    content: ad.description,
                    pictures: ad.pictures,
                });
            })
            setListOfAds(listOfData);
            setListLoading(false);
        })
    }

    useEffect(() => {
        getAllAds();
    }, []);

    return (
        <AdsList listOfAds={listOfAds} listLoading={listLoading}/>
    )
}

export default AdsModeration;