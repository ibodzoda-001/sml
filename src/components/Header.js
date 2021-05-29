import React from 'react'
import {Button, Menu, Dropdown, message} from "antd";
import {UserOutlined, CaretDownOutlined, LoginOutlined, LogoutOutlined, FormOutlined} from '@ant-design/icons';
import logo from '../logo.png'
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import Actions from "../store/actions";

function Header() {
    const history = useHistory();
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(((state) => {
        return state.isLoggedIn;
    }));
    const username = 'Ibodzoda Ibodullo';

    return (
        <div className="site-page-header">
            <div className="container" style={{display: 'flex', height: 'fit-content'}}>
                <img src={logo} alt="" style={{cursor: 'pointer'}} onClick={() => {
                    history.push('/main')
                }}/>

                <div style={{marginLeft: 'auto'}}>
                    <Button style={{marginRight: '15px'}} size={'middle'} type="primary"
                            onClick={() => {
                                if (isLoggedIn) {
                                    history.push('/new-ad')
                                } else {
                                    message.warning('Авторизуйтесь, чтобы создать объявление.');
                                    history.push('/login')
                                }
                            }}>Подать объявление</Button>

                    {
                        isLoggedIn
                            ? <Dropdown placement="bottomRight" overlay={
                                (<Menu>
                                    <Menu.Item key={1}>
                                        <a onClick={() => {
                                            localStorage.removeItem('credentials');
                                            dispatch(Actions().setSignIn());
                                            dispatch({type: 'remove-user'});
                                        }}>
                                            <LogoutOutlined/> Выйти
                                        </a>
                                    </Menu.Item>
                                </Menu>)
                            }>
                                <Button type="link">
                                    <UserOutlined/>&nbsp;
                                    {username}
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