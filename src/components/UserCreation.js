import React, {useState} from 'react'
import AuthorizationService from '../services/AuthorizationService'
import {Card, Input, Button, Form, notification} from 'antd'
import {UserOutlined, LockOutlined, MailOutlined, EyeTwoTone, EyeInvisibleOutlined} from '@ant-design/icons';
import {useHistory} from "react-router-dom";

function UserCreation(callback) {
    const history = useHistory();

    const cardStyle = {
        width: "350px",
        borderRadius: "5px",
        marginTop: '10vh',
        boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"
    }
    const openNotificationWithIcon = type => {
        notification[type]({
            description: 'Вы успешно зарегистрировались, проверьте почту для подтверждения аккаунта.'
        });
    };

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);

    function createUser() {
        setButtonLoading(true);
        AuthorizationService().createUser({email: email, password: password, username: username}, callback => {
            openNotificationWithIcon('success');
            history.push('/main');
            setButtonLoading(false);
        })
    }

    return (
        <div className="site-card-border-less-wrapper" style={{display: 'flex', justifyContent: 'center'}}>
            <Card bordered={true} style={cardStyle}>
                <h3 style={{textAlign: 'center'}}>Регистрация</h3>
                <Form onFinish={createUser}>
                    <Form.Item
                        style={{marginBottom: '15px'}}
                        name="username"
                        rules={[{required: true, message: 'Введите имя пользователя.'}]}>
                        <Input
                            size={'middle'}
                            placeholder="Введите имя пользователя"
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}
                            prefix={<UserOutlined/>}/>
                    </Form.Item>

                    <Form.Item
                        style={{marginBottom: '15px'}}
                        name="email"
                        rules={[{required: true, message: 'Введите e-mail.'}]}>
                        <Input
                            size={'middle'}
                            placeholder="Введите e-mail"
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }}
                            prefix={<MailOutlined/>}/>
                    </Form.Item>

                    <Form.Item
                        style={{marginBottom: '15px'}}
                        name="password"
                        rules={[{required: true, message: 'Введите пароль.'}]}>
                        <Input.Password
                            size={'middle'}
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                            placeholder="Придумайте пароль"
                            prefix={<LockOutlined/>}
                            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                        />
                    </Form.Item>
                    <Form.Item style={{marginBottom: '0px', float: 'right'}}>
                        <Button size={'middle'}
                                loading={buttonLoading}
                                type="primary"
                                htmlType="submit">
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default UserCreation
