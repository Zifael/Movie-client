import React from 'react';
import s from './style.module.scss';
import { CheckOutlined } from '@ant-design/icons'

type Props = {
    message: string
}

export function SuccessCompletedCard({ message }: Props) {
    return (
        <div className={s.succes__wraper}>
            <h2>{message}</h2>
            <CheckOutlined />
        </div>
    );
}

