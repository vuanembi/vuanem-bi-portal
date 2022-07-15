import { createContext, PropsWithChildren } from 'react';

import { Plan } from './plan.api';
import { PlanStatus, PlanConfig, planConfigs } from './plan.config';

export type PlanContextProps = {
    plan: Plan;
    config: PlanConfig;
};

export type PlanProviderProps = PropsWithChildren & {
    plan: Plan;
};

export const PlanContext = createContext<PlanContextProps>(
    {} as PlanContextProps,
);

export const PlanProvider = ({ plan, children }: PlanProviderProps) => {
    const value = {
        plan,
        config: planConfigs[plan.status as PlanStatus],
    };

    return (
        <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
    );
};
