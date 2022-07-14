import { useContext } from 'react';
import { useQueryClient, useQuery } from 'react-query';

import { Tabulator } from 'tabulator-tables';
import CellEditEventCallback = Tabulator.CellEditEventCallback;

import Table from './Table';

import { PlanContext } from '../../../service/plan.context';
import { getOneItems } from '../../../service/plan.service';
import { PlanItem } from '../../../service/plan-item.service';

const Workbench = () => {
    const { plan, config } = useContext(PlanContext);

    const queryId = `plan[${plan.id}].items`;
    const queryClient = useQueryClient();
    const { data: planItems } = useQuery<PlanItem[]>(
        queryId,
        getOneItems(plan.id),
        { staleTime: Infinity, cacheTime: Infinity },
    );
    const data = planItems?.map((planItem) => ({
        ...planItem,
        sku: planItem.item.sku,
    }));

    const mutateRoot: CellEditEventCallback = (cell) => {
        const [column, row, value] = [
            cell.getColumn(),
            cell.getRow(),
            cell.getValue(),
        ];
        queryClient.invalidateQueries(queryId);
        console.log({ id: 'root', column, row, value });
    };

    const mutateVendors: CellEditEventCallback = (cell) => {
        const [column, row, value] = [
            cell.getColumn(),
            cell.getRow(),
            cell.getValue(),
        ];
        queryClient.invalidateQueries(queryId);
        console.log({ id: 'vendors', column, row, value });
    };

    const columns = [
        ...config.columns.root.map((colFac) => colFac(mutateRoot)),
        ...config.columns.vendors.map((colFac) => colFac(mutateVendors)),
    ];

    if (!data) {
        return null;
    }

    return <Table columns={columns} data={data} />;
};

export default Workbench;
