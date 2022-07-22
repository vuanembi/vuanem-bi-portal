import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { VStack } from '@chakra-ui/react';
import Header from '../../feature/demand-planning/component/PlanDetails/Header/Header';
import Workbench from '../../feature/demand-planning/component/PlanDetails/Workbench/Workbench';
import { PlanProvider } from '../../feature/demand-planning/provider/plan.context';
import * as PlanService from '../../feature/demand-planning/service/plan.api';

const Plan: NextPage = () => {
    const { query } = useRouter();
    const { id } = query;

    const { data: plan } = useQuery(['plan', id], () => PlanService.getOne(id));

    if (!plan) return null;

    return (
        <PlanProvider plan={plan}>
            <VStack alignItems="stretch" maxH="80%">
                <Header />
                <Workbench />
            </VStack>
        </PlanProvider>
    );
};

export default Plan;
