import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { store } from './store/store';
import { Path } from './assets/path';
import { Home } from './pages/home';

import theme from './styles/theme.json';
import './styles/index.css';
import { dataSlice } from './store/features/dataSlice';

const router = createBrowserRouter([
    {
        path: Path.home,
        element: <Home />,
    },
]);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ApiProvider api={dataSlice}>
                <ConfigProvider theme={theme}>
                    <RouterProvider router={router} />
                </ConfigProvider>
            </ApiProvider>
        </Provider>
    </React.StrictMode>
);
