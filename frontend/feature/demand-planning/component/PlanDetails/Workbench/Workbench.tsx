import {
    useState,
    useEffect,
    useContext,
    Dispatch,
    SetStateAction,
} from 'react';

import { TableContainer } from '@chakra-ui/react';

import { isEqual, valuesIn } from 'lodash';

import Table, { UpdateOptions } from './Table';

import { apiClient } from '../../../lib';
import usePlanStatus from '../../../hook/planStatus';
import { PlanContext } from '../../../context';
import { PlanItem } from '../../../types';

type WorkbenchProps = {
    setUpdates: Dispatch<SetStateAction<number>>;
};

const Workbench = ({ setUpdates }: WorkbenchProps) => {
    const { plan, updates } = useContext(PlanContext);

    const { color, columns } = usePlanStatus(plan.status.name);
    const [planItems, setPlanItems] = useState<PlanItem[]>([]);

    useEffect(() => {
        apiClient
            .get<PlanItem[]>('/plan-item', { params: { planId: plan.id } })
            .then(({ data }) => setPlanItems(Array(2).fill(data).flat()));
    }, [plan]);

    const handleUpdate = ({ index, item: { id, update } }: UpdateOptions) => {
        const updatePlanItem = planItems.find((_, i) => i === index);

        if (!updatePlanItem) return;

        if (updatePlanItem[update.key] === update.value) return;

        setUpdates(updates + 1);

        const updatedPlanItem = {
            ...updatePlanItem,
            [update.key]: update.value,
        };

        const updateData = planItems.map((data, i) =>
            i === index ? updatedPlanItem : data,
        );

        apiClient
            .put(`plan-item/${id}`, updatedPlanItem)
            .then(() => setUpdates(updates > 0 ? updates - 1 : 0));

        setPlanItems(updateData);
    };

    return (
        <TableContainer
            h="80vh"
            p={0}
            overflowY="scroll"
            borderWidth="1px"
            borderColor={color}
        >
            <Table
                plan={plan}
                columns={columns}
                data={planItems}
                handleUpdate={handleUpdate}
            />
        </TableContainer>
    );
};

export default Workbench;
