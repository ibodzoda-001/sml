import React, {useState} from 'react'
import {Card, Input, Button, Typography, Form} from 'antd'
import {MailOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined} from '@ant-design/icons';
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';
import Actions from "../store/actions";
import AuthenticationService from '../services/AuthenticationService'

const {Text} = Typography;

function Login(callback) {
    const dispatch = useDispatch();
    const history = useHistory();

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [isUnauthorizedTextVisible, setUnauthorizedTextVisibility] = useState(false);
    let [buttonLoading, setButtonLoading] = useState(false);

    function authenticateUser() {
        setButtonLoading(true);
        AuthenticationService().authenticate({username: email, password: password}, (response) => {
            setButtonLoading(false);
            // localStorage.setItem('credentials', JSON.stringify(response));
            localStorage.setItem('credentials', JSON.stringify({id: 1, userType: 'administrator', token: response.token}));
            dispatch(Actions().setSignIn());
            // dispatch({type: response.userType});
            dispatch({type: 'administrator'});
        }, (error) => {
            setButtonLoading(false);
            if (error.status === 403 || error.status === 401) {
                setUnauthorizedTextVisibility(true);
            }
        })
    }

    return (
        <div className="site-card-border-less-wrapper" style={{display: 'flex', justifyContent: 'center'}}>


            <div style={{marginTop: '10vh'}}>
                <Card bordered={true} className="cardStyle">
                    <h3 style={{textAlign: 'center'}}>Авторизация</h3>
                    <Form
                        onFinish={authenticateUser}>
                        <Form.Item
                            style={{marginBottom: '15px'}}
                            name="email"
                            rules={[{required: true, message: 'Введите e-mail.'}]}>
                            <Input
                                size={'middle'}
                                placeholder="Введите e-mail"
                                style={{marginTop: '15px'}}
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
                                placeholder="Введите пароль"
                                prefix={<LockOutlined/>}
                                iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                            />
                        </Form.Item>
                        {
                            isUnauthorizedTextVisible
                                ? <div style={{marginTop: '10px'}}>
                                    <Text type="danger">* Пользователь не найден.</Text>
                                </div>
                                : ''
                        }

                        <Form.Item style={{margin: '0px'}}>
                            <Button size={'middle'}
                                    loading={buttonLoading}
                                    type="primary"
                                    style={{float: 'right'}}
                                    htmlType="submit">
                                Вход
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                <div style={{marginTop: '20px', textAlign: 'center'}}>Еще не зарегистрировались? <a onClick={() => {
                    history.push('/user-creation');
                }}>Зарегистрируйтесь.</a></div>
            </div>
        </div>
    )
}

export default Login
