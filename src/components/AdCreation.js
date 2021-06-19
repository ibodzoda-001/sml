import React, {useEffect, useState} from 'react'
import {Form, Input, Button, Checkbox, Divider, Cascader, Upload, Modal, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import AdCreationService from "../services/AdCreationService";
import _ from 'lodash'
import {useHistory} from "react-router-dom";

const {TextArea} = Input;

function AdCreation() {
    const [form] = Form.useForm();
    const history = useHistory();

    const [categories, setCategories] = useState([]);
    const [mapOfCategories, setMapOfCategories] = useState(new Map());
    const [mapOfFields, setMapOfFields] = useState(new Map());


    const [selectedCategoryInfo, setSelectedCategoryInfo] = useState(null);
    let [adTitle, setAdTitle] = useState('');
    let [adBargain, setAdBargain] = useState(false);
    let [adPrice, setAdPrice] = useState(null);
    let [adPhoneNumber, setAdPhoneNumber] = useState('');
    let [adDescription, setAdDescription] = useState('');
    let [buttonLoading, setButtonLoading] = useState(false);


    const [fileList, setFileList] = useState([]);
    const [uploadedFilesIds, setUploadedFileIds] = useState([]);
    const previewVisible = false;
    const previewImage = '';
    const previewTitle = '';

    function createNewAd() {
        setButtonLoading(true);
        const fields = [];
        for (let [key, value] of mapOfFields) {
            fields.push({id: key, value: value})
        }
        const obj = {
            categoryID: selectedCategoryInfo.id,
            title: adTitle,
            price: adPrice,
            bargain: adBargain,
            phoneNumber: adPhoneNumber,
            description: adDescription,
            pictures: uploadedFilesIds,
            fields: fields
        }

        AdCreationService().createNewAd(obj,
            (response) => {
                history.push('/main');
                message.success('Ваше объявление успешно создано и отправлено на модерацию.');
            }, (error) => {

            })
    }

    function setCategoriesMap(categories) {
        categories.forEach((category) => {
            const mapOfCategoriesDuplicate = mapOfCategories;
            mapOfCategoriesDuplicate.set(category.value, category);
            setMapOfCategories(mapOfCategoriesDuplicate);
            setCategoriesMap(category.children);
        })
    }

    function handleImageUpload(files) {
        const formData = new FormData();
        formData.append(
            "picture",
            files.file,
            files.file.name
        );
        const fileListDuplicate = _.cloneDeep(files.fileList);

        fileListDuplicate[fileListDuplicate.length - 1].status = 'uploading';
        setFileList(fileListDuplicate);
        AdCreationService().uploadImage(formData, response => {
            setUploadedFileIds([response['imageID'], ...uploadedFilesIds]);
            setFileList(files.fileList);
        })

    }

    useEffect(() => {
        AdCreationService().getCategories(
            (data) => {
                setCategoriesMap(data.categories);
                setCategories(data.categories);
            }, (error) => {
            })
    }, []);

    return (
        <div style={{display: 'flex'}}>
            <div style={{marginLeft: 'auto', marginRight: 'auto', width: '40vw'}}>
                <Form form={form} layout={'vertical'} name="control-hooks" onFinish={createNewAd}>
                    <Form.Item name="category" label="Категория"
                               rules={[{required: true, message: 'Выберите категорию.'}]}>
                        <Cascader options={categories} onChange={(selectedCategoryIds) => {
                            if (selectedCategoryIds.length !== 0) {
                                setSelectedCategoryInfo(mapOfCategories.get(selectedCategoryIds[selectedCategoryIds.length - 1]));
                            } else {
                                setSelectedCategoryInfo(null);
                            }
                        }} placeholder="Выберите категорию"/>
                    </Form.Item>

                    {
                        selectedCategoryInfo !== null ?
                            <>
                                {
                                    selectedCategoryInfo.info.map((categoryInfo, categoryIndex) => {
                                        return (
                                            <Form.Item
                                                key={categoryIndex}
                                                name={categoryInfo.title}
                                                rules={[{
                                                    required: true,
                                                    message: `Введите ${categoryInfo.title}.`
                                                }]}>
                                                <Input addonBefore={categoryInfo.title}
                                                       placeholder={`Введите ${categoryInfo.title}`}
                                                       onChange={(event) => {
                                                           mapOfFields.set(categoryInfo.id, event.target.value);
                                                           setMapOfFields(mapOfFields);
                                                       }
                                                       }/>
                                            </Form.Item>
                                        )
                                    })
                                }
                                <Divider/>
                            </>
                            : null
                    }

                    <div style={{display: 'flex'}}>
                        <Form.Item style={{width: '100%'}} name="price" label="Цена"
                                   rules={[{required: true, message: 'Введите цену.'}]}>
                            <Input type="number" placeholder="Введите цену" onChange={(event) => {
                                setAdPrice(event.target.value)
                            }}/>
                        </Form.Item>
                        <Checkbox onChange={(event) => {
                            setAdBargain(event.target.checked);
                        }} style={{marginLeft: '10px', marginTop: '33px'}}>Торг.</Checkbox>
                    </div>

                    <Form.Item name="title" label="Заголовок" rules={[{required: true, message: 'Введите заголовок.'}]}>
                        <Input placeholder="Введите заголовок" onChange={(event) => {
                            setAdTitle(event.target.value);
                        }}/>
                    </Form.Item>
                    <Form.Item name="phoneNumber" label="Телефон"
                               rules={[{required: true, message: 'Введите номер телефона.'}]}>
                        <Input placeholder="Введите номер телефона" onChange={(event) => {
                            setAdPhoneNumber(event.target.value);
                        }}/>
                    </Form.Item>
                    <Form.Item name="description" label="Описание"
                               rules={[{required: true, message: 'Введите описание.'}]}>
                        <TextArea onChange={(event) => {
                            setAdDescription(event.target.value);
                        }} placeholder="Введите описание" rows={4}/>
                    </Form.Item>

                    <>
                        <div style={{marginBottom: '10px'}}>Фотографии</div>
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={handleImageUpload}
                            beforeUpload={() => false}>
                            {fileList.length >= 8 ? null : (
                                <div>
                                    <PlusOutlined/>
                                    <div style={{marginTop: 8}}>Upload</div>
                                </div>
                            )}
                        </Upload>
                        <Modal
                            visible={previewVisible}
                            title={previewTitle}
                            footer={null}
                            onCancel={() => {
                            }}
                        >
                            <img alt="example" style={{width: '100%'}} src={previewImage}/>
                        </Modal>
                    </>

                    <Form.Item style={{textAlign: 'end'}}>
                        <div>
                            <Button type="primary" loading={buttonLoading} htmlType="submit">
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