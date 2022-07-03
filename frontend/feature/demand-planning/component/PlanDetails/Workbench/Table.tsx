/* eslint react/jsx-key: 0 */

import {
    Table as ChakraTable,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react';

import { Column, useTable, useSortBy } from 'react-table';

import { Plan, PlanItem } from '../../../type';
import usePlanStatus from '../../../hook/planStatus';

declare module 'react-table' {
    interface HeaderGroup {
        isNumeric: boolean;
    }
    interface ColumnInstance {
        isNumeric: boolean;
    }
}

type TableProps = {
    plan: Plan;
    columns: Column<PlanItem>[];
    data: PlanItem[];
};

const Table = ({ plan, columns, data }: TableProps) => {
    const { color } = usePlanStatus(plan.status.name);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data }, useSortBy);

    return (
        <ChakraTable
            {...getTableProps()}
            style={{ borderCollapse: 'separate' }}
        >
            <Thead>
                {headerGroups.map((headerGroup) => (
                    <Tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <Th
                                {...column.getHeaderProps()}
                                position="sticky"
                                isNumeric={column.isNumeric}
                                top={0}
                                bgColor="white"
                                borderColor={color}
                                borderBottomWidth="1px"
                                borderRadius={0}
                                zIndex={2}
                            >
                                {column.render('Header')}
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <Tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <Td
                                    {...cell.getCellProps()}
                                    isNumeric={cell.column.isNumeric}
                                >
                                    {cell.render('Cell')}
                                </Td>
                            ))}
                        </Tr>
                    );
                })}
            </Tbody>
        </ChakraTable>
    );
};

export default Table;
