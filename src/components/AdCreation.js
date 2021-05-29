import React from 'react'
import { Form, Input, Button, Select } from 'antd';

const { TextArea } = Input;


function AdCreation() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };


    return (
        <div style={{display: 'flex'}}>
            <div style={{marginLeft: 'auto', marginRight: 'auto', width: '40vw'}}>
                <Form form={form} name="control-hooks" onFinish={onFinish}>
                    <Form.Item name="title" label="Заголовок" rules={[{ required: true }]}>
                        <Input placeholder="Введите заголовок" />
                    </Form.Item>
                    <Form.Item name="description" label="Описание" rules={[{ required: true }]}>
                        <TextArea placeholder="Введите описание" rows={4} />
                    </Form.Item>

                    <Form.Item style={{textAlign: 'end'}}>
                        <div>
                            <Button htmlType="button" style={{marginRight: '15px'}} onClick={onReset}>
                                Очистить
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Создать
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default AdCreation;