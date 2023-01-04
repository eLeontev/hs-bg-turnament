import { format, formatDistance, formatDistanceToNow } from 'date-fns';

export const UIdateFormat = 'MM/dd/yy H:m::s';
export const tenSecondInMs = 10000;

export const formatToUI = (date: string) =>
    format(new Date(date), UIdateFormat);

export const formatUIDistance = (date: string) =>
    `${formatDistanceToNow(new Date(date), { includeSeconds: true })} ago`;
