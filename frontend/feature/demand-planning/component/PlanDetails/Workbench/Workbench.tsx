import {
    useState,
    useEffect,
    useContext,
    Dispatch,
    SetStateAction,
} from 'react';

import { TableContainer } from '@chakra-ui/react';

import Table from './Table';

import { apiClient } from '../../../lib';
import usePlanStatus from '../../../hook/planStatus';
import { PlanContext } from '../../../context';
import { PlanItem } from '../../../types';

type WorkbenchProps = {
    setUpdates: Dispatch<SetStateAction<number>>;
};

type UpdateOptions = {
    index: number;
    item: PlanItem;
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

    const handleUpdate = ({ index, item }: UpdateOptions) => {
        setUpdates(updates + 1);

        const updateData = planItems.map((data, i) =>
            i === index ? item : data,
        );

        apiClient
            .put(`plan-item/${item.id}`, item)
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
