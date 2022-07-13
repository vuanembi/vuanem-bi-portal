import { FocusEventHandler, useState, useRef } from 'react';

import { Text, NumberInput, NumberInputField } from '@chakra-ui/react';
import { CellProps } from 'react-table';

import { PlanItem, PlanItemGroup } from '../../../service/plan-item';
import ExpandableButton from './ExpandableButton';

export type Props = CellProps<PlanItemGroup>;

export const DisplayCell = ({ column, value }: Props) => (
    <Text lineHeight={1.5}>{column.formatter(value)}</Text>
);

export const EditableCell = ({ column, value }: Props) => {
    const submitValue = useRef(value);
    const [currentValue, setCurrentValue] = useState(value);

    const onChange = (_: string, valueAsNumber: number) => {
        setCurrentValue(valueAsNumber);
    };

    const onBlur: FocusEventHandler<HTMLInputElement> = () => {
        if (currentValue !== submitValue.current) {
            console.log('changed', { currentValue, column });
            return;
        }

        console.log('unchanged', submitValue.current);
        return submitValue.current;
    };

    return value ? (
        <NumberInput
            size="xs"
            defaultValue={value}
            onChange={onChange}
            onBlur={onBlur}
        >
            <NumberInputField p={2} textAlign="right" />
        </NumberInput>
    ) : null;
};

export const ExpandableCell = ({ row }: Props) =>
    row.canExpand ? (
        <ExpandableButton
            depth={row.depth}
            getProps={row.getToggleRowExpandedProps}
            isExpanded={row.isExpanded}
        />
    ) : null;
