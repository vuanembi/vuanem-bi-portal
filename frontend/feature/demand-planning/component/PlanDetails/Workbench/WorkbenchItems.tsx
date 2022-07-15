import { useContext, useMemo } from 'react';
import {
    UseQueryResult,
    useQueryClient,
    useQueries,
    useMutation,
} from 'react-query';

import { Tabulator } from 'tabulator-tables';
import RowComponent = Tabulator.RowComponent;
import CellComponent = Tabulator.CellComponent;
import CellEditEventCallback = Tabulator.CellEditEventCallback;

import { PlanContext } from '../../../service/plan.context';
import {
    PlanItem,
    getOne,
    updateOne,
} from '../../../service/plan-item.service';

import Table, { TableProps } from './Table';

type DataFn = (cell: CellComponent) => PlanItem;
type ItemMutate = (dataFn: DataFn) => CellEditEventCallback;

const WorkbenchItems = ({ data }: TableProps) => {
    const { config } = useContext(PlanContext);

    const queryClient = useQueryClient();

    const itemQueries = useQueries(
        data.map((planItem) => ({
            queryKey: ['plan-item', planItem.id],
            queryFn: getOne(planItem.id),
            initialData: planItem,
            staleTime: Infinity,
            cacheTime: Infinity,
        })),
    ) as unknown as UseQueryResult<PlanItem, any>[];

    const { mutate } = useMutation(updateOne, {
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['plan-item', variables.id]);
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const mutateItem: ItemMutate = (dataFn) => (cell) => {
        const data = dataFn(cell);
        mutate(data);
    };

    const mutateRoot = mutateItem((cell) => cell.getRow().getData());

    const mutateVendors = mutateItem((cell) =>
        (cell.getRow().getTreeParent() as RowComponent).getData(),
    );

    const columns = useMemo(
        () => [
            ...config.columns.root.map((colFac) => colFac(mutateRoot)),
            ...config.columns.vendors.map((colFac) => colFac(mutateVendors)),
        ],
        [config.columns, mutateRoot, mutateVendors],
    );

    const _data = itemQueries
        .filter(({ data }) => !!data)
        .map(({ data }) => data as PlanItem)
        .map((d) => ({ ...d, sku: d.item.sku }));

    return <Table columns={columns} data={_data} />;
};

export default WorkbenchItems;
