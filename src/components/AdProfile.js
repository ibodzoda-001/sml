import React from 'react'
import {useParams} from 'react-router-dom'
import {PhoneOutlined, DollarOutlined, UserOutlined} from '@ant-design/icons';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

function AdProfile() {

    const {adId} = useParams();
    const images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/1000/600/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ];

    return (
        <div style={{display: 'flex'}}>
            <div style={{width: '70%'}}>
                <h1>Name goes here {adId}</h1>
                <ImageGallery showPlayButton={false} items={images}/>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                    with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                    publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div style={{width: '30%', marginLeft: '25px'}}>
                <div>
                    <h2 className="adProfilePrice">
                        <DollarOutlined />&nbsp;&nbsp;
                        400 сом. Торг.
                    </h2>
                </div>
                <div>
                    <h2 className="adProfilePhone">
                        <PhoneOutlined />&nbsp;&nbsp;
                        +992 933-43-23-67
                    </h2>
                </div>
                <div style={{marginTop: '20px', marginLeft: '15px'}}>
                    <h2>
                        <UserOutlined />&nbsp;&nbsp;
                        Ibodzoda Ibodullo
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default AdProfile;