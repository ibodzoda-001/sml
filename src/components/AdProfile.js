import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {Button, message, Popconfirm} from 'antd'
import {PhoneOutlined, CloseOutlined, CheckOutlined, DollarOutlined, UserOutlined} from '@ant-design/icons';
import adProfileService from '../services/adProfileService'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {Spin} from "antd";
import {useSelector} from "react-redux";

function AdProfile() {

    const history = useHistory();

    const {adId, purpose} = useParams();
    const userCredentials = useSelector(((state) => {
        return state.userCredentials;
    }));

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
                {
                    purpose === 'moderation' && userCredentials.userType === 'admin'
                        ? <div>
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
                        : null
                }
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
                                    <b style={{color: '#FF8C00'}}>{field.label}:</b> {field.value}
                                </div>)
                            })}
                        </div>
                        <p style={{fontSize: '17px'}}>
                            {profileInfo.description}
                        </p>
                    </div>
                    <div style={{width: '30%', marginLeft: '25px'}}>
                        <div>
                            <h4 style={{
                                fontSize: '23px',
                                color: 'dimgray'
                            }}>{profileInfo.price} TJS{profileInfo.bargain ? '. Торг.' : ''}</h4>
                        </div>
                        <div>
                            <div style={{border: 'solid whitesmoke 2px', padding: '15px', marginBottom: '15px'}}>
                                <h2 style={{marginBottom: '0px'}}>
                                    <UserOutlined/>&nbsp;&nbsp;
                                    {profileInfo.username}<br/>
                                </h2>
                                <span>На сайте с октября 2020 г.</span>
                            </div>
                        </div>
                        <div>
                            <h2 className="adProfilePhone">
                                <PhoneOutlined/>&nbsp;&nbsp;
                                +992 {profileInfo.phoneNumber}
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