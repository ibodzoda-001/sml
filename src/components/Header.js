import React from 'react'
import {Button, Menu, Dropdown} from "antd";
import {CaretDownOutlined, LoginOutlined, FormOutlined} from '@ant-design/icons';
import logo from '../logo.png'

function Header() {
    return (
        <div className="site-page-header">
            <div className="container" style={{display: 'flex', height: 'fit-content'}}>
                <img src={logo} alt=""/>

                <div style={{marginLeft: 'auto'}}>
                    <Dropdown placement="bottomRight" overlay={
                        (<Menu>
                            <Menu.Item>
                                <a>
                                    <LoginOutlined /> Вход
                                </a>
                            </Menu.Item>
                            <Menu.Item>
                                <a>
                                    <FormOutlined /> Регистрация
                                </a>
                            </Menu.Item>
                        </Menu>)
                    }>
                        <Button type="link">
                            Вход и регистрация
                            <CaretDownOutlined/>
                        </Button>
                    </Dropdown>

                    <Button size={'middle'} type="primary" style={{marginLeft: '10px'}}>Подать объявление</Button>
                </div>
            </div>
        </div>
    )
}

export default Header;