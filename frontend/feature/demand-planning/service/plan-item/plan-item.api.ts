import { request } from '../api';

import { PlanItem } from './plan-item.type';

export const updateOne = (data: PlanItem) =>
    request<any>({ url: `/plan/${data.id}`, data });
