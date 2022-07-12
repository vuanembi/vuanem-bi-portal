import type { NextPage } from 'next';

import { useQuery } from 'react-query';

import {
    Flex,
    HStack,
    Button,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';

import { Plan, get } from '../../feature/demand-planning/service/plan';

import { planStatuses } from '../../feature/demand-planning/hook/planStatus';

import PlanList from '../../feature/demand-planning/component/Home/PlanList/PlanList';
import PlanForm from '../../feature/demand-planning/component/Home/PlanForm/PlanForm';

const DemandPlanning: NextPage = () => {
    const { isLoading, data: plans, refetch } = useQuery<Plan[]>('plans', get);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    if (!plans) {
        toast({
            title: 'Fetch Error',
            status: 'error',
        });
        return null;
    }

    const planLists = Object.entries(planStatuses)
        .map(([status, style]) => ({ status, ...style }))
        .map((planList) => ({
            ...planList,
            data: plans.filter((plan) => plan.status === planList.status),
        }))
        .map((planList) => (
            <PlanList
                key={planList.status}
                isLoaded={!isLoading}
                status={planList.status}
                plans={planList.data}
            />
        ));


    return (
        <>
            <Flex justifyContent="flex-end" mb="8">
                <Button onClick={onOpen}>Tạo Plan</Button>
            </Flex>
            <HStack justifyContent="stretch" spacing={8}>
                {planLists}
            </HStack>
            <PlanForm isOpen={isOpen} onClose={onClose} callback={refetch}>
                {}
            </PlanForm>
        </>
    );
};

export const getStaticProps = async () => ({
    props: {
        title: 'Demand Planning',
    },
});

export default DemandPlanning;
