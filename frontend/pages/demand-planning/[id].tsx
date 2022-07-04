import type { NextPage, GetServerSideProps } from 'next';

import { createContext, useState } from 'react';

import { VStack } from '@chakra-ui/react';

import { apiClient } from '../../feature/demand-planning/lib';

import { PlanContext } from '../../feature/demand-planning/context';

import Header from '../../feature/demand-planning/component/PlanDetails/Header/Header';
import Workbench from '../../feature/demand-planning/component/PlanDetails/Workbench/Workbench';

import { Plan as PlanPageProps } from '../../feature/demand-planning/types';

const Plan: NextPage<{ plan: PlanPageProps }> = ({ plan }) => {
    const [updates, setUpdates] = useState<number>(0);

    

    return (
        <PlanContext.Provider value={{ plan, updates }}>
            <VStack alignItems="stretch">
                <Header plan={plan} updates={updates} />
                <Workbench {...plan} />
            </VStack>
        </PlanContext.Provider>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

    const plan = await apiClient
        .get(`/plan/${id}`)
        .then(({ data }) => data)
        .catch((err) => console.log(err));

    return {
        props: {
            title: `${plan.name} | Demand Planning`,
            plan,
        },
    };
};

export default Plan;
