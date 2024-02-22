import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';

import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { store } from './store/store';
import { Home } from './pages/home';

import theme from './styles/theme.json';
import './styles/index.css';
import { dataSlice } from './store/features/dataSlice';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ApiProvider api={dataSlice}>
                <ConfigProvider theme={theme}>
                    <Home />
                </ConfigProvider>
            </ApiProvider>
        </Provider>
    </React.StrictMode>
);
