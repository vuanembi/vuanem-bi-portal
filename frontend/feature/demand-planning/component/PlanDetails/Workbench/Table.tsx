/* eslint react/jsx-key: 0 */

import { useState, useEffect, useMemo } from 'react';

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

declare module 'react-table' {
    interface HeaderGroup {
        isNumeric: boolean;
    }
    interface ColumnInstance {
        isNumeric: boolean;
    }
}

type TableProps = {
    columns: Column<PlanItem>[];
    data: PlanItem[];
};

const Table = ({ columns, data }: TableProps) => {

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data }, useSortBy);

    return (
        <ChakraTable {...getTableProps()}>
            <Thead>
                {headerGroups.map((headerGroup) => (
                    <Tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <Th
                                {...column.getHeaderProps()}
                                isNumeric={column.isNumeric}
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
