import { createContext } from 'react';

import { Plan } from '../service/plan';

export type PlanContextProps = {
    plan: Plan;
    updates: number;
};

// @ts-expect-error
export const PlanContext = createContext<PlanContextProps>({ updates: 0 });
