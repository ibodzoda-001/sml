import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {PhoneOutlined, DollarOutlined, UserOutlined} from '@ant-design/icons';
import adProfileService from '../services/adProfileService'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {Spin} from "antd";

function AdProfile() {

    const {adId} = useParams();

    let [profileInfo, setProfileInfo] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        adProfileService().getProfileInfoById(adId, (profileResponse) => {
            profileResponse.product.pictures.forEach((image) => {
                images.push({
                    original: image.link,
                    thumbnail: image.link
                })
            });
            setProfileInfo(profileResponse.product);
            setImages(images);
        })
    }, [])

    return (
        profileInfo !== null
            ? <div style={{display: 'flex'}}>
                <div style={{width: '70%'}}>
                    <h1>{profileInfo.title}</h1>
                    <ImageGallery showPlayButton={false} items={images}/>
                    <p>
                        {profileInfo.description}
                    </p>
                </div>
                <div style={{width: '30%', marginLeft: '25px'}}>
                    <div>
                        <h2 className="adProfilePrice">
                            <DollarOutlined/>&nbsp;&nbsp;
                            {profileInfo.price} сом. {profileInfo.bargain ? 'Торг.' : ''}
                        </h2>
                    </div>
                    <div>
                        <h2 className="adProfilePhone">
                            <PhoneOutlined/>&nbsp;&nbsp;
                            +992 933-43-23-67
                        </h2>
                    </div>
                    <div style={{marginTop: '20px', marginLeft: '15px'}}>
                        <h2>
                            <UserOutlined/>&nbsp;&nbsp;
                            Ibodzoda Ibodullo
                        </h2>
                    </div>
                </div>
            </div>
            : <div style={{textAlign: 'center', paddingTop: '30vh'}}>
                <Spin size="large"/>
            </div>

    )
}

export default AdProfile;