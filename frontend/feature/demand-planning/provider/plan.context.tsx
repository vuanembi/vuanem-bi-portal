import { useContext, createContext, PropsWithChildren } from 'react';

import { Plan } from '../service/plan.api';
import { PlanStatus, PlanConfig, planConfigs } from '../service/plan.config';

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

export const usePlan = () => useContext(PlanContext);
