import React from 'react';
import styled from 'styled-components';
import { Layout as AntLayout, theme } from 'antd';
import { Header } from './header';

type Props = {
    children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
    const {
        token: { colorBgContainer, borderRadius },
    } = theme.useToken();

    return (
        <LayoutContainer>
            <Header />
            <AntLayout.Content
                style={{ background: colorBgContainer, borderRadius }}
            >
                {children}
            </AntLayout.Content>
        </LayoutContainer>
    );
};

const LayoutContainer = styled.div`
    width: 80%;
    height: 100%;
    margin-inline: auto;
    display: flex;
    gap: 20px;
    flex-direction: column;
    padding: 20px 0;
`;
