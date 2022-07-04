import { useRouter } from 'next/router';

import { useState, useContext } from 'react';

import { VStack, Button } from '@chakra-ui/react';

import usePlanStatus from '../../../hook/planStatus';
import { PlanContext } from '../../../context';

const Action = () => {
    const { plan } = useContext(PlanContext);

    const { id, status } = plan;
    const { color, action } = usePlanStatus(status.name);

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const onAction = () => {
        setLoading(true);
        action?.handler(id).then(() => {
            setLoading(false);
            router.reload();
        });
    };

    return (
        <VStack flex="1" alignItems="stretch">
            {action ? (
                <Button bgColor={color} onClick={onAction} isLoading={loading}>
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
