import type { NextPage } from 'next';
import { useState, useEffect } from 'react';

import { Flex, HStack, Button } from '@chakra-ui/react';

import PlanList from '../../page-component/demand-planning/PlanList';
import { PlanData } from '../../page-component/demand-planning/Plan';

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

    return (
        <>
            <Flex justifyContent="flex-end" mb="8">
                <Button>Tạo Plan</Button>
            </Flex>
            <HStack justifyContent="stretch" spacing={8}>
                <PlanList
                    isLoaded={plansLoaded}
                    label="Nháp"
                    style={{
                        color: 'teal.300',
                    }}
                    plans={plans}
                />
                <PlanList
                    isLoaded={plansLoaded}
                    label="Dự đoán"
                    style={{
                        color: 'blue.300',
                    }}
                    plans={plans}
                />
                <PlanList
                    isLoaded={plansLoaded}
                    label="Review"
                    style={{
                        color: 'purple.300',
                    }}
                    plans={plans}
                />
            </HStack>
        </>
    );
};

export const getStaticProps = async () => ({
    props: {
        title: 'Demand Planning',
    },
});

export default DemandPlanning;
