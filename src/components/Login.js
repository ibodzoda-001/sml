import React, {useState} from 'react'
import {Card, Input, Button} from 'antd'
import {UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined} from '@ant-design/icons';

function Login(callback) {

    const cardStyle = {
        width: "350px",
        borderRadius: "5px",
        marginTop: '20vh',
        boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"
    }
    let [login, setLogin] = useState('');
    let [password, setPassword] = useState('');

    return (
        <div className="site-card-border-less-wrapper" style={{display: 'flex', justifyContent: 'center'}}>
            <Card bordered={true} style={cardStyle}>
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
                                checkUserAuthorizationData(login, password)
                            }}>
                        Вход
                    </Button>
                </form>
            </Card>
        </div>
    )
}

function checkUserAuthorizationData(login, password) {
    // authenticationService().authenticate(login, password, (userData) => {
    //
    // });
}

export default Login
