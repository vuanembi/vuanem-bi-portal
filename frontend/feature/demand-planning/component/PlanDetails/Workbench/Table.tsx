import { ReactTabulator, ColumnDefinition } from 'react-tabulator';

import { PlanItem } from '../../../service/plan-item';

type TableProps = {
    columns: ColumnDefinition[];
    data: PlanItem[];
};

type Cell = {
    column: {
        field: keyof PlanItem;
    };
    row: {
        data: PlanItem;
    };
    oldValue: string | number;
    value: string | number;
};

const Table = ({ columns, data }: TableProps) => {
    const onCellEdited = (cell: any) => {
        const { _cell }: { _cell: Cell } = Object.assign({}, cell);
        const { column, row, oldValue, value } = _cell;

        console.log({ column, row, oldValue, value });
    };

    return (
        <ReactTabulator
            className={"plan-item-table"}
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
