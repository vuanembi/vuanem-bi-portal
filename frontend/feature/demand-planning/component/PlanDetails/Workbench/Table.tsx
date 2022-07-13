/* eslint react/jsx-key: 0 */
// import 'react-tabulator/css/tabulator_bootstrap3.min.css';

import { useMemo } from 'react';

import {
    Table as ChakraTable,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react';
import { Column, useTable, useGroupBy, useExpanded, useBlockLayout } from 'react-table';
import { useSticky } from 'react-table-sticky';

import { PlanItem, PlanItemGroup } from '../../../service/plan-item';

type TableProps = {
    columns: Column<PlanItemGroup>[];
    data: PlanItemGroup[];
};

const Table = ({ columns, data }: TableProps) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                columns,
                data,
            },
            useGroupBy,
            useExpanded,
            useBlockLayout,
            useSticky,
        );

    return (
        <ChakraTable
            {...getTableProps()}
            size="sm"
            top={0}
            overflow="scroll"
            // style={{ borderCollapse: 'separate' }}
        >
            <Thead position="sticky" top={0} zIndex={10} w="fit-content">
                {headerGroups.map((headerGroup) => (
                    <Tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => {
                            return (
                                <Th
                                    {...column.getHeaderProps()}
                                    position="sticky"
                                    isNumeric={column.isNumeric}
                                    top={0}
                                    bgColor="white"
                                    borderBottomWidth="1px"
                                    borderRadius={0}
                                    fontSize="xs"
                                    maxWidth={column.width}
                                    borderLeft={0}
                                    borderRight={0}
                                    boxShadow={`inset 0 -1px 0 red`}
                                >
                                    {column.render('Header')}
                                </Th>
                            );
                        })}
                    </Tr>
                ))}
            </Thead>
            <Tbody {...getTableBodyProps()} zIndex={0} position="relative">
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <Tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <Td
                                    {...cell.getCellProps()}
                                    isNumeric={cell.column.isNumeric}
                                    // overflow="hidden"
                                    bgColor="white"
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
