import { useState, useEffect, useRef } from 'react';

import { Box } from '@chakra-ui/react';
import { TabulatorFull, Tabulator } from 'tabulator-tables';
import ColumnDefinition = Tabulator.ColumnDefinition;

import { PlanItem } from '../../../service/plan-item.service';

type TableProps = {
    columns: ColumnDefinition[];
    data: (PlanItem & { sku: PlanItem['item']['sku'] })[];
};

const Table = ({ columns, data }: TableProps) => {
    const el = useRef<HTMLDivElement>(null);
    const table = useRef<Tabulator | null>(null);
    const [_data, setData] = useState(data);

    useEffect(() => {
        table.current = new TabulatorFull(el.current as HTMLDivElement, {
            columns,
            data: _data,
            height: '80%',
            layout: 'fitDataFill',
            dataTree: true,
            dataTreeChildField: 'vendors',
            groupBy: ['sku', 'region'],
        });
        return table.current.destroy();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        data && data.length > 0 && setData(data);
    }, [data]);

    return (
        <Box bgColor="white" maxW="100%">
            <div ref={el} />
        </Box>
    );
};

export default Table;
