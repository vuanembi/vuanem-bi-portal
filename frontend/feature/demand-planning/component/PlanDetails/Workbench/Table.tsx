import { useState, useEffect, useRef } from 'react';

import { TabulatorFull, Tabulator } from 'tabulator-tables';
import ColumnDefinition = Tabulator.ColumnDefinition;

import { PlanItem } from '../../../service/plan-item.api';

export type TableProps = {
    columns: ColumnDefinition[];
    data: (PlanItem & { sku: PlanItem['item']['sku'] })[];
};

const Table = ({ columns, data }: TableProps) => {
    const el = useRef<HTMLDivElement>(null);
    const table = useRef<Tabulator | null>(null);
    const [_data, setData] = useState(data);

    useEffect(() => {
        table.current = new TabulatorFull(el.current as HTMLDivElement, {
            columns,
            data: _data,
            height: '100%',
            layout: 'fitDataFill',
            dataTree: true,
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
