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
import { useTable, useBlockLayout } from 'react-table';
import { useSticky } from 'react-table-sticky';

import { ReactTabulator, ColumnDefinition } from 'react-tabulator';

import { PlanItem } from '../../../service/plan-item';
import dayjs from 'dayjs';

type TableProps = {
    columns: ColumnDefinition[];
    data: PlanItem[];
};

const Table = ({ data }: TableProps) => {
    const columns = useMemo(
        () => [
            {
                Header: 'Start of Week',
                accessor: 'startOfWeek',
                width: 150,
                // minWidth: 100,
                // maxWidth: 100,
                sticky: 'left',
                Cell: ({ value }) => dayjs(value).format('YYYY-MM-DD'),
            },
            {
                Header: 'Region',
                accessor: 'region',
                sticky: 'left',
            },
            {
                Header: 'Avg. Item Discount',
                accessor: 'avgItemDiscount',
                isNumeric: true,
            },
            {
                Header: 'Avg. Order Discount',
                accessor: 'avgOrderDiscount',
                isNumeric: true,
            },
            {
                Header: 'Base Price',
                accessor: 'basePrice',
                isNumeric: true,
            },
            {
                Header: 'Working Days',
                accessor: 'workingDays',
                isNumeric: true,
            },
            {
                Header: 'Qty. Demand ML',
                accessor: 'qtyDemandML',
                isNumeric: true,
            },
            {
                Header: 'Qty. Demand Purchasing',
                accessor: 'qtyDemandPurchasing',
                isNumeric: true,
                width: 200,
            },
        ],
        [],
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data }, useBlockLayout, useSticky);

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
                    <Tr
                        {...headerGroup.getHeaderGroupProps()}
                        
                    >
                        {headerGroup.headers.map((column) => {
                            console.log(column, column.getHeaderProps());
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
                                    minWidth={column.width}
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
