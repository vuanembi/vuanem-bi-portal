import { useEffect, useRef } from 'react';

import { ReactTabulator, ColumnDefinition } from 'react-tabulator';
import {TabulatorFull as Tabulator} from "tabulator-tables";


import { PlanItem } from '../../../service/plan-item.service';

type TableProps = {
    columns: ColumnDefinition[];
    data: PlanItem[];
};

type Cell = {
    column: {
        field: keyof PlanItem;
        fieldStructure: (keyof PlanItem)[];
    };
    row: {
        data: PlanItem;
    };
    oldValue: string | number;
    value: string | number;
};

const Table = ({ columns, data }: TableProps) => {
    const onCellEdited = (cell: any) => {
        const { _cell }: { _cell: Cell } = { ...cell };
        const { column, row, value } = _cell;

        console.log({
            id: row.data.id,
            ...column.fieldStructure.reduceRight(
                (acc, cur) => ({
                    [cur]: acc,
                }),
                value as Partial<PlanItem>,
            ),
        });
    };

    return (
        <ReactTabulator
            className={'plan-item-table'}
            columns={columns}
            data={data}
            layout="fitDataFill"
            events={{
                cellEdited: onCellEdited,
            }}
            options={{
                height: '80%',
                dataTree: true,
                dataTreeChildField: 'vendors',
                groupBy: ['sku', 'region'],
            }}
        />
    );
};

export default Table;
