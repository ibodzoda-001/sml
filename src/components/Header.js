import React from 'react'
import {Button, Menu, Modal, Dropdown, message} from "antd";
import {
    UserOutlined,
    CaretDownOutlined,
    OrderedListOutlined,
    LoginOutlined,
    LogoutOutlined,
    FormOutlined
} from '@ant-design/icons';
import logo from '../logo.png'
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import Api from "../helpers/Api";
import baseUrl from "../helpers/BaseUrl";

function Header() {
    const history = useHistory();
    const dispatch = useDispatch();

    const userCredentials = useSelector(((state) => {
        return state.userCredentials;
    }));

    return (
        <div className="site-page-header">
            <div className="container" style={{display: 'flex', height: 'fit-content'}}>
                <img src={logo} alt="" style={{cursor: 'pointer'}} onClick={() => {
                    history.push('/main')
                }}/>

                <div style={{marginLeft: 'auto'}}>
                    <Button style={{marginRight: '15px'}} size={'middle'} type="primary"
                            onClick={() => {
                                if (userCredentials !== null) {
                                    history.push('/new-ad')
                                } else {
                                    message.warning('Авторизуйтесь, чтобы создать объявление.');
                                    history.push('/login')
                                }
                            }}>Подать объявление</Button>

                    {/*<Button style={{marginRight: '15px'}} size={'middle'} type="primary"
                            onClick={() => {
                                Api().delete(baseUrl + '/products/all').then((response) => {
                                    console.log(response.data
                                    )
                                })
                            }}>Удалить</Button>*/}

                    {
                        userCredentials !== null
                            ? <Dropdown placement="bottomRight" overlay={
                                (<Menu>
                                    {
                                        userCredentials && userCredentials.userType === 'admin'
                                            ? <Menu.Item key={1}>
                                                <a onClick={() => {
                                                    history.push('/ad-moderation')
                                                }}>
                                                    <OrderedListOutlined/> Модерация
                                                </a>
                                            </Menu.Item>
                                            : null
                                    }
                                    <Menu.Item key={2}>
                                        <a onClick={() => {
                                            Modal.confirm({
                                                title: 'Подтверждение',
                                                icon: <LogoutOutlined/>,
                                                content: 'Вы действительно хотите выйти?',
                                                okText: 'Да',
                                                cancelText: 'Нет',
                                                onOk: function () {
                                                    localStorage.removeItem('credentials');
                                                    dispatch({type: 'REMOVE_USER_CREDENTIALS'});
                                                }
                                            });
                                        }}>
                                            <LogoutOutlined/> Выйти
                                        </a>
                                    </Menu.Item>
                                </Menu>)
                            }>
                                <Button type="link">
                                    <UserOutlined/>&nbsp;
                                    {userCredentials.username}
                                    <CaretDownOutlined/>
                                </Button>
                            </Dropdown>
                            : <Dropdown placement="bottomRight" overlay={
                                (<Menu>
                                    <Menu.Item key={1}>
                                        <a onClick={() => {
                                            history.push('/login')
                                        }}>
                                            <LoginOutlined/> Вход
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item key={2}>
                                        <a onClick={() => {
                                            history.push('/user-creation')
                                        }}>
                                            <FormOutlined/> Регистрация
                                        </a>
                                    </Menu.Item>
                                </Menu>)
                            }>
                                <Button type="link">
                                    Вход и регистрация
                                    <CaretDownOutlined/>
                                </Button>
                            </Dropdown>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;