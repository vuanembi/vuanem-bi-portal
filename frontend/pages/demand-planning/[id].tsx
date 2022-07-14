import type { NextPage, GetServerSideProps } from 'next';

import { VStack } from '@chakra-ui/react';

import { getOne } from '../../feature/demand-planning/service/plan.service';

import { PlanProvider } from '../../feature/demand-planning/service/plan.context';
import { Plan as PlanPageProps } from '../../feature/demand-planning/service/plan.service';

import Header from '../../feature/demand-planning/component/PlanDetails/Header/Header';
import Workbench from '../../feature/demand-planning/component/PlanDetails/Workbench/Workbench';

const Plan: NextPage<{ plan: PlanPageProps }> = ({ plan }) => {
    return (
        <PlanProvider plan={plan}>
            <VStack alignItems="stretch">
                <Header />
                <Workbench />
            </VStack>
        </PlanProvider>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

    if (typeof id === 'string') {
        const plan = await getOne(+id);

        return {
            props: {
                title: `${plan.name} | Demand Planning`,
                plan,
            },
        };
    }

    return {
        props: {},
    };
};

export default Plan;
