import { request } from './api';

export type Class = {
    id: number;
    sku: string;
    name: string;
};

export const get = () => request<Class[]>({ url: '/class' });
