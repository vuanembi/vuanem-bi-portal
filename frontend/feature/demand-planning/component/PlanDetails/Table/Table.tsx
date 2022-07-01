/* eslint react/jsx-key: 0 */

import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useState, useEffect, useMemo } from 'react';

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';

import { Column, useTable, useSortBy } from 'react-table';

import { apiClient } from '../../../lib';
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

const ItemTableWrapper = (plan: Plan) => {
    const { color } = usePlanStatus(plan.status.name);
    const [planItems, setPlanItems] = useState<PlanItem[]>([]);

    useEffect(() => {
        apiClient
            .get<PlanItem[]>('/plan-item', { params: { planId: plan.id } })
            .then(({ data }) =>
                setPlanItems([
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                ]),
            );
    }, [plan]);
};

const ItemTable = (plan: Plan) => {
    const { color } = usePlanStatus(plan.status.name);
    const [planItems, setPlanItems] = useState<PlanItem[]>([]);

    useEffect(() => {
        apiClient
            .get<PlanItem[]>('/plan-item', { params: { planId: plan.id } })
            .then(({ data }) =>
                setPlanItems([
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                    ...data,
                ]),
            );
    }, [plan]);

    const columns = useMemo<Column<PlanItem>[]>(
        () => [
            { Header: 'SKU', accessor: 'sku', isNumeric: false },
            {
                Header: 'Start of Week',
                accessor: 'startOfWeek',
                isNumeric: false,
            },
            { Header: 'Region', accessor: 'region', isNumeric: false },
            {
                Header: 'Avg. Item Discount',
                accessor: 'avgItemDiscount',
                isNumeric: true,
            },
            {
                Header: 'Avg. Item Discount',
                accessor: 'avgOrderDiscount',
                isNumeric: true,
            },
            { Header: 'Discount', accessor: 'discount', isNumeric: true },
            {
                Header: 'Working Days',
                accessor: 'workingDays',
                isNumeric: true,
            },
            { Header: 'Inventory', accessor: 'inventory', isNumeric: true },
            { Header: 'MOQ', accessor: 'moq', isNumeric: true },
            { Header: 'Lead Time', accessor: 'leadTime', isNumeric: true },
            {
                Header: 'Qty. Demand ML',
                accessor: 'qtyDemandML',
                isNumeric: true,
            },
            {
                Header: 'Qty. Demand Purchase',
                accessor: 'qtyDemandPurchasing',
                isNumeric: true,
            },
            { Header: 'Qty. Demand', accessor: 'qtyDemand', isNumeric: true },
            { Header: 'Qty. Supply', accessor: 'qtySupply', isNumeric: true },
        ],
        [],
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data: planItems }, useSortBy);

    return (
        <TableContainer
            h="80vh"
            overflowY="scroll"
            p={1}
            borderWidth="1px"
            borderColor={color}
        >
            <Table {...getTableProps()}>
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
            </Table>
        </TableContainer>
    );
};

export default ItemTable;
