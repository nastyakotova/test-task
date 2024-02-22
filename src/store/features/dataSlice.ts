import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DataType } from '../../assets/types';

export const dataSlice = createApi({
    reducerPath: 'dataSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://65d46b083f1ab8c634350f7b.mockapi.io/api',
    }),
    endpoints: (builder) => ({
        getItems: builder.query<DataType[], void>({
            query: () => '/items',
        }),
        getItems2: builder.query<DataType[], void>({
            query: () => '/items2',
        }),
        resetItems: builder.query<DataType[], string>({
            query: (string) => `/cancel?items=${string}`,
        }),
    }),
});

export const { useGetItemsQuery, useGetItems2Query, useResetItemsQuery } =
    dataSlice;
