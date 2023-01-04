import { useState, useEffect } from 'react';

import { formatUIDistance, tenSecondInMs } from '../../utils.ts/date.utils';

export const useFormatDistance = (date: string) => {
    const [dateDistance, setDistance] = useState(formatUIDistance(date));

    useEffect(() => {
        const timer = setInterval(
            () => setDistance(formatUIDistance(date)),
            tenSecondInMs
        );

        return () => clearInterval(timer);
    }, [dateDistance, setDistance, date]);

    return dateDistance;
};
