import type { NextPage } from 'next';
import { useQuery } from 'react-query';
import {
    Flex,
    HStack,
    Button,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';

import ProtectedRoute from '../../components/ProtectedRoute';
import PlanList from '../../feature/demand-planning/component/Home/PlanList/PlanList';
import PlanForm from '../../feature/demand-planning/component/Home/PlanForm/PlanForm';
import * as PlanService from '../../feature/demand-planning/service/plan.api';
import * as PlanConfig from '../../feature/demand-planning/service/plan.config';

const DemandPlanning: NextPage = () => {
    const toast = useToast();
    const { isLoading, data: plans } = useQuery<PlanService.Plan[]>(
        'plans',
        PlanService.get,
        {
            onError: () => {
                toast({
                    title: 'Fetch Error',
                    status: 'error',
                });
            },
        },
    );
    const { isOpen, onOpen, onClose } = useDisclosure();

    if (!plans) {
        return null;
    }

    const planLists = Object.entries(PlanConfig.planConfigs)
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
        <ProtectedRoute>
            <Flex justifyContent="flex-end" mb="8">
                <Button onClick={onOpen}>Tạo Plan</Button>
            </Flex>
            <HStack justifyContent="stretch" spacing={8}>
                {planLists}
            </HStack>
            <PlanForm isOpen={isOpen} onClose={onClose}>
                {}
            </PlanForm>
        </ProtectedRoute>
    );
};

export const getStaticProps = async () => ({
    props: {
        title: 'Demand Planning',
    },
});

export default DemandPlanning;
