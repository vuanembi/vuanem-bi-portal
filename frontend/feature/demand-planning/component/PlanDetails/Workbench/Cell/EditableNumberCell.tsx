import { useState, useEffect } from 'react';

import {
    UseCounterProps,
    NumberInput,
    NumberInputField,
} from '@chakra-ui/react';

import { CellProps } from './cell.type';

export const EditNumber = ({
    value: initialValue,
    row,
    column,
    handleUpdate,
}: CellProps) => {
    const [value, setValue] = useState(initialValue);

    const onChange: UseCounterProps['onChange'] = (valueAsString) => {
        setValue(valueAsString);
    };

    const onBlur = () => {
        handleUpdate({
            index: row.index,
            item: {
                id: row.id,
                update: {
                    key: column.id,
                    value: +value,
                },
            },
        });
    };

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
