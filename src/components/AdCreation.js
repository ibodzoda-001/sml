import React from 'react'
import {Form, Input, Button, Select, Cascader, Upload, Modal} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const {TextArea} = Input;

function AdCreation() {
    const [form] = Form.useForm();

    const options = [
        {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [
                        {
                            value: 'xihu',
                            label: 'West Lake',
                        },
                    ],
                },
            ],
        },
        {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
                {
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [
                        {
                            value: 'zhonghuamen',
                            label: 'Zhong Hua Men',
                        },
                    ],
                },
            ],
        },
    ];
    const previewVisible = false;
    const previewImage = '';
    const previewTitle = '';
    const fileList = [
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-3',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-xxx',
            percent: 50,
            name: 'image.png',
            status: 'uploading',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-5',
            name: 'image.png',
            status: 'error',
        },
    ];
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );


    const onFinish = (values) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <div style={{display: 'flex'}}>
            <div style={{marginLeft: 'auto', marginRight: 'auto', width: '40vw'}}>
                <h2>Создание объявления</h2>
                <Form form={form} name="control-hooks" onFinish={onFinish}>
                    <Form.Item name="category" label="Категория"
                               rules={[{required: true, message: 'Выберите категорию.'}]}>
                        <Cascader options={options} onChange={() => {
                        }} placeholder="Выберите категорию"/>
                    </Form.Item>
                    <Form.Item name="title" label="Заголовок" rules={[{required: true, message: 'Введите заголовок.'}]}>
                        <Input placeholder="Введите заголовок"/>
                    </Form.Item>
                    <Form.Item name="description" label="Описание"
                               rules={[{required: true, message: 'Введите описание.'}]}>
                        <TextArea placeholder="Введите описание" rows={4}/>
                    </Form.Item>
                    <Form.Item name="description" label="Описание"
                               rules={[{required: true, message: 'Введите описание.'}]}>
                        <>
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={() => {}}
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            <Modal
                                visible={previewVisible}
                                title={previewTitle}
                                footer={null}
                                onCancel={() => {}}
                            >
                                <img alt="example" style={{width: '100%'}} src={previewImage}/>
                            </Modal>
                        </>
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