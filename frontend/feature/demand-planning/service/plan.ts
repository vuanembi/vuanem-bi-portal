import { request } from './api';

export type Plan = {
    id: number;
    name: string;
    startOfForecastWeek: string;
    status: string;
    vendor: {
        name: string;
    };
    createdAt: string;
    updatedAt: string;
};

export type CreatePlanDto = {
    name: string;
    startOfForecastWeek: string;
    classes: number[];
};

export const create = (data: CreatePlanDto) =>
    request({ url: '/plan', method: 'POST', data });

export const get = () => request<Plan[]>({ url: '/plan' });

export const getOne = (id: number) => request<Plan>({ url: `/plan/${id}` });

export const updateStatus = (endpoint: string) => (id: number) =>
    request({ url: `/plan/${id}/${endpoint}` });
