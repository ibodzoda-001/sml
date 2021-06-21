import React, {useEffect, useState} from 'react';
import {Result, Button, Spin} from "antd";
import {CheckCircleOutlined, ArrowRightOutlined} from '@ant-design/icons';
import {useHistory, useLocation, useParams} from "react-router-dom";
import AuthorizationService from "../services/AuthorizationService";

function UserConfirmation() {
    const history = useHistory();

    const {email, code} = useParams();

    const [isUserConfirmed, setUserConfirmed] = useState(false);

    function sendUserConfirmationCode() {
        AuthorizationService().confirmUser({email: email, code: code}, callback => {
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