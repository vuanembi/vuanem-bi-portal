import { VStack, Button } from '@chakra-ui/react';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import usePlanStatus from '../../../hook/planStatus';

import { Plan } from '../../../type';

dayjs.extend(utc);

const Action = ({ id, status }: Plan) => {
    const { color, action } = usePlanStatus(status.name);

    return (
        <VStack flex="1" alignItems="stretch">
            {action ? (
                <Button bgColor={color}>{action.label}</Button>
            ) : (
                <Button isDisabled bgColor={color}/>
            )}
            <Button color="white" bgColor="red.400">
                Delete
            </Button>
        </VStack>
    );
};

export default Action;
