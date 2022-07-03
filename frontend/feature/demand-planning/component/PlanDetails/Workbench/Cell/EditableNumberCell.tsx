import { useState, useEffect } from 'react';

import {
    UseCounterProps,
    NumberInput,
    NumberInputField,
} from '@chakra-ui/react';

import { clamp } from 'lodash';

import { CellProps } from './cell.type';

export const EditNumber = ({ value: initialValue, row, column }: CellProps) => {
    const [value, setValue] = useState(initialValue);

    const onChange: UseCounterProps['onChange'] = (_, valueAsNumber) => {
        console.log(column);
        setValue(valueAsNumber);
    };

    const onBlur = () => console.log({ initialValue, value });

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <NumberInput
            w={column.width}
            className={clamp(column.id.toString().length, 10, 15).toString()}
            precision={2}
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
        >
            <NumberInputField textAlign="right" p={4} />
        </NumberInput>
    );
};

export default EditNumber;
