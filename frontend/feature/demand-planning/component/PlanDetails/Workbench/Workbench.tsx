import { useState, useEffect, useMemo } from 'react';

import { TableContainer } from '@chakra-ui/react';

import { Column } from 'react-table';

import Table from './Table';
import EditableNumberCell from './Cell/EditableNumberCell';

import { apiClient } from '../../../lib';
import { Plan, PlanItem } from '../../../type';
import usePlanStatus from '../../../hook/planStatus';

declare module 'react-table' {
    interface HeaderGroup {
        isNumeric: boolean;
    }
    interface ColumnInstance {
        isNumeric: boolean;
    }
}

const Workbench = (plan: Plan) => {
    const { color, columns } = usePlanStatus(plan.status.name);
    const [planItems, setPlanItems] = useState<PlanItem[]>([]);

    useEffect(() => {
        apiClient
            .get<PlanItem[]>('/plan-item', { params: { planId: plan.id } })
            .then(({ data }) => setPlanItems(data));
    }, [plan]);

    return (
        <TableContainer
            h="80vh"
            overflowY="scroll"
            p={1}
            borderWidth="1px"
            borderColor={color}
        >
            <Table columns={columns} data={planItems} />
        </TableContainer>
    );
};

export default Workbench;
