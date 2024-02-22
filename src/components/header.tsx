import { Layout, Space, theme } from 'antd';
import { JavaScriptOutlined } from '@ant-design/icons';

export const Header = () => {
    const {
        token: { colorBgContainer, borderRadius, colorPrimary },
    } = theme.useToken();

    return (
        <Layout.Header style={{ background: colorBgContainer, borderRadius }}>
            <Space>
                <JavaScriptOutlined style={{ color: colorPrimary }} />
            </Space>
        </Layout.Header>
    );
};
