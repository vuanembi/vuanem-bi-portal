import { useContext, createContext, PropsWithChildren } from 'react';

import * as PlanService from '../service/plan.api';
import * as PlanConfig from '../service/plan.config';

export type PlanContextProps = {
    plan: PlanService.Plan;
    config: PlanConfig.PlanConfig;
};

export type PlanProviderProps = PropsWithChildren & {
    plan: PlanService.Plan;
};

export const PlanContext = createContext<PlanContextProps>(
    {} as PlanContextProps,
);

export const PlanProvider = ({ plan, children }: PlanProviderProps) => {
    const value = {
        plan,
        config: PlanConfig.planConfigs[plan.status as PlanConfig.PlanStatus],
    };

    return (
        <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
    );
};

export const usePlan = () => useContext(PlanContext);
