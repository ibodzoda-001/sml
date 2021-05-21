import React, {useState} from 'react'
import AuthorizationService from '../services/AuthorizationService'
import {Card, Input, Button} from 'antd'
import {UserOutlined, LockOutlined, MailOutlined, EyeTwoTone, EyeInvisibleOutlined} from '@ant-design/icons';
import {useDispatch} from "react-redux";

function UserCreation(callback) {
    const dispatch = useDispatch();

    const cardStyle = {
        width: "350px",
        borderRadius: "5px",
        marginTop: '10vh',
        boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"
    }

    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    function createUser() {
        AuthorizationService().createUser({email: email, password: password, name: name, surname: name}, callback => {
            console.log(callback);
        })
    }

    return (
        <div className="site-card-border-less-wrapper" style={{display: 'flex', justifyContent: 'center'}}>
            <Card bordered={true} style={cardStyle}>
                <h3 style={{textAlign: 'center'}}>Регистрация</h3>
                <form>
                    <Input
                        size={'middle'}
                        placeholder="Введите имя"
                        style={{marginTop: '15px'}}
                        onChange={(event) => {
                            setName(event.target.value)
                        }}
                        prefix={<UserOutlined/>}/>
                    <Input
                        size={'middle'}
                        placeholder="Введите e-mail"
                        style={{marginTop: '15px'}}
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                        prefix={<MailOutlined/>}/>
                    <Input.Password
                        style={{marginTop: '15px'}}
                        size={'middle'}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                        placeholder="Придумайте пароль"
                        prefix={<LockOutlined/>}
                        iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                    />
                    <Button size={'middle'}
                            type="primary"
                            style={{marginTop: '15px', float: 'right'}}
                            onClick={() => {
                                createUser();
                            }}>
                        Зарегистрироваться
                    </Button>
                </form>
            </Card>
        </div>
    )
}

export default UserCreation
