import React from 'react'
import { List, Avatar, Space } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'https://ant.design',
        title: `Car ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);


function ProductsModerationList() {
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={null}
            dataSource={listData}
            renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[
                        <IconText icon={EyeOutlined} text="156" key="list-vertical-star-o" />,
                    ]}
                    extra={
                        <img
                            width={272}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                    />
                    {item.content}
                </List.Item>
            )}
        />
    )
}

export default ProductsModerationList;