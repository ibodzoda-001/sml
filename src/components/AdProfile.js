import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {Button, message, Popconfirm} from 'antd'
import {PhoneOutlined, CloseOutlined, CheckOutlined, DollarOutlined, UserOutlined} from '@ant-design/icons';
import adProfileService from '../services/adProfileService'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {Spin} from "antd";

function AdProfile() {

    const history = useHistory();

    const {adId} = useParams();

    const [buttonLoading, setButtonLoading] = useState(false);
    const [profileInfo, setProfileInfo] = useState(null);
    const [images, setImages] = useState([]);

    function getProfileInfoById() {
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
    }

    function productModeration(status) {
        setButtonLoading(true);
        adProfileService().productModeration({productId: adId, status: status},
            (response) => {
                history.push('/ad-moderation');
                if (status === 2) {
                    message.success('Объявление было принято.');

                } else {
                    message.error('Объявление было отклонено.')
                }

            }, (error) => {

            })
    }


    useEffect(() => {
        getProfileInfoById()
    }, [])

    return (
        profileInfo !== null
            ? <>
                <div>
                    <Popconfirm
                        title="Вы действительно хотите принять?"
                        onConfirm={() => {
                            productModeration(2);
                        }}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button loading={buttonLoading}
                                size="large"
                                icon={<CheckOutlined/>}
                                type="primary">
                            Принять
                        </Button>
                    </Popconfirm>

                    <Popconfirm
                        title="Вы действительно хотите отклонить?"
                        onConfirm={() => {
                            productModeration(3);
                        }}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button loading={buttonLoading}
                                style={{marginLeft: '10px'}}
                                size="large"
                                type="primary"
                                icon={<CloseOutlined/>}
                                danger>
                            Отклонить
                        </Button>
                    </Popconfirm>

                </div>
                <div style={{marginTop: '20px', display: 'flex'}}>
                    <div style={{width: '70%'}}>
                        <h1>{profileInfo.title}</h1>
                        {images.length !== 0 ? <ImageGallery showPlayButton={false} items={images}/> : null}
                        <div style={{marginBottom: '20px'}}>
                            {profileInfo.fields.map((field) => {
                                return (<div style={{
                                    width: '50%',
                                    fontSize: '19px',
                                    marginTop: '20px',
                                    display: 'inline-block',
                                    backgroundColor: 'white'
                                }}>
                                    <b style={{color: '#FF8C00',}}>{field.label}:</b> {field.value}
                                </div>)
                            })}
                        </div>
                        <p style={{fontSize: '18px'}}>
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
                                +992 {profileInfo.phoneNumber}
                            </h2>
                        </div>
                        <div style={{marginTop: '20px', marginLeft: '15px'}}>
                            <h2>
                                <UserOutlined/>&nbsp;&nbsp;
                                {profileInfo.username}
                            </h2>
                        </div>
                    </div>
                </div>
            </>
            : <div style={{textAlign: 'center', paddingTop: '30vh'}}>
                <Spin size="large"/>
            </div>

    )
}

export default AdProfile;