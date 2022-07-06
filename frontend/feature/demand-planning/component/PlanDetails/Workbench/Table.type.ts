import { Table, Column, ColumnDef, Row, Cell } from '@tanstack/react-table';

import { Plan, PlanItem, PlanItemGroup } from '../../../types';

export type UpdateOptions = {
    index: number;
    item: {
        id: PlanItem['id'];
        update: {
            key: keyof PlanItem;
            value: any;
        };
    };
};

export type CellProps = {
    table: Table<PlanItemGroup>;
    column: Column<PlanItemGroup>;
    row: Row<PlanItemGroup>;
    cell: Cell<PlanItemGroup>;
    getValue: () => any;
    renderValue: () => any;
};

export type TableMeta = {
    handleUpdate: (updateOptions: UpdateOptions) => void;
};

export type TableProps = TableMeta & {
    plan: Plan;
    columns: ColumnDef<PlanItemGroup>[];
    data: PlanItemGroup[];
};

export type ColumnMeta = {
    formatter: <T>(value: any) => T;
    width?: number;
    isNumeric?: boolean;
};
