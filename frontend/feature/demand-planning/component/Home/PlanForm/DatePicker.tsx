import { FC } from 'react';

import {
    Input,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    useToken,
    useDisclosure,
} from '@chakra-ui/react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import dayjs from 'dayjs';

type DatePickerProps = {
    date: string | undefined;
    setDate: (date: string | undefined) => void;
};

const PopoverDatePicker: FC<DatePickerProps> = ({ date, setDate }) => {
    const { isOpen, onToggle, onClose } = useDisclosure();

    const handleSelect = (selectedDate: Date | undefined) => {
        setDate(dayjs(selectedDate).format('YYYY-MM-DD'));
        onToggle();
    };

    return (
        <Popover isOpen={isOpen} onClose={onClose}>
            <PopoverTrigger>
                <Input
                    value={dayjs(date).format('YYYY-MM-DD')}
                    onClick={onToggle}
                />
            </PopoverTrigger>
            <PopoverContent w="400">
                <PopoverArrow />
                <PopoverBody>
                    <DayPicker
                        required
                        showWeekNumber
                        mode="single"
                        captionLayout="dropdown"
                        selected={dayjs(date).toDate()}
                        onSelect={handleSelect}
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
