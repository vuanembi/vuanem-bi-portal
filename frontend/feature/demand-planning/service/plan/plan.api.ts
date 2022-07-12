import { request } from '../api';

import { Plan, CreatePlanDto } from './plan.type';

export const create = (data: CreatePlanDto) =>
    request({ url: '/plan', method: 'POST', data });

export const get = () => request<Plan[]>({ url: '/plan' });

export const getOne = (id: number) => request<Plan>({ url: `/plan/${id}` });

export const forecastOne = (id: number) =>
    request<Plan>({ url: `/plan/${id}/forecast` });

export const reviewOne = (id: number) =>
    request<Plan>({ url: `/plan/${id}/review` });
