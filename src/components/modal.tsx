import React from 'react';
import { Modal as AntModal } from 'antd';

type Props = {
    open: boolean;
    handleOk: () => void;
    confirmLoading: boolean;
    handleCancel: () => void;
    title: string;
    children: React.ReactNode;
};

export const Modal = ({
    open,
    handleOk,
    confirmLoading,
    handleCancel,
    title,
    children,
}: Props) => {
    return (
        <AntModal
            title={title}
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            {children}
        </AntModal>
    );
};
