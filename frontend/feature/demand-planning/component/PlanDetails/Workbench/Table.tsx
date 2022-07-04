/* eslint react/jsx-key: 0 */

import { useMemo } from 'react';

import {
    Table as ChakraTable,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react';

import { Column, useTable, useSortBy } from 'react-table';

import { Plan, PlanItem } from '../../../types';
import usePlanStatus from '../../../hook/planStatus';

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

type TableProps = {
    plan: Plan;
    columns: Column<PlanItem>[];
    data: PlanItem[];
    handleUpdate: (updateOptions: UpdateOptions) => void;
};

const Table = ({ plan, columns, data, handleUpdate }: TableProps) => {
    const { color } = usePlanStatus(plan.status.name);

    const getRowId = ({ id }: PlanItem) => id;

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data, getRowId, handleUpdate }, useSortBy);

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
