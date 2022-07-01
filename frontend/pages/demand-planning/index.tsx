import type { NextPage } from 'next';
import { useState, useEffect } from 'react';

import { Flex, HStack, Button, useDisclosure } from '@chakra-ui/react';

import { apiClient, planStatusStyles } from '../../feature/demand-planning/lib';

import type { PlanProps } from '../../feature/demand-planning/component/Home/Plan/Plan';
import PlanList from '../../feature/demand-planning/component/Home/PlanList/PlanList';
import PlanForm from '../../feature/demand-planning/component/Home/PlanForm/PlanForm';

const DemandPlanning: NextPage = () => {
    const [plans, setPlans] = useState<PlanProps[]>([]);
    const [plansLoaded, setPlansLoaded] = useState(false);

    const getPlans = () => {
        setPlansLoaded(false);
        apiClient
            .get('/plan')
            .then(({ data }) => setPlans(data))
            .then(() => setPlansLoaded(true));
    };

    useEffect(() => {
        getPlans();
    }, []);

    const planLists = Object.entries(planStatusStyles)
        .map(([status, style]) => ({ status, ...style }))
        .map((planList) => ({
            ...planList,
            data: plans.filter((plan) => plan.status.name === planList.status),
        }))
        .map((planList) => (
            <PlanList
                key={planList.status}
                isLoaded={plansLoaded}
                status={planList.status}
                plans={planList.data}
            />
        ));

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Flex justifyContent="flex-end" mb="8">
                <Button onClick={onOpen}>Tạo Plan</Button>
            </Flex>
            <HStack justifyContent="stretch" spacing={8}>
                {planLists}
            </HStack>
            <PlanForm isOpen={isOpen} onClose={onClose} callback={getPlans}>
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
