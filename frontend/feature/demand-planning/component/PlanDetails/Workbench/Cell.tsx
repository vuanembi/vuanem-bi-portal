import {
    FocusEventHandler,
    useState,
    useRef,
} from 'react';

import { Text, NumberInput, NumberInputField } from '@chakra-ui/react';

import { CellProps } from '../../../service/plan-item';

export const DisplayCell = ({ column, value }: CellProps) => (
    <Text lineHeight={1.5}>{column.formatter(value)}</Text>
);

export const EditableCell = ({ column, value }: CellProps) => {
    const submitValue = useRef(value);
    const [currentValue, setCurrentValue] = useState(value);

    const onChange = (_: string, valueAsNumber: number) => {
        setCurrentValue(valueAsNumber);
    };

    const onBlur: FocusEventHandler<HTMLInputElement> = () => {
        if (currentValue !== submitValue.current) {
            console.log('changed', {currentValue, column});
            return;
        }

        console.log('unchanged', submitValue.current);
        return submitValue.current;
    };

    return (
        <NumberInput
            size="xs"
            defaultValue={value}
            onChange={onChange}
            onBlur={onBlur}
        >
            <NumberInputField p={2} textAlign="right" />
        </NumberInput>
    );
};
