import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';

import { Center, HStack, Icon, LinkBox, LinkOverlay } from '@chakra-ui/react';

import { FaHome } from 'react-icons/fa';

import { apiClient } from '../../../lib';
import { Plan, PlanItem } from '../../../type';
import usePlanStatus from '../../../hook/planStatus';

const Table = (plan: Plan) => {
    const [planItems, setPlanItems] = useState<PlanItem[]>([]);

    useEffect(() => {
        apiClient
            .get('/plan-item', { params: { planId: plan.id } })
            .then(({ data }) => setPlanItems(data));
    }, [plan]);

    

    return (
        <HStack flex="1" justifyContent="space-between">
            <p>{JSON.stringify(planItems)}</p>
        </HStack>
    );
};

export default Table;
