import React from 'react'
import {Button, Menu, Dropdown, message} from "antd";
import {CaretDownOutlined, LoginOutlined, FormOutlined} from '@ant-design/icons';
import logo from '../logo.png'
import {useHistory} from 'react-router-dom';
import {useSelector} from "react-redux";

function Header() {
    const history = useHistory();
    const isLoggedIn = useSelector(((state) => {
        return state.isLoggedIn;
    }));
    return (
        <div className="site-page-header">
            <div className="container" style={{display: 'flex', height: 'fit-content'}}>
                <img src={logo} alt="" style={{cursor: 'pointer'}} onClick={() => {
                    history.push('/main')
                }}/>

                <div style={{marginLeft: 'auto'}}>
                    <Dropdown placement="bottomRight" overlay={
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

                    <Button size={'middle'} type="primary"
                            style={{marginLeft: '10px'}}
                            onClick={() => {
                                if (isLoggedIn) {
                                    history.push('/new-ad')
                                } else {
                                    message.warning('Авторизуйтесь, чтобы создать объявление.');
                                    history.push('/login')
                                }
                            }}>Подать объявление</Button>
                </div>
            </div>
        </div>
    )
}

export default Header;