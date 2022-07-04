import { useState, useEffect } from 'react';

import {
    UseCounterProps,
    NumberInput,
    NumberInputField,
} from '@chakra-ui/react';

import { CellProps } from './cell.type';
import { PlanItem } from '../../../../types';

export const EditNumber = ({
    value: initialValue,
    row,
    column,
    handleUpdate,
}: CellProps) => {
    const [value, setValue] = useState(initialValue.toString());

    const onChange: UseCounterProps['onChange'] = (valueAsString) => {
        setValue(valueAsString);
    };

    const onBlur = () =>
        handleUpdate({
            index: row.index,
            item: { ...row.values, [column.id]: +value, id: row.id },
        });

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <NumberInput
            w={column.width}
            precision={2}
            value={
                value !== null && value !== undefined ? value.toString() : ''
            }
            onChange={onChange}
            onBlur={onBlur}
        >
            <NumberInputField textAlign="right" p={4} />
        </NumberInput>
    );
};

export default EditNumber;
