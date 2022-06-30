import type { NextPage } from 'next';
import { useState, useEffect } from 'react';

import { Flex, HStack, Button, useDisclosure } from '@chakra-ui/react';

import PlanList from '../../page-component/demand-planning/PlanList';
import type { PlanData } from '../../page-component/demand-planning/Plan';
import PlanForm from '../../page-component/demand-planning/PlanForm';

import apiClient from '../../lib/api';

const DemandPlanning: NextPage = () => {
    const [plans, setPlans] = useState<PlanData[]>([]);
    const [plansLoaded, setPlansLoaded] = useState(false);

    useEffect(() => {
        setPlansLoaded(false);
        apiClient('demand-planning')
            .get('/plan')
            .then(({ data }) => setPlans(data))
            .then(() => setPlansLoaded(true));
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
            <PlanForm isOpen={isOpen} onClose={onClose}>
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
