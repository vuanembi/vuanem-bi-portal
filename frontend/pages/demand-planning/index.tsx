import type { NextPage } from 'next';
import { useState, useEffect } from 'react';

import { Flex, HStack, Button, useDisclosure } from '@chakra-ui/react';

import { apiClient } from '../../page-lib/demand-planning';

import type { PlanData } from '../../page-component/demand-planning/Plan/Plan';
import PlanList from '../../page-component/demand-planning/PlanList/PlanList';
import PlanForm from '../../page-component/demand-planning/PlanForm/PlanForm';

const DemandPlanning: NextPage = () => {
    const [plans, setPlans] = useState<PlanData[]>([]);
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

    const planLists = [
        {
            status: 'draft',
            label: 'Draft',
            color: 'teal.300',
        },
        {
            status: 'forecasted',
            label: 'Forecasted',
            color: 'blue.300',
        },
        {
            status: 'reviewed',
            label: 'Reviewed',
            color: 'purple.300',
        },
    ]
        .map((planList) => ({
            ...planList,
            data: plans.filter((plan) => plan.status.name === planList.status),
        }))
        .map((planList) => (
            <PlanList
                key={planList.status}
                isLoaded={plansLoaded}
                label={planList.label}
                style={{ color: planList.color }}
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
