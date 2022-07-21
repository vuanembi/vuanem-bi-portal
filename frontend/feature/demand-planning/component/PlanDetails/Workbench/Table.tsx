import { useState, useEffect, useRef } from 'react';

import { TabulatorFull, Tabulator } from 'tabulator-tables';
import ColumnDefinition = Tabulator.ColumnDefinition;

import * as PlanItemService from '../../../service/plan-item.api';

export type TableProps = {
    columns: ColumnDefinition[];
    data: (PlanItemService.PlanItem & {
        sku: PlanItemService.PlanItem['item']['sku'];
    })[];
    dataTree: boolean;
};

const Table = ({ columns, data, dataTree }: TableProps) => {
    const el = useRef<HTMLDivElement>(null);
    const table = useRef<Tabulator | null>(null);
    const [_data, setData] = useState(data);

    useEffect(() => {
        table.current = new TabulatorFull(el.current as HTMLDivElement, {
            columns,
            dataTree,
            data: _data,
            height: '100%',
            layout: 'fitDataFill',
            dataTreeChildField: 'vendors',
            groupBy: ['sku', 'region'],
        });
        return table.current.destroy();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        data && data.length > 0 && setData(data);
    }, [data]);

    return <div ref={el} />;
};

export default Table;
