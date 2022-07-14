import { request } from './api';
import { PlanItem } from './plan-item.service';

export type Plan = {
    id: number;
    name: string;
    startOfForecastWeek: string;
    status: string;
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

export const getOneItems = (id: number) => () =>
    request<PlanItem[]>({ url: `/plan/${id}/plan-item` });

export const updateStatus = (endpoint: string) => (id: number) =>
    request({ url: `/plan/${id}/${endpoint}`, method: 'PUT' });
