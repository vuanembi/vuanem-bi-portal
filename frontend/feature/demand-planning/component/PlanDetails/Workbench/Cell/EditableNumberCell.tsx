import { useState, useEffect } from 'react';

import {
    UseCounterProps,
    NumberInput,
    NumberInputField,
} from '@chakra-ui/react';

import { CellProps } from './cell.type';

export const editNumber = (precision: number = 2) =>
    function EditNumber({
        value: initialValue,
        row,
        column,
        handleUpdate,
    }: CellProps) {
        const [value, setValue] = useState(initialValue);

        const onChange: UseCounterProps['onChange'] = (valueAsString) => {
            setValue(valueAsString);
        };

        const onBlur = () => {
            value === null && setValue('0.00');

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
                isRequired
                w={column.width}
                defaultValue={initialValue}
                precision={precision}
                value={
                    value !== null && value !== undefined
                        ? value.toString()
                        : ''
                }
                onChange={onChange}
                onBlur={onBlur}
            >
                <NumberInputField textAlign="right" p={4} />
            </NumberInput>
        );
    };

export default editNumber;
