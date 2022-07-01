import type { NextPage, GetServerSideProps } from 'next';

import { VStack } from '@chakra-ui/react';

import { apiClient } from '../../feature/demand-planning/lib';

import Header from '../../feature/demand-planning/component/PlanDetails/Header/Header';

import { Plan as PlanPageProps } from '../../feature/demand-planning/type';

const Plan: NextPage<{ plan: PlanPageProps }> = ({ plan }) => {
    return (
        <VStack alignItems="stretch">
            <Header {...plan} />
            <h1>{JSON.stringify(plan)}</h1>
        </VStack>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

    const plan = await apiClient.get(`/plan/${id}`).then(({ data }) => data);

    return {
        props: {
            title: `${plan.name} | Demand Planning`,
            plan,
        },
    };
};

export default Plan;
