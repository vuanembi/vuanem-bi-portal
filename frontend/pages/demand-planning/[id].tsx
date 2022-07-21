import type { NextPage, GetServerSideProps } from 'next';

import { VStack } from '@chakra-ui/react';
import Header from '../../feature/demand-planning/component/PlanDetails/Header/Header';
import Workbench from '../../feature/demand-planning/component/PlanDetails/Workbench/Workbench';
import { PlanProvider } from '../../feature/demand-planning/provider/plan.context';
import * as PlanService from '../../feature/demand-planning/service/plan.api';

const Plan: NextPage<{ plan: PlanService.Plan }> = ({ plan }) => {
    return (
        <PlanProvider plan={plan}>
            <VStack alignItems="stretch" maxH="80%">
                <Header />
                <Workbench />
            </VStack>
        </PlanProvider>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

    if (typeof id === 'string') {
        const plan = await PlanService.getOne(+id);

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
