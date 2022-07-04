import { useContext } from 'react';

import { VStack, Button } from '@chakra-ui/react';

import usePlanStatus from '../../../hook/planStatus';
import { PlanContext } from '../../../context';

const Action = () => {
    const { plan } = useContext(PlanContext);

    const { id, status } = plan;
    const { color, action } = usePlanStatus(status.name);

    return (
        <VStack flex="1" alignItems="stretch">
            {action ? (
                <Button bgColor={color} onClick={action.handler}>
                    {action.label}
                </Button>
            ) : (
                <Button isDisabled bgColor={color} />
            )}
            <Button color="white" bgColor="red.400">
                Delete
            </Button>
        </VStack>
    );
};

export default Action;
