import { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { useQueryClient, useQuery } from 'react-query';

import { Box } from '@chakra-ui/react';
import { TabulatorFull, Tabulator } from 'tabulator-tables';
import CellEditEventCallback = Tabulator.CellEditEventCallback;

import { PlanContext } from '../../../service/plan.context';
import { getOneItems } from '../../../service/plan.service';
import { PlanItem } from '../../../service/plan-item.service';

const Workbench = () => {
    const { plan, config } = useContext(PlanContext);
    const el = useRef<HTMLDivElement>(null);

    const [tabulator, setTabulator] = useState<Tabulator>();

    const queryId = `plan[${plan.id}].items`;
    const queryClient = useQueryClient();
    const { data: planItems } = useQuery<PlanItem[]>(
        queryId,
        getOneItems(plan.id),
        { staleTime: Infinity, cacheTime: Infinity },
    );

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
        console.log({ id: 'vendors', column, row, value });
    };

    const columns = useMemo(
        () => [
            ...config.columns.root.map((colFac) => colFac(mutateRoot)),
            ...config.columns.vendors.map((colFac) => colFac(mutateVendors)),
        ],
        [config],
    );

    useEffect(() => {
        const table = new TabulatorFull(el.current as HTMLDivElement, {
            columns,
            data: planItems,
            reactiveData: true,
            height: '80%',
            layout: 'fitDataFill',
            dataTree: true,
            dataTreeChildField: 'vendors',
            groupBy: ['sku', 'region'],
        });
        table.on('tableBuilt', () => table.setData(planItems));

        setTabulator(table);
    }, [columns]);

    return (
        <Box bgColor="white" maxW="100%">
            <div ref={el} />
        </Box>
    );
};

export default Workbench;
