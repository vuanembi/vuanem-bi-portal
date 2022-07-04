import 'react-table';

declare module 'react-table' {
    interface HeaderGroup {
        isNumeric: boolean;
    }
    interface ColumnInstance {
        isNumeric: boolean;
    }
    interface TableOptions {
        getRowId: <T>(row) => number;
        [key: string]: any;
    }
}
