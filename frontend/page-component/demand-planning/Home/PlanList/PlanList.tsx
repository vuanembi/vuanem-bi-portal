import { useState, useEffect } from 'react';

import { Flex, VStack, Skeleton, Text } from '@chakra-ui/react';

import { planStatusStyles } from '../../../../page-lib/demand-planning';

import Plan, { PlanProps } from '../Plan/Plan';
import Search from '../../../../components/Search';

export type PlanListProps = {
    isLoaded: boolean;
    status: PlanProps['status']['name'];
    plans: PlanProps[];
};

export const PlanList = ({ isLoaded, status, plans }: PlanListProps) => {
    const [_plans, setPlans] = useState(plans);
    const [searchTerm, setSearchTerm] = useState('');

    const { label, color } = planStatusStyles[status];

    useEffect(() => {
        setPlans(
            plans
                ? plans.filter(({ name }) =>
                      name.toLowerCase().match(searchTerm.toLowerCase()),
                  )
                : [],
        );
    }, [plans, searchTerm]);

    return (
        <VStack maxH="80vh" flex="1" alignItems="stretch">
            <Flex
                p={4}
                borderWidth="1px"
                bgColor={color}
                justifyContent="center"
            >
                <Text fontWeight="bold">{label}</Text>
            </Flex>
            <Search
                borderColor={color}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <VStack overflowY="auto">
                <Skeleton w="full" isLoaded={isLoaded} height="800px">
                    <VStack overflowY="auto" alignItems="stretch">
                        {_plans.map((plan) => (
                            <Plan key={plan.id} {...plan} />
                        ))}
                    </VStack>
                </Skeleton>
            </VStack>
        </VStack>
    );
};

export default PlanList;
