import 'react-table';

declare module 'react-table' {
    interface HeaderGroup {
        isNumeric: boolean;
    }
    interface ColumnInterface {
        formatter: (e: any) => any;
        isNumeric?: boolean;
        sticky?: 'left' | 'right';
    }
    interface ColumnInstance {
        formatter: (e: any) => any;
        isNumeric: boolean;
    }
    interface TableOptions {
        // getRowId: <T>(row) => number;
        [key: string]: any;
    }
    interface TableState {
        expanded: boolean;
    }
    interface Row {
        canExpand: boolean;
        isExpanded: boolean;
    }
}
