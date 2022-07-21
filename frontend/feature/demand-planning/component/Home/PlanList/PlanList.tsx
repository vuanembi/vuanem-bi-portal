import { useState, useEffect } from 'react';

import { Flex, VStack, Skeleton, Text } from '@chakra-ui/react';

import * as PlanService  from '../../../service/plan.api';
import * as PlanConfig  from '../../../service/plan.config';
import PlanCard from './PlanCard';
import Search from '../../../../../components/Search';

export type PlanListProps = {
    isLoaded: boolean;
    status: PlanService.Plan['status'];
    plans: PlanService.Plan[];
};

export const PlanList = ({ isLoaded, status, plans }: PlanListProps) => {
    const [_plans, setPlans] = useState(plans);
    const [searchTerm, setSearchTerm] = useState('');

    const { label, color } = PlanConfig.planConfigs[status as PlanConfig.PlanStatus];

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
                textColor="white"
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
                            <PlanCard key={plan.id} {...plan} />
                        ))}
                    </VStack>
                </Skeleton>
            </VStack>
        </VStack>
    );
};

export default PlanList;
