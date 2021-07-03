import React from "react";

function AdsListConverter(ads) {
    const listOfData = [];
    ads.forEach((ad) => {
        listOfData.push({
            id: ad.productID,
            header: (<div style={{display: 'flex'}}>
                <h3>{ad.title}</h3>
                <div style={{marginLeft: 'auto'}}>
                            <span style={{
                                fontSize: '23px',
                                color: 'dimgray'
                            }}>{ad.price} TJS{ad.bargain ? '. Торг.' : ''}</span>
                </div>
            </div>),
            title: ad.title,
            price: ad.price,
            bargain: ad.bargain,
            content: ad.description,
            pictures: ad.pictures,
        });
    })
    return listOfData;
}

export default AdsListConverter;