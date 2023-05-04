import React from 'react';
import s from './style.module.scss'

export function MessageInfo({ message }: { message: string }) {
    return (
        <div className={s.messageInfo}>
            <h1>{message}</h1>
        </div>
    );
}

