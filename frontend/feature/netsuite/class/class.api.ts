import { request } from '../api';

import { Class } from './class.type';

export const get = () => request<Class[]>({ url: '/class' });
