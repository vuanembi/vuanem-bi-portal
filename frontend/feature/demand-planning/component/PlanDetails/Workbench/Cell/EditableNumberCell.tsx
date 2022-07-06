import { useState, useEffect } from 'react';

import {
    UseCounterProps,
    NumberInput,
    NumberInputField,
} from '@chakra-ui/react';

import withNulls from './withNulls';
import { TableMeta, CellProps, ColumnMeta } from '../Table.type';
import { PlanItem as PlanItemProps } from '../../../../types';

const EditableNumberCell = ({ row, column, table, getValue }: CellProps) => {
    const { width } = column.columnDef.meta as ColumnMeta;

    const initialValue = getValue() as string;
    const [value, setValue] = useState(initialValue);

    const onChange: UseCounterProps['onChange'] = (valueAsString) => {
        setValue(valueAsString);
    };

    const onBlur = () => {
        (table.options.meta as TableMeta).handleUpdate({
            index: row.index,
            item: {
                id: +row.id,
                update: {
                    key: column.id as keyof PlanItemProps,
                    value: +value,
                },
            },
        });
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return initialValue ? (
        <NumberInput
            isRequired
            w={width}
            defaultValue={initialValue}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        >
            <NumberInputField textAlign="right" p={4} />
        </NumberInput>
    ) : null;
};

export default withNulls(EditableNumberCell);
