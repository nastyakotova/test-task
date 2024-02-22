import React, { useEffect, useState } from 'react';
import { Button, Table, Typography } from 'antd';
import { Layout } from '../components/layout';
import { DataType } from '../assets/types';
import {
    useGetItemsQuery,
    useGetItems2Query,
    dataSlice,
} from '../store/features/dataSlice';
import { concatItems } from '../assets/concatItems';
import { Modal } from '../components/modal';
import type { TableProps } from 'antd';

type TableRowSelection<T> = TableProps<T>['rowSelection'];

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        sorter: (a, b) => Number(a.quantity) - Number(b.quantity),
    },
    {
        title: 'DeliveryDate',
        key: 'deliveryDate',
        render: (_, record) => new Date(record.deliveryDate).toDateString(),
        sorter: (a, b) =>
            new Date(a.deliveryDate).getDate() -
            new Date(b.deliveryDate).getDate(),
    },
    {
        title: 'Price',
        key: 'price',
        render: (_, record) => `${record.price} ${record.currency}`,
        defaultSortOrder: 'ascend',
        sorter: (a, b) => Number(a.price) - Number(b.price),
    },
];

export const Home = () => {
    const [rows, setRows] = useState<DataType[]>([]);
    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
    const [quantitySummary, setQuantitySummary] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    const rowSelection: TableRowSelection<DataType> = {
        onChange: (_, selectedRows: DataType[]) => {
            setQuantitySummary(
                selectedRows.reduce(
                    (sum: number, row: DataType) => sum + Number(row.quantity),
                    0
                )
            );
            setSelectedRows(selectedRows);
        },
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };

    const { data: items, isSuccess: itemsIsSuccess } = useGetItemsQuery();
    const { data: items2, isSuccess: items2IsSuccess } = useGetItems2Query();

    const [trigger, { isError }] =
        dataSlice.endpoints.resetItems.useLazyQuery();

    useEffect(() => {
        if (itemsIsSuccess && items2IsSuccess) {
            setRows(concatItems(items, items2));
        }
    }, [items, items2, items2IsSuccess, itemsIsSuccess]);

    useEffect(() => {
        if (isError) {
            setConfirmLoading(false);
            setOpen(false);
        }
    }, [isError]);

    const showModal = () => setOpen(true);

    const handleOk = () => {
        setConfirmLoading(true);
        const list = selectedRows.map((row) => row.id).join(',');
        trigger(list);
    };

    const handleCancel = () => setOpen(false);

    return (
        <Layout>
            <Table
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={rows}
            />
            <Typography.Text strong style={{ padding: 20 }}>
                Quantity Summary: {quantitySummary}
            </Typography.Text>
            <Button type='primary' onClick={showModal}>
                Cancel
            </Button>
            <Modal
                open={open}
                handleOk={handleOk}
                confirmLoading={confirmLoading}
                handleCancel={handleCancel}
                title='Cancel'
            >
                <p>
                    {`Are you sure? Selected items: ${selectedRows
                        .map((row) => row.name)
                        .join(', ')}`}
                </p>
            </Modal>
        </Layout>
    );
};
