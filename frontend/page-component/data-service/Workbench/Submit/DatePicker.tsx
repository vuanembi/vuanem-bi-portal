import { FC } from 'react';

import {
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    Icon,
    useToken,
} from '@chakra-ui/react';
import {
    DayPicker,
    DateRange,
    SelectRangeEventHandler,
} from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { formatISO, getYear } from 'date-fns';

import { FaRegCalendarAlt } from 'react-icons/fa';

type DatePickerProps = {
    range?: DateRange;
    setRange: SelectRangeEventHandler;
};

export const defaultDateRange = () => ({
    from: new Date(),
    to: new Date(),
});

const PopoverDatePicker: FC<DatePickerProps> = ({ range, setRange }) => {
    const { from, to } = range || defaultDateRange();

    return (
        <Popover>
            <PopoverTrigger>
                <Button flex="1" leftIcon={<Icon as={FaRegCalendarAlt} />}>
                    {[from, to]
                        .map(
                            (value) =>
                                value &&
                                formatISO(value, { representation: 'date' })
                        )
                        .join(' - ')}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                    <DayPicker
                        mode="range"
                        fromYear={2018}
                        toYear={getYear(new Date())}
                        captionLayout="dropdown"
                        selected={range}
                        onSelect={setRange}
                        modifiersStyles={{
                            selected: {
                                backgroundColor: useToken('colors', 'blue.500'),
                            },
                        }}
                    />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default PopoverDatePicker;
