import type { NextPage, GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';

import { Flex, VStack, HStack, Button, useDisclosure } from '@chakra-ui/react';

import { apiClient } from '../../feature/demand-planning/lib';

import Info from '../../feature/demand-planning/component/PlanDetails/Header/InfoBar';

import { Plan as PlanPageProps } from '../../feature/demand-planning/type';

const Plan: NextPage<{ plan: PlanPageProps }> = ({ plan }) => {
    return (
        <VStack alignItems="stretch">
            <Info {...plan} />
            <h1>{JSON.stringify(plan)}</h1>
        </VStack>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

    const plan = await apiClient.get(`/plan/${id}`).then(({ data }) => data);

    console.log(plan);

    return {
        props: {
            title: `${plan.name} | Demand Planning`,
            plan,
        },
    };
};

export default Plan;
