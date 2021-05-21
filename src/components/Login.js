import React, {useState} from 'react'
import {Card, Input, Button} from 'antd'
import {UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined} from '@ant-design/icons';
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';
import Actions from "../store/actions";
import AuthenticationService from '../services/AuthenticationService'

function Login(callback) {
    const dispatch = useDispatch();
    const history = useHistory();

    let [login, setLogin] = useState('');
    let [password, setPassword] = useState('');

    function authenticateUser() {
        AuthenticationService().authenticate({username: login, password: password}, callback => {
            console.log(callback);
        })
    }

    return (
        <div className="site-card-border-less-wrapper" style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{marginTop: '10vh'}}>
                <Card bordered={true} className="cardStyle">
                    <h3 style={{textAlign: 'center'}}>Авторизация</h3>
                    <form>
                        <Input
                            size={'middle'}
                            placeholder="Введите e-mail"
                            style={{marginTop: '15px'}}
                            onChange={(event) => {
                                setLogin(event.target.value)
                            }}
                            prefix={<UserOutlined/>}/>
                        <Input.Password
                            style={{marginTop: '15px'}}
                            size={'middle'}
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                            placeholder="Введите пароль"
                            prefix={<LockOutlined/>}
                            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                        />
                        <Button size={'middle'}
                                type="primary"
                                style={{marginTop: '15px', float: 'right'}}
                                onClick={() => {
                                    authenticateUser()
                                }}>
                            Вход
                        </Button>
                    </form>
                </Card>
                <div style={{marginTop: '20px', textAlign: 'center'}}>Еще не зарегистрировались? <a onClick={() => {
                    history.push('/user-creation');
                }}>Зарегистрируйтесь.</a></div>
            </div>
        </div>
    )
}

export default Login
