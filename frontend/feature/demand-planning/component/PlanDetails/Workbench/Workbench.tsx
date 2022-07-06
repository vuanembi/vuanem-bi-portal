import {
    useState,
    useEffect,
    useContext,
    Dispatch,
    SetStateAction,
} from 'react';

import { TableContainer } from '@chakra-ui/react';

import { chain } from 'lodash';

import Table from './Table';
import type { UpdateOptions } from './Table.type';

import { apiClient } from '../../../lib';
import usePlanStatus from '../../../hook/planStatus';
import { PlanContext } from '../../../context';
import { PlanItem, PlanItemGroup } from '../../../types';

type WorkbenchProps = {
    setUpdates: Dispatch<SetStateAction<number>>;
};

const Workbench = ({ setUpdates }: WorkbenchProps) => {
    const { plan, updates } = useContext(PlanContext);

    const { color, columns } = usePlanStatus(plan.status);
    const [planItems, setPlanItems] = useState<PlanItem[]>([]);
    const [planItemGroups, setPlanItemGroups] = useState<PlanItemGroup[]>([]);

    useEffect(() => {
        apiClient
            .get<PlanItem[]>('/plan-item', { params: { planId: plan.id } })
            .then(({ data }) => setPlanItems(data));
    }, [plan]);

    useEffect(() => {
        const group = chain(planItems)
            .groupBy(({ sku }) => sku)
            .toPairs()
            .map(([sku, values]) => ({
                sku,
                subRows: chain(values)
                    .groupBy(({ region }) => region)
                    .toPairs()
                    .map(([region, values]) => ({
                        region,
                        subRows: values,
                    }))
                    .value(),
            }))
            .value() as PlanItemGroup[];

        setPlanItemGroups(group);
    }, [planItems]);

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
            {planItemGroups.length > 0 ? (
                <Table
                    plan={plan}
                    columns={columns}
                    data={planItemGroups}
                    handleUpdate={handleUpdate}
                />
            ) : null}
        </TableContainer>
    );
};

export default Workbench;
