import React from 'react'
import {useHistory} from 'react-router-dom'
import {List, Space} from 'antd';
import {EyeOutlined} from '@ant-design/icons';

function AdsModerationList() {
    const listData = [];
    const history = useHistory();
    for (let i = 0; i < 23; i++) {
        listData.push({
            id: i,
            title: (<div style={{display: 'flex'}}>
                <h3>Car {i}</h3>
                <div style={{marginLeft: 'auto'}}>
                    <h4 style={{backgroundColor: '#389e0d', padding: '7px', borderRadius: '3px', color: 'white'}}>400 с.
                        Торг.</h4>
                </div>
            </div>),
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        });
    }
    const IconText = ({icon, text}) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    return (
        <>
            <List
                style={{
                    cursor: 'pointer'
                }}
                itemLayout="vertical"
                size="large"
                pagination={null}
                dataSource={listData}
                renderItem={item => (
                    <List.Item
                        onClick={() => {
                            history.push(`/ad/${item.id}`);
                        }}
                        key={item.title}
                        actions={[
                            <IconText icon={EyeOutlined} text="156" key="list-vertical-star-o"/>,
                        ]}
                        extra={
                            <img
                                width={400}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </>
    )
}

export default AdsModerationList;