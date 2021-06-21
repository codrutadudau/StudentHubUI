import React from 'react';
import { useTimer } from 'react-timer-hook';

export default function Timer({ expiryTimestamp, onExpire, className }) {
    const {
        seconds,
        minutes,
        hours,
    } = useTimer({ expiryTimestamp, onExpire });

    return (
        <div className={className}>
            <span>{hours / 10}</span><span>{hours > 9 ? hours % 10 : hours}</span>:
            <span>{minutes > 9 ? parseInt(minutes / 10) : 0}</span><span>{minutes > 9 ? minutes % 10 : minutes}</span>:
            <span>{seconds > 9 ? parseInt(seconds / 10) : 0}</span><span>{seconds > 9 ? seconds % 10 : seconds}</span>
        </div>
    );
}
