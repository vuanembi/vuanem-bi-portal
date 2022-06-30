import { useState, useEffect } from 'react';

import { Flex, VStack, Skeleton, Text } from '@chakra-ui/react';

import Plan, { PlanData, PlanStyles } from '../Plan';
import Search from '../../../components/Search';

export type PlanListProps = {
    isLoaded: boolean;
    label: string;
    style: PlanStyles;
    plans: PlanData[];
};

const PlanList = ({ isLoaded, label, style, plans }: PlanListProps) => {
    const [_plans, setPlans] = useState(plans);
    const [searchTerm, setSearchTerm] = useState('');

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
                bgColor={style.color}
                justifyContent="center"
            >
                <Text fontWeight="bold">{label}</Text>
            </Flex>
            <Search
                borderColor={style.color}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <VStack overflowY="auto">
                <Skeleton w="full" isLoaded={isLoaded} height="800px">
                    <VStack overflowY="auto" alignItems="stretch">
                        {_plans.map((plan) => (
                            <Plan key={plan.id} style={style} data={plan} />
                        ))}
                    </VStack>
                </Skeleton>
            </VStack>
        </VStack>
    );
};

export default PlanList;
