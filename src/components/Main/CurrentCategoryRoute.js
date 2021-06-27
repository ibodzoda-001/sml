import { Breadcrumb } from 'antd';

function CurrentCategoryRoute() {
    return (
        <Breadcrumb style={{marginBottom: '15px'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
                <a href="">Application Center</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <a href="">Application List</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default CurrentCategoryRoute;