import { useState } from 'react';

import {
    Table as ChakraTable,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react';

import {
    ExpandedState,
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    flexRender,
} from '@tanstack/react-table';

import { TableMeta, TableProps, ColumnMeta } from './Table.type';
import usePlanStatus from '../../../hook/planStatus';

const Table = ({ plan, columns, data, handleUpdate }: TableProps) => {
    const { color } = usePlanStatus(plan.status);

    const [expanded, setExpanded] = useState<ExpandedState>({});

    const table = useReactTable({
        columns,
        data,
        state: {
            expanded,
        },
        onExpandedChange: setExpanded,
        getRowId: (row: any) => row.id,
        getSubRows: (row: any) => row.subRows,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        meta: {
            handleUpdate,
        } as TableMeta,
        debugTable: true,
    });

    return (
        <ChakraTable style={{ borderCollapse: 'separate' }}>
            <Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <Tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <Th
                                key={header.id}
                                colSpan={header.colSpan}
                                position="sticky"
                                isNumeric={
                                    (header.column.columnDef.meta as ColumnMeta)
                                        ?.isNumeric
                                }
                                top={0}
                                bgColor="white"
                                borderColor={color}
                                borderBottomWidth="1px"
                                borderRadius={0}
                                zIndex={2}
                            >
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                )}
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody>
                {table.getRowModel().rows.map((row) => (
                    <Tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <Td
                                key={cell.id}
                                isNumeric={
                                    (cell.column.columnDef.meta as ColumnMeta)
                                        ?.isNumeric
                                }
                            >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                )}
                            </Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
        </ChakraTable>
    );
};

export default Table;
