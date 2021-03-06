import { useMemo } from 'react';
import {
    UseQueryResult,
    useQueryClient,
    useQueries,
    useMutation,
} from 'react-query';

import { Tabulator } from 'tabulator-tables';
import CellComponent = Tabulator.CellComponent;
import CellEditEventCallback = Tabulator.CellEditEventCallback;

import { usePlan } from '../../../provider/plan.context';
import * as PlanItemService from '../../../service/plan-item.api';
import Table from './Table';

type TableWrapperProps = {
    data: PlanItemService.PlanItem[];
};

type DataFn = (cell: CellComponent) => PlanItemService.PlanItem;
type ItemMutate = (dataFn: DataFn) => CellEditEventCallback;

const TableWrapper = ({ data }: TableWrapperProps) => {
    const { config } = usePlan();

    const queryClient = useQueryClient();

    const itemQueries = useQueries(
        data.map((planItem) => ({
            queryKey: ['plan-item', planItem.id],
            queryFn: PlanItemService.getOne(planItem.id),
            initialData: planItem,
            staleTime: Infinity,
            cacheTime: Infinity,
        })),
    ) as unknown as UseQueryResult<PlanItemService.PlanItem, any>[];

    const { mutate } = useMutation(PlanItemService.updateOne, {
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['plan-item', variables.id]);
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const mutateItem: ItemMutate = (dataFn) => (cell) => {
        const data = dataFn(cell);
        data && mutate(data);
    };

    const mutateRoot = mutateItem((cell) => cell.getRow().getData());

    const mutateVendors = mutateItem((cell) => {
        const row = cell.getRow().getTreeParent();
        return row ? row.getData() : false;
    });

    const columns = useMemo(
        () => [
            ...config.columns.root.map((colFac) => colFac(mutateRoot)),
            ...config.columns.vendors.map((colFac) => colFac(mutateVendors)),
        ],
        [config.columns, mutateRoot, mutateVendors],
    );

    const _data = itemQueries
        .filter(({ data }) => !!data)
        .map(({ data }) => data as PlanItemService.PlanItem)
        .map((d) => ({ ...d, sku: d.item.sku }));

    return (
        <Table
            columns={columns}
            data={_data}
            dataTree={config.columns.vendors.length > 0}
        />
    );
};

export default TableWrapper;
