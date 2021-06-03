import React, {useEffect, useState} from 'react';
import {Result, Button, Spin} from "antd";
import {CheckCircleOutlined, ArrowRightOutlined} from '@ant-design/icons';
import {useHistory, useLocation} from "react-router-dom";
import AuthorizationService from "../services/AuthorizationService";

function UserConfirmation() {
    const location = useLocation();
    const history = useHistory();

    const [isUserConfirmed, setUserConfirmed] = useState(false);

    function sendUserConfirmationCode() {
        const confirmationInfo = location.pathname.replace('/confirmation/', '').split('/');
        const confirmationEmail = confirmationInfo[0];
        const confirmationCode = confirmationInfo[1];
        AuthorizationService().confirmUser({email: confirmationEmail, code: confirmationCode}, callback => {
            setUserConfirmed(true);
        })
    }

    useEffect(() => {
        sendUserConfirmationCode();
    }, []);

    return (
        isUserConfirmed ? <Result
                style={{paddingTop: '20vh'}}
                status="success"
                title="Поздравляем, Вы успешно подтвердили почту."
                extra={<Button type="primary" onClick={() => {
                    history.push('/login');
                }}>Дальше <ArrowRightOutlined/></Button>}
            />
            : <div style={{textAlign: 'center', paddingTop: '30vh'}}>
                <Spin size="large"/>
            </div>
    )
}

export default UserConfirmation;