import { UseQueryResult, useQueries } from 'react-query';

import { PlanItem, getOne } from '../../../service/plan-item.service';

import Table, { TableProps } from './Table';

const WorkbenchItems = ({ columns, data }: TableProps) => {
    const itemQueries = useQueries(
        data.map((planItem) => ({
            queryKey: ['plan-item', planItem.id],
            queryFn: getOne(planItem.id),
            initialData: planItem,
            staleTime: Infinity,
            cacheTime: Infinity,
        })),
    ) as unknown as UseQueryResult<PlanItem, any>[];

    const _data = itemQueries
        .map(({ data }) => data as PlanItem)
        .map((d) => ({ ...d, sku: d.item.sku }));

    return <Table columns={columns} data={_data} />;
};

export default WorkbenchItems;
